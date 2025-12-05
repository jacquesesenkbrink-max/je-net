/* app.js
 *
 * Agenderingshulp PO Water - V2
 * UI-skelet, view-navigatie en wizard-flow (zonder echte datalaag).
 *
 * LET OP:
 * - Alleen klassieke JavaScript (geen ES6).
 * - Alle datatoegang loopt via api.js (vergaderingenApi / onderwerpenApi).
 */

/* ============================================================
   GLOBALE APPLICATIESTATUS
   ------------------------------------------------------------
   Waarom bestaat dit object?
   - Om alle UI-status op één centrale plaats te beheren
     (actieve view, wizardstap, tijdelijk onderwerp, rol, etc.).
   Welke gegevens gebruikt dit object?
   - UI-staat van de wizard en basisgegevens van het onderwerp.
   ============================================================ */

var appState = {
    currentView: "view-start",
    currentBeheerSubview: "beheer-vergaderingen",
    currentWizardStep: 1,
    currentRole: "Indiener", // Indiender / Assistent / Programmacoordinator / Kijker
    wizard: {
        agendawijzer: {
            vraag1: null,
            vraag2: null,
            vraag3: null,
            vraag4: null,
            vraag5: null,
            voldoetAanWijzer: null
        },
        onderwerp: {
            NaamIndiener: "",
            AfdelingIndiener: "",
            NaamOpdrachtgever: "",
            Domein: "",
            BetrokkenAfdelingen: "",
            Titel: "",
            Toelichting: ""
        },
        vergaderKeuze: {
            VergaderType: "",
            GewensteVergaderingId: ""
        }
    }
};

/* ============================================================
   INIT
   ------------------------------------------------------------
   Waarom bestaat initApp()?
   - Om alle event handlers en startweergave eenmalig bij het
     laden van de pagina in te richten.
   Welke gegevens gebruikt deze functie?
   - appState voor huidige rol en view.
   Welke REST-call is hier bedoeld?
   - Geen; dit is puur UI-initialisatie. Datakoppeling loopt
     via api.js (vergaderingenApi / onderwerpenApi).
   ============================================================ */

function initApp() {
    initNavigation();
    initHomeShortcuts();
    initWizard();
    initBeheerSubnav();
    initAgendaDragAndDropPlaceholders();
    renderCurrentRole();
    showView("view-start");
}

/* ============================================================
   NAVIGATIE TUSSEN VIEWS
   ============================================================ */

/*
 * Waarom bestaat initNavigation()?
 * - Om click-events op de hoofd-navigatietabs te koppelen aan
 *   het tonen van de juiste view-secties.
 * Welke gegevens gebruikt deze functie?
 * - De data-view attributen op .nav-tab elementen.
 * Welke REST-call is hier bedoeld?
 * - Geen; alleen UI-switching.
 */
function initNavigation() {
    var tabs = document.getElementsByClassName("nav-tab");
    var i;

    for (i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function () {
            var viewId = this.getAttribute("data-view");
            showView(viewId);
            setActiveNavTab(this);
        };
    }
}

/*
 * Waarom bestaat showView(viewId)?
 * - Om één view actief te maken en alle andere views te verbergen.
 * Welke gegevens gebruikt deze functie?
 * - appState.currentView en DOM-elementen met class .app-view.
 * Welke REST-call is hier bedoeld?
 * - Geen; enkel UI.
 */
function showView(viewId) {
    var views = document.getElementsByClassName("app-view");
    var i;

    for (i = 0; i < views.length; i++) {
        views[i].className = views[i].className.replace("app-view-active", "").trim();
    }

    var target = document.getElementById(viewId);
    if (target) {
        if (target.className.indexOf("app-view-active") === -1) {
            target.className += " app-view-active";
        }
        appState.currentView = viewId;
    }
}

/*
 * Waarom bestaat setActiveNavTab(tabElement)?
 * - Om visuele terugkoppeling te geven welke hoofdtab actief is.
 * Welke gegevens gebruikt deze functie?
 * - DOM-elementen met class .nav-tab.
 * Welke REST-call is hier bedoeld?
 * - Geen; puur styling.
 */
function setActiveNavTab(tabElement) {
    var tabs = document.getElementsByClassName("nav-tab");
    var i;

    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace("nav-tab-active", "").trim();
    }

    if (tabElement.className.indexOf("nav-tab-active") === -1) {
        tabElement.className += " nav-tab-active";
    }
}

