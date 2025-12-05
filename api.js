/* api.js
 *
 * Agenderingshulp PO Water - V2
 * Dataswitch + lege adapterstructuur voor:
 * - vergaderingenApi
 * - onderwerpenApi
 *
 * LET OP:
 * - Alleen klassieke JavaScript (geen ES6).
 * - Deze versie implementeert nog GEEN echte JSON- of SharePoint-logica;
 *   het is puur het skelet voor latere fases.
 */

/* ============================================================
   DATA SOURCE CONFIGURATIE
   ------------------------------------------------------------
   Waarom bestaat DATA_SOURCE?
   - Om centraal te bepalen of de applicatie haar data haalt uit
     lokale JSON / in-memory (LOCAL_JSON) of uit SharePoint REST
     (SHAREPOINT).
   Welke gegevens gebruikt deze variabele?
   - Alleen de stringwaarde "LOCAL_JSON" of "SHAREPOINT".
   Welke REST-call is hier bedoeld?
   - Bij SHAREPOINT worden later REST-calls naar /_api/... gebruikt.
   ============================================================ */

/* Waarde-opties:
 * - "LOCAL_JSON"  : voor lokale test- en prototypemodus
 * - "SHAREPOINT"  : voor productie via SharePoint-lijsten
 */
var DATA_SOURCE = "LOCAL_JSON";

/* ============================================================
   SHAREPOINT BASISCONFIGURATIE (PLACEHOLDERS)
   ------------------------------------------------------------
   Waarom bestaan deze variabelen?
   - Om later, in SHAREPOINT-modus, consistente URLs en lijstnamen
     te gebruiken voor de REST-calls.
   Welke gegevens gebruikt deze configuratie?
   - De SharePoint-site URL en lijstnamen PO_Vergaderingen en
     PO_Onderwerpen.
   Welke REST-call is hier bedoeld?
   - Beispiel:
     SP_BASE_URL + "/_api/web/lists/GetByTitle('PO_Vergaderingen')/items"
   ============================================================ */

var SP_BASE_URL = ""; // Wordt later in SHAREPOINT-modus gezet, bijv. via _spPageContextInfo.webAbsoluteUrl

var SP_LIST_VERGADERINGEN = "PO_Vergaderingen";
var SP_LIST_ONDERWERPEN = "PO_Onderwerpen";

/* ============================================================
   HULPFUNCTIES VOOR CALLBACKS
   ============================================================ */

/*
 * Waarom bestaat safeInvoke(fn, arg1, arg2, ...) ?
 * - Om veilig een callbackfunctie aan te roepen zonder fouten als
 *   deze niet is meegegeven.
 * Welke gegevens gebruikt deze functie?
 * - De meegegeven functie en argumenten.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function safeInvoke(fn) {
    if (typeof fn === "function") {
        var args = [];
        var i;
        for (i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        fn.apply(null, args);
    }
}

/*
 * Waarom bestaat buildNotImplementedError(context)?
 * - Om in een latere fase snel te kunnen zien welk deel van de
 *   api nog niet is geïmplementeerd.
 * Welke gegevens gebruikt deze functie?
 * - Een contextstring, zoals "vergaderingenApi.getAll (LOCAL_JSON)".
 * Welke REST-call is hier bedoeld?
 * - Geen; dit is puur diagnose.
 */
function buildNotImplementedError(context) {
    var e = new Error("Nog niet geïmplementeerd: " + context);
    e.context = context;
    return e;
}


/*
 * Waarom bestaat loadLocalVergaderingen(onSuccess, onError)?
 * - Om in LOCAL_JSON-modus de lokale bron po_vergaderingen.json
 *   in te lezen en als array terug te geven.
 * Welke gegevens gebruikt deze functie?
 * - Het bestand po_vergaderingen.json in dezelfde map als index.html.
 * Welke REST-call is hier bedoeld?
 * - Geen; dit is puur file-inleeslogica in de browser.
 */
function loadLocalVergaderingen(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "po_vergaderingen.json", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // Bij file:// kan status 0 zijn; als er tekst is, toch proberen
            if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    safeInvoke(onSuccess, data);
                } catch (e) {
                    safeInvoke(onError, e);
                }
            } else {
                safeInvoke(onError, xhr);
            }
        }
    };

    xhr.send();
}





/* ============================================================
   VERGADERINGEN-API
   ------------------------------------------------------------
   Waarom bestaat vergaderingenApi?
   - Om alle interactie met vergaderingsgegevens (PO-vergaderingen)
     te bundelen achter een consistente interface.
   Welke gegevens gebruikt deze API?
   - In LOCAL_JSON-modus: straks een lokale JSON of in-memory array.
   - In SHAREPOINT-modus: lijst 'PO_Vergaderingen'.
   Welke REST-call is hier bedoeld?
   - GET/POST/MERGE/DELETE op:
     SP_BASE_URL + "/_api/web/lists/GetByTitle('PO_Vergaderingen')/items"
   ============================================================ */