/*
 * Waarom bestaat initHomeShortcuts()?
 * - Om knoppen op de startpagina te koppelen aan relevante views
 *   (bijvoorbeeld direct naar Onderwerp of Termijnagenda).
 * Welke gegevens gebruikt deze functie?
 * - Geen inhoudelijke data, alleen navigatie.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function initHomeShortcuts() {
    var btnNew = document.getElementById("btnStartNewSubjectFromHome");
    var btnTermijn = document.getElementById("btnOpenTermijnagendaFromHome");
    var btnFirstFormeel = document.getElementById("btnOpenFirstFormeelFromHome");
    var btnFirstInformeel = document.getElementById("btnOpenFirstInformeelFromHome");

    if (btnNew) {
        btnNew.onclick = function () {
            showView("view-onderwerp");
            setActiveNavTab(findNavTabForView("view-onderwerp"));
            goToWizardStep(1);
        };
    }
    if (btnTermijn) {
        btnTermijn.onclick = function () {
            showView("view-termijnagenda");
            setActiveNavTab(findNavTabForView("view-termijnagenda"));
            // Later: termijnagenda renderen vanuit vergaderingenApi.
        };
    }
    if (btnFirstFormeel) {
        btnFirstFormeel.onclick = function () {
            showView("view-formeel");
            setActiveNavTab(findNavTabForView("view-formeel"));
            // Later: eerste formele vergadering selecteren via vergaderingenApi.
        };
    }
    if (btnFirstInformeel) {
        btnFirstInformeel.onclick = function () {
            showView("view-informeel");
            setActiveNavTab(findNavTabForView("view-informeel"));
            // Later: eerste informele vergadering selecteren via vergaderingenApi.
        };
    }
}

/*
 * Waarom bestaat findNavTabForView(viewId)?
 * - Om vanuit code de juiste nav-tab te vinden op basis van
 *   het data-view attribuut, zodat we de actieve tab kunnen zetten.
 * Welke gegevens gebruikt deze functie?
 * - De data-view attributen van .nav-tab elementen.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function findNavTabForView(viewId) {
    var tabs = document.getElementsByClassName("nav-tab");
    var i;
    for (i = 0; i < tabs.length; i++) {
        if (tabs[i].getAttribute("data-view") === viewId) {
            return tabs[i];
        }
    }
    return null;
}

/*
 * Waarom bestaat renderCurrentRole()?
 * - Om in de header de huidige rol (Indiener, Assistent, etc.) te tonen.
 * Welke gegevens gebruikt deze functie?
 * - appState.currentRole.
 * Welke REST-call is hier bedoeld?
 * - Geen; rolbeheer via SP gebeurt in latere fase.
 */
function renderCurrentRole() {
    var lbl = document.getElementById("currentRoleLabel");
    if (lbl) {
        lbl.innerHTML = appState.currentRole;
    }
}

/* ============================================================
   WIZARD: INIT EN STAPPEN
   ============================================================ */

/*
 * Waarom bestaat initWizard()?
 * - Om alle wizard-knoppen en formulieren te koppelen aan
 *   de interne wizard-logica (stap vooruit/achteruit).
 * Welke gegevens gebruikt deze functie?
 * - appState.wizard.* voor de antwoorden en velden.
 * Welke REST-call is hier bedoeld?
 * - Geen; verzenden via onderwerpenApi komt in een latere fase.
 */
function initWizard() {
    var btnToStep2 = document.getElementById("btnWizardToStep2");
    var btnToStep3 = document.getElementById("btnWizardToStep3");
    var btnBackTo1 = document.getElementById("btnWizardBackToStep1");
    var btnBackTo2 = document.getElementById("btnWizardBackToStep2");
    var btnSubmit = document.getElementById("btnWizardSubmit");
    var vergaderTypeSelect = document.getElementById("fldVergaderType");

    if (btnToStep2) {
        btnToStep2.onclick = function () {
            // TODO: later valideren dat alle agendawijzer-vragen zijn ingevuld
            collectAgendawijzerAnswers();
            updateAgendawijzerResult();
            goToWizardStep(2);
        };
    }

    if (btnToStep3) {
        btnToStep3.onclick = function () {
            // TODO: later veldvalidatie toevoegen
            collectOnderwerpForm();
            goToWizardStep(3);
            // Later: vergaderingen ophalen via vergaderingenApi.getAll().
            renderVergaderKeuze();
        };
    }

    if (btnBackTo1) {
        btnBackTo1.onclick = function () {
            goToWizardStep(1);
        };
    }

    if (btnBackTo2) {
        btnBackTo2.onclick = function () {
            goToWizardStep(2);
        };
    }

    if (btnSubmit) {
        btnSubmit.onclick = function () {
            collectVergaderKeuze();
            // TODO: validatie en doorzetten naar onderwerpenApi.create()
            showGlobalMessage("Onderwerp verzenden wordt later geïmplementeerd.", "info");
        };
    }

    if (vergaderTypeSelect) {
        vergaderTypeSelect.onchange = function () {
            collectVergaderTypeOnly();
            // TODO: vergaderlijst filteren op basis van Type via vergaderingenApi.getAll().
        };
    }
}

/*
 * Waarom bestaat goToWizardStep(stepNr)?
 * - Om precies één wizardpanel en stapindicator actief te maken.
 * Welke gegevens gebruikt deze functie?
 * - appState.currentWizardStep en DOM-elementen van de wizard.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function goToWizardStep(stepNr) {
    var panels = [
        document.getElementById("wizard-step-1"),
        document.getElementById("wizard-step-2"),
        document.getElementById("wizard-step-3")
    ];
    var steps = document.getElementsByClassName("wizard-step");
    var i;

    appState.currentWizardStep = stepNr;

    // Panel zichtbaar maken
    for (i = 0; i < panels.length; i++) {
        if (panels[i]) {
            panels[i].className = panels[i].className.replace("wizard-panel-active", "").trim();
        }
    }
    var activePanel = document.getElementById("wizard-step-" + stepNr);
    if (activePanel && activePanel.className.indexOf("wizard-panel-active") === -1) {
        activePanel.className += " wizard-panel-active";
    }

    // Stapindicator bijwerken
    for (i = 0; i < steps.length; i++) {
        steps[i].className = steps[i].className.replace("wizard-step-active", "").trim();
    }
    for (i = 0; i < steps.length; i++) {
        var s = steps[i];
        var sStep = s.getAttribute("data-step");
        if (parseInt(sStep, 10) === stepNr) {
            if (s.className.indexOf("wizard-step-active") === -1) {
                s.className += " wizard-step-active";
            }
            break;
        }
    }
}

/*
 * Waarom bestaat collectAgendawijzerAnswers()?
 * - Om alle Ja/Nee-antwoorden van stap 1 op te slaan in appState.
 * Welke gegevens gebruikt deze functie?
 * - Radio-buttons van formAgendawijzer.
 * Welke REST-call is hier bedoeld?
 * - Geen; beoordeling gebeurt client-side.
 */
function collectAgendawijzerAnswers() {
    var form = document.getElementById("formAgendawijzer");
    var w = appState.wizard.agendawijzer;

    if (!form) {
        return;
    }

    w.vraag1 = getRadioValue(form, "vraag1");
    w.vraag2 = getRadioValue(form, "vraag2");
    w.vraag3 = getRadioValue(form, "vraag3");
    w.vraag4 = getRadioValue(form, "vraag4");
    w.vraag5 = getRadioValue(form, "vraag5");

    // TODO: echte logica voor VoldoetAanWijzer toevoegen.
    // Voor nu: placeholder op basis van minimaal één 'ja'.
    var score = 0;
    if (w.vraag1 === "ja") { score++; }
    if (w.vraag2 === "ja") { score++; }
    if (w.vraag3 === "ja") { score++; }
    if (w.vraag4 === "ja") { score++; }
    if (w.vraag5 === "ja") { score++; }
    w.voldoetAanWijzer = (score > 0);
}

/*
 * Waarom bestaat updateAgendawijzerResult()?
 * - Om visuele terugkoppeling te geven over het agendawijzer-resultaat.
 * Welke gegevens gebruikt deze functie?
 * - appState.wizard.agendawijzer.voldoetAanWijzer.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function updateAgendawijzerResult() {
    var box = document.getElementById("agendawijzerResult");
    var w = appState.wizard.agendawijzer;

    if (!box) {
        return;
    }

    if (w.voldoetAanWijzer === null) {
        box.innerHTML = "";
        return;
    }

    if (w.voldoetAanWijzer) {
        box.innerHTML = "De agendawijzer wijst erop dat dit onderwerp in aanmerking komt voor PO Water.";
    } else {
        box.innerHTML = "De agendawijzer wijst erop dat dit onderwerp mogelijk niet op PO Water thuishoort. U kunt eventueel toch doorgaan.";
    }
}

/*
 * Waarom bestaat collectOnderwerpForm()?
 * - Om alle velden uit stap 2 (Onderwerpgegevens) in appState te zetten.
 * Welke gegevens gebruikt deze functie?
 * - Velden in formOnderwerp: NaamIndiener, AfdelingIndiener, etc.
 * Welke REST-call is hier bedoeld?
 * - Geen; opslag naar SharePoint gebeurt pas bij submit.
 */