var vergaderingenApi = {

    /*
     * vergaderingenApi.getAll(filters, onSuccess, onError)
     * - Haalt alle vergaderingen op volgens opgegeven filters.
     * filters:
     *   - type: "Formeel" of "Informeel" (optioneel)
     *   - firstUpcoming: true/false (optioneel)
     */
    getAll: function (filters, onSuccess, onError) {
        filters = filters || {};

        if (DATA_SOURCE === "LOCAL_JSON") {
            // Lokale JSON-inlezen uit po_vergaderingen.json
            loadLocalVergaderingen(function (items) {
                var result = [];
                var i, item;

                for (i = 0; i < items.length; i++) {
                    item = items[i];

                    // JSON bevat: Title, Datum, Type, DuurMinuten, Programma
                    if (filters.type && item.Type !== filters.type) {
                        continue;
                    }
                    if (item.Programma && item.Programma !== "Water") {
                        continue;
                    }

                    result.push({
                        Id: String(i + 1), // synthetisch Id voor lokale modus
                        Title: item.Title,
                        Datum: item.Datum,
                        Type: item.Type,
                        DuurMinuten: item.DuurMinuten,
                        Programma: item.Programma
                    });
                }

                if (filters.firstUpcoming) {
                    result.sort(function (a, b) {
                        if (a.Datum < b.Datum) { return -1; }
                        if (a.Datum > b.Datum) { return 1; }
                        return 0;
                    });
                    if (result.length > 0) {
                        result = [result[0]];
                    }
                }

                safeInvoke(onSuccess, result);
            }, function (err) {
                safeInvoke(onError, err);
            });

            return;
        }

        if (DATA_SOURCE === "SHAREPOINT") {
            // Fase 3: hier echte REST-call naar PO_Vergaderingen.
            safeInvoke(onError, buildNotImplementedError("vergaderingenApi.getAll (SHAREPOINT)"));
            return;
        }

        safeInvoke(onError, buildNotImplementedError("vergaderingenApi.getAll (onbekende DATA_SOURCE)"));
    },


    /*
     * vergaderingenApi.create(item, onSuccess, onError)
     * - Maakt een nieuwe vergadering aan.
     * item bevat velden als:
     *   - Title, Datum, Type, DuurMinuten, Programma, VolgordeOpAgenda
     */
    create: function (item, onSuccess, onError) {
        if (DATA_SOURCE === "LOCAL_JSON") {
            // Fase 2: lokale in-memory toevoeging of schrijven naar JSON (indien gewenst).
            safeInvoke(onError, buildNotImplementedError("vergaderingenApi.create (LOCAL_JSON)"));
            return;
        }

        if (DATA_SOURCE === "SHAREPOINT") {
            // Fase 3: POST naar SharePoint-lijst PO_Vergaderingen.
            safeInvoke(onError, buildNotImplementedError("vergaderingenApi.create (SHAREPOINT)"));
            return;
        }

        safeInvoke(onError, buildNotImplementedError("vergaderingenApi.create (onbekende DATA_SOURCE)"));
    },

    /*
     * vergaderingenApi.update(id, item, onSuccess, onError)
     * - Wijzigt een bestaande vergadering op basis van Id.
     * item bevat de gewijzigde velden.
     */
    update: function (id, item, onSuccess, onError) {
        if (DATA_SOURCE === "LOCAL_JSON") {
            // Fase 2: lokale in-memory update.
            safeInvoke(onError, buildNotImplementedError("vergaderingenApi.update (LOCAL_JSON)"));
            return;
        }

        if (DATA_SOURCE === "SHAREPOINT") {
            // Fase 3: MERGE/PUT naar SharePoint-lijst.
            safeInvoke(onError, buildNotImplementedError("vergaderingenApi.update (SHAREPOINT)"));
            return;
        }

        safeInvoke(onError, buildNotImplementedError("vergaderingenApi.update (onbekende DATA_SOURCE)"));
    },

    /*
     * vergaderingenApi.deleteItem(id, onSuccess, onError)
     * - Verwijdert een vergadering op basis van Id.
     */
    deleteItem: function (id, onSuccess, onError) {
        if (DATA_SOURCE === "LOCAL_JSON") {
            // Fase 2: lokale in-memory verwijdering.
            safeInvoke(onError, buildNotImplementedError("vergaderingenApi.deleteItem (LOCAL_JSON)"));
            return;
        }

        if (DATA_SOURCE === "SHAREPOINT") {
            // Fase 3: DELETE naar SharePoint-lijst.
            safeInvoke(onError, buildNotImplementedError("vergaderingenApi.deleteItem (SHAREPOINT)"));
            return;
        }

        safeInvoke(onError, buildNotImplementedError("vergaderingenApi.deleteItem (onbekende DATA_SOURCE)"));
    }
};