function collectOnderwerpForm() {
    var form = document.getElementById("formOnderwerp");
    var o = appState.wizard.onderwerp;

    if (!form) {
        return;
    }

    o.NaamIndiener = getInputValue("fldNaamIndiener");
    o.AfdelingIndiener = getInputValue("fldAfdelingIndiener");
    o.NaamOpdrachtgever = getInputValue("fldNaamOpdrachtgever");
    o.Domein = getSelectValue("fldDomein");
    o.BetrokkenAfdelingen = getTextareaValue("fldBetrokkenAfdelingen");
    o.Titel = getInputValue("fldTitel");
    o.Toelichting = getTextareaValue("fldToelichting");
}

/*
 * Waarom bestaat collectVergaderTypeOnly()?
 * - Om enkel de gekozen vergadertype-filter (Formeel/Informeel) op te slaan
 *   en later te kunnen gebruiken om de dropdown met vergaderingen te filteren.
 * Welke gegevens gebruikt deze functie?
 * - Select-veld fldVergaderType.
 * Welke REST-call is hier bedoeld?
 * - Geen; filtering gebeurt client-side op JSON of op REST-resultaat.
 */
function collectVergaderTypeOnly() {
    var v = appState.wizard.vergaderKeuze;
    v.VergaderType = getSelectValue("fldVergaderType");
}

/*
 * Waarom bestaat collectVergaderKeuze()?
 * - Om de daadwerkelijke gekozen vergadering (Id) uit stap 3 te bewaren.
 * Welke gegevens gebruikt deze functie?
 * - Select-veld fldGewensteVergadering.
 * Welke REST-call is hier bedoeld?
 * - Geen; het onderwerp wordt bij submit via onderwerpenApi aangemaakt.
 */
function collectVergaderKeuze() {
    var v = appState.wizard.vergaderKeuze;
    v.VergaderType = getSelectValue("fldVergaderType");
    v.GewensteVergaderingId = getSelectValue("fldGewensteVergadering");
}

/*
 * Waarom bestaat renderVergaderKeuze()?
 * - Om in stap 3 de dropdown met vergaderingen te vullen op basis van
 *   het gekozen type (Formeel/Informeel) en de beschikbare vergaderingen.
 * Welke gegevens gebruikt deze functie?
 * - appState.wizard.vergaderKeuze.VergaderType,
 *   vergaderingenApi.getAll() (later).
 * Welke REST-call is hier bedoeld?
 * - In de LOCAL_JSON-fase geen REST; later via vergaderingenApi (SharePoint).
 */
function renderVergaderKeuze() {
    var select = document.getElementById("fldGewensteVergadering");
    var typeFilter = appState.wizard.vergaderKeuze.VergaderType;
    var errorBox = document.getElementById("wizardErrorBox");

    if (!select) {
        return;
    }

    clearSelectOptions(select);

    var opt = document.createElement("option");
    opt.value = "";
    opt.innerHTML = "(kies een vergadering)";
    select.appendChild(opt);

    if (errorBox) {
        errorBox.innerHTML = "";
    }

    // Aanroep naar vergaderingenApi in LOCAL_JSON-modus
    vergaderingenApi.getAll(
        { type: typeFilter, firstUpcoming: false },
        function (items) {
            var i, item;
            for (i = 0; i < items.length; i++) {
                item = items[i];

                opt = document.createElement("option");
                opt.value = item.Id;
                opt.innerHTML = item.Title;
                select.appendChild(opt);
            }

            // Na vullen: samenvatting verversen
            renderWizardSummary();
        },
        function () {
            if (errorBox) {
                errorBox.innerHTML = "Fout bij ophalen vergaderingen (lokale data).";
            }
        }
    );
}


/*
 * Waarom bestaat renderWizardSummary()?
 * - Om in stap 3 een korte samenvatting te tonen van de ingevulde
 *   agendawijzer en onderwerp + gekozen vergadering.
 * Welke gegevens gebruikt deze functie?
 * - appState.wizard.agendawijzer, appState.wizard.onderwerp,
 *   appState.wizard.vergaderKeuze.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function renderWizardSummary() {
    var box = document.getElementById("wizardSummaryBox");
    if (!box) {
        return;
    }

    var w = appState.wizard;
    var html = "";

    html += "<h4>Samenvatting</h4>";
    html += "<p><strong>Titel:</strong> " + escapeHtml(w.onderwerp.Titel) + "</p>";
    html += "<p><strong>Naam indiener:</strong> " + escapeHtml(w.onderwerp.NaamIndiener) + "</p>";
    html += "<p><strong>Domein:</strong> " + escapeHtml(w.onderwerp.Domein) + "</p>";
    html += "<p><strong>Agendawijzer:</strong> ";
    if (w.agendawijzer.voldoetAanWijzer === true) {
        html += "Voldoet";
    } else if (w.agendawijzer.voldoetAanWijzer === false) {
        html += "Voldoet niet (volgens vragen)";
    } else {
        html += "Nog niet ingevuld";
    }
    html += "</p>";

    html += "<p><strong>Type overleg (filter):</strong> " + escapeHtml(w.vergaderKeuze.VergaderType || "") + "</p>";
    // De daadwerkelijke titel van de gekozen vergadering wordt later door api.js/vergaderingenApi opgehaald
    // indien nodig. In dit UI-skelet tonen we alleen het Id.
    html += "<p><strong>Gekozen vergadering Id:</strong> " + escapeHtml(w.vergaderKeuze.GewensteVergaderingId || "") + "</p>";

    box.innerHTML = html;
}

/* ============================================================
   BEHEER SUBNAV
   ============================================================ */

/*
 * Waarom bestaat initBeheerSubnav()?
 * - Om de subtabs in de Beheer-view (Vergaderingen / Onderwerpen) te
 *   laten schakelen zonder de hoofdview te verlaten.
 * Welke gegevens gebruikt deze functie?
 * - appState.currentBeheerSubview.
 * Welke REST-call is hier bedoeld?
 * - Geen; alleen UI-switching.
 */
function initBeheerSubnav() {
    var tabs = document.getElementsByClassName("subnav-tab");
    var i;

    for (i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function () {
            var subviewId = this.getAttribute("data-subview");
            showBeheerSubview(subviewId);
            setActiveBeheerTab(this);
        };
    }
}

/*
 * Waarom bestaat showBeheerSubview(subviewId)?
 * - Om één beheer-subview tegelijk zichtbaar te maken.
 * Welke gegevens gebruikt deze functie?
 * - DOM-elementen met class .beheer-subview.
 * Welke REST-call is hier bedoeld?
 * - Geen; data wordt later via api.js ingeladen.
 */
function showBeheerSubview(subviewId) {
    var subviews = document.getElementsByClassName("beheer-subview");
    var i;

    for (i = 0; i < subviews.length; i++) {
        subviews[i].className = subviews[i].className.replace("beheer-subview-active", "").trim();
    }

    var target = document.getElementById(subviewId);
    if (target && target.className.indexOf("beheer-subview-active") === -1) {
        target.className += " beheer-subview-active";
        appState.currentBeheerSubview = subviewId;
    }
}

/*
 * Waarom bestaat setActiveBeheerTab(tabElement)?
 * - Om visueel aan te geven welke beheer-subtab actief is.
 * Welke gegevens gebruikt deze functie?
 * - .subnav-tab elementen.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function setActiveBeheerTab(tabElement) {
    var tabs = document.getElementsByClassName("subnav-tab");
    var i;

    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace("subnav-tab-active", "").trim();
    }

    if (tabElement.className.indexOf("subnav-tab-active") === -1) {
        tabElement.className += " subnav-tab-active";
    }
}

/* ============================================================
   DRAG & DROP PLACEHOLDERS (AGENDA'S)
   ============================================================ */

/*
 * Waarom bestaat initAgendaDragAndDropPlaceholders()?
 * - Om de containers voor de formele en informele agenda's klaar
 *   te zetten voor Sortable.js, zodat onderwerpen later per vergadering
 *   versleept kunnen worden.
 * Welke gegevens gebruikt deze functie?
 * - DOM-elementen #formeleAgendaContainer en #informeleAgendaContainer.
 * Welke REST-call is hier bedoeld?
 * - Geen; drag-resultaten worden in een latere fase via api.js opgeslagen.
 */