/* ============================================================
   ONDERWERPEN-API
   ------------------------------------------------------------
   Waarom bestaat onderwerpenApi?
   - Om alle interactie met onderwerpgegevens (aanmeldingen voor
     PO Water) te bundelen achter een consistente interface.
   Welke gegevens gebruikt deze API?
   - In LOCAL_JSON-modus: straks een lokale JSON of in-memory array.
   - In SHAREPOINT-modus: lijst 'PO_Onderwerpen'.
   Welke REST-call is hier bedoeld?
   - GET/POST/MERGE/DELETE op:
     SP_BASE_URL + "/_api/web/lists/GetByTitle('PO_Onderwerpen')/items"
   ============================================================ */

var onderwerpenApi = {

    /*
     * onderwerpenApi.getAll(filters, onSuccess, onError)
     * - Haalt onderwerpen op voor weergave in beheer en agenda's.
     * filters:
     *   - status, vergaderId, eigenOnderwerpen (bool), etc. (later).
     */
    getAll: function (filters, onSuccess, onError) {
        filters = filters || {};

        if (DATA_SOURCE === "LOCAL_JSON") {
            // Fase 2: hier lokale testdata gebruiken.
            safeInvoke(onError, buildNotImplementedError("onderwerpenApi.getAll (LOCAL_JSON)"));
            return;
        }

        if (DATA_SOURCE === "SHAREPOINT") {
            // Fase 3: REST-call naar PO_Onderwerpen.
            safeInvoke(onError, buildNotImplementedError("onderwerpenApi.getAll (SHAREPOINT)"));
            return;
        }

        safeInvoke(onError, buildNotImplementedError("onderwerpenApi.getAll (onbekende DATA_SOURCE)"));
    },

    /*
     * onderwerpenApi.create(item, onSuccess, onError)
     * - Maakt een nieuw onderwerp aan (wizard-submit).
     * item bevat o.a.:
     *   Titel, Domein, NaamIndiener, AfdelingIndiener,
     *   NaamOpdrachtgever, BetrokkenAfdelingen, Toelichting,
     *   GewensteVergaderingId, Status, Vraag1..5, VoldoetAanWijzer,
     *   IngetrokkenDoorIndiener.
     */
    create: function (item, onSuccess, onError) {
        if (DATA_SOURCE === "LOCAL_JSON") {
            // Fase 2: lokaal opslaan in in-memory array of JSON.
            safeInvoke(onError, buildNotImplementedError("onderwerpenApi.create (LOCAL_JSON)"));
            return;
        }

        if (DATA_SOURCE === "SHAREPOINT") {
            // Fase 3: POST naar SharePoint-lijst PO_Onderwerpen.
            safeInvoke(onError, buildNotImplementedError("onderwerpenApi.create (SHAREPOINT)"));
            return;
        }

        safeInvoke(onError, buildNotImplementedError("onderwerpenApi.create (onbekende DATA_SOURCE)"));
    },

    /*
     * onderwerpenApi.update(id, item, onSuccess, onError)
     * - Wijzigt een onderwerp (bijvoorbeeld status, koppeling aan
     *   vergadering, volgorde op agenda).
     */
    update: function (id, item, onSuccess, onError) {
        if (DATA_SOURCE === "LOCAL_JSON") {
            // Fase 2: lokale update in in-memory structuur.
            safeInvoke(onError, buildNotImplementedError("onderwerpenApi.update (LOCAL_JSON)"));
            return;
        }

        if (DATA_SOURCE === "SHAREPOINT") {
            // Fase 3: MERGE/PUT naar SharePoint-lijst PO_Onderwerpen.
            safeInvoke(onError, buildNotImplementedError("onderwerpenApi.update (SHAREPOINT)"));
            return;
        }

        safeInvoke(onError, buildNotImplementedError("onderwerpenApi.update (onbekende DATA_SOURCE)"));
    },

    /*
     * onderwerpenApi.deleteItem(id, onSuccess, onError)
     * - Verwijdert een onderwerp (bijvoorbeeld bij testdata of
     *   expliciet beheer).
     */
    deleteItem: function (id, onSuccess, onError) {
        if (DATA_SOURCE === "LOCAL_JSON") {
            // Fase 2: lokale verwijdering in in-memory structuur.
            safeInvoke(onError, buildNotImplementedError("onderwerpenApi.deleteItem (LOCAL_JSON)"));
            return;
        }

        if (DATA_SOURCE === "SHAREPOINT") {
            // Fase 3: DELETE naar SharePoint-lijst PO_Onderwerpen.
            safeInvoke(onError, buildNotImplementedError("onderwerpenApi.deleteItem (SHAREPOINT)"));
            return;
        }

        safeInvoke(onError, buildNotImplementedError("onderwerpenApi.deleteItem (onbekende DATA_SOURCE)"));
    }
};