function initAgendaDragAndDropPlaceholders() {
    if (typeof Sortable === "undefined") {
        return;
    }

    var formeelContainer = document.getElementById("formeleAgendaContainer");
    var informeelContainer = document.getElementById("informeleAgendaContainer");

    if (formeelContainer) {
        Sortable.create(formeelContainer, {
            group: "agenda-formeel",
            animation: 150
            // TODO: later onEnd event gebruiken om volgorde op te slaan via onderwerpenApi / vergaderingenApi.
        });
    }

    if (informeelContainer) {
        Sortable.create(informeelContainer, {
            group: "agenda-informeel",
            animation: 150
        });
    }
}

/* ============================================================
   HULPFUNCTIES FORMULIER
   ============================================================ */

/*
 * Waarom bestaat getRadioValue(form, name)?
 * - Om veilige, herbruikbare uitleeslogica van radio-buttonsets
 *   aan te bieden.
 * Welke gegevens gebruikt deze functie?
 * - Het formulier en de radioknoppen met gegeven name.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function getRadioValue(form, name) {
    if (!form || !form.elements[name]) {
        return null;
    }
    var inputs = form.elements[name];
    var i;
    if (inputs.length === undefined) {
        // Enkelvoudige radio
        return inputs.checked ? inputs.value : null;
    }
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            return inputs[i].value;
        }
    }
    return null;
}

/*
 * Waarom bestaan de getInputValue / getTextareaValue / getSelectValue functies?
 * - Om invoerwaarden op een consistente manier uit de DOM te halen.
 * Welke gegevens gebruiken deze functies?
 * - Waarden van input-, textarea- en select-elementen.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function getInputValue(id) {
    var el = document.getElementById(id);
    return el ? el.value : "";
}

function getTextareaValue(id) {
    var el = document.getElementById(id);
    return el ? el.value : "";
}

function getSelectValue(id) {
    var el = document.getElementById(id);
    if (!el) {
        return "";
    }
    return el.value;
}

/*
 * Waarom bestaat clearSelectOptions(selectEl)?
 * - Om een selectelement leeg te maken voordat nieuwe opties
 *   worden toegevoegd.
 * Welke gegevens gebruikt deze functie?
 * - Een select-element.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function clearSelectOptions(selectEl) {
    while (selectEl && selectEl.options && selectEl.options.length > 0) {
        selectEl.remove(0);
    }
}

/*
 * Waarom bestaat escapeHtml(text)?
 * - Om basis XSS-veiligheid te bieden bij het terugschrijven van
 *   gebruikersinvoer in de DOM.
 * Welke gegevens gebruikt deze functie?
 * - Stringwaarden die in innerHTML worden geplaatst.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function escapeHtml(text) {
    if (text === null || text === undefined) {
        return "";
    }
    var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#039;"
    };
    return String(text).replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

/* ============================================================
   GLOBALE MELDINGEN
   ============================================================ */

/*
 * Waarom bestaat showGlobalMessage(message, type)?
 * - Om één centrale plek te hebben voor meldingen bovenaan de
 *   pagina, zoals info, fout of succes.
 * Welke gegevens gebruikt deze functie?
 * - message (tekst) en type ('info', 'error', 'success').
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function showGlobalMessage(message, type) {
    var bar = document.getElementById("globalMessageBar");
    if (!bar) {
        return;
    }

    bar.className = "message-bar";

    if (type === "error") {
        bar.className += " message-error";
    } else if (type === "success") {
        bar.className += " message-success";
    } else {
        bar.className += " message-info";
    }

    bar.innerHTML = message;
}

/*
 * Waarom bestaat clearGlobalMessage()?
 * - Om de globale melding te verbergen en leeg te maken.
 * Welke gegevens gebruikt deze functie?
 * - Alleen het element #globalMessageBar.
 * Welke REST-call is hier bedoeld?
 * - Geen.
 */
function clearGlobalMessage() {
    var bar = document.getElementById("globalMessageBar");
    if (!bar) {
        return;
    }
    bar.className = "message-bar message-bar-hidden";
    bar.innerHTML = "";
}

/* ============================================================
   WINDOW ONLOAD
   ============================================================ */

window.onload = function () {
    initApp();
};
