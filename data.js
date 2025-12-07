const quotesData = [
    {
        id: 0,
        author: "Socrates",
        quote: "De enige ware wijsheid is weten dat je niets weet.",
        morning: {
            title: "De Beginner",
            desc: "Stel vandaag in elk gesprek minstens één vraag voordat je zelf je mening geeft."
        },
        challenges: [
            { title: "De Adviesvraag", desc: "Vraag advies aan iemand die jonger of 'lager in rang' is dan jij. Luister aandachtig." },
            { title: "De Waarom-ketting", desc: "Neem een overtuiging die je hebt. Vraag jezelf 5 keer 'Waarom geloof ik dit?' tot je bij de kern komt." },
            { title: "De Nieuwe Route", desc: "Loop of rijd een route naar huis die je nog nooit genomen hebt. Zet je navigatie uit." }
        ]
    },
    {
        id: 1,
        author: "Carl Jung",
        quote: "Wie naar buiten kijkt, droomt; wie naar binnen kijkt, ontwaakt.",
        morning: {
            title: "De Droomvanger",
            desc: "Schrijf direct na het wakker worden één gevoel of flard van een droom op, hoe vaag ook."
        },
        challenges: [
            { title: "Het Eerlijke Antwoord", desc: "Als iemand vraagt 'hoe gaat het?', geef geen automatisme maar een eerlijk antwoord over je binnenwereld." },
            { title: "Shadow Work Lite", desc: "Wat irriteerde je vandaag aan een ander? Schrijf op wat dit over jou zegt." },
            { title: "De Stille 10", desc: "Zit 10 minuten in een donkere kamer zonder prikkels. Alleen jij en je gedachten." }
        ]
    },
    {
        id: 2,
        author: "Rumi",
        quote: "Gisteren was ik slim, dus wilde ik de wereld veranderen. Vandaag ben ik wijs, dus verander ik mezelf.",
        morning: {
            title: "De Kleine Switch",
            desc: "Verander één kleine routine vanochtend. Drink thee ipv koffie, of poets met je andere hand."
        },
        challenges: [
            { title: "De Excuusbrief", desc: "Bied je excuses aan voor iets kleins waar je eigenlijk gelijk in dacht te hebben, maar wat de relatie schaadt." },
            { title: "Gewoonte-audit", desc: "Identificeer één slechte gewoonte en bedenk niet waarom je moet stoppen, maar welk gat het vult." },
            { title: "Opruimwoede", desc: "Kies één lade of plank in huis en orden die perfect. Orde buiten is rust binnen." }
        ]
    },
    {
        id: 3,
        author: "Anaïs Nin",
        quote: "We zien de dingen niet zoals ze zijn, we zien ze zoals wij zijn.",
        morning: {
            title: "De Brilwissel",
            desc: "Als je je vandaag ergert, zeg hardop: 'Dit zegt iets over mijn bui, niet over de situatie'."
        },
        challenges: [
            { title: "De Advocaat", desc: "Denk aan iemand die je niet mag. Schrijf 3 positieve eigenschappen van diegene op." },
            { title: "De Projectie", desc: "Beschrijf je omgeving alsof je verliefd bent. Beschrijf het daarna alsof je depressief bent. Zie het verschil." },
            { title: "De Foto", desc: "Maak een foto van iets lelijks (vuilnis, onkruid) op zo'n manier dat het mooi wordt." }
        ]
    },
    {
        id: 4,
        author: "Marcus Aurelius",
        quote: "Het geluk van je leven hangt af van de kwaliteit van je gedachten.",
        morning: {
            title: "De Poortwachter",
            desc: "Vang je eerste negatieve gedachte en 'hertaal' hem naar iets neutraals of positiefs."
        },
        challenges: [
            { title: "Complimentenkanon", desc: "Geef 3 mensen vandaag een oprecht compliment over hun karakter (niet hun uiterlijk)." },
            { title: "Dankbaarheidslijst", desc: "Schrijf 10 dingen op die je hebt, die je zou missen als ze weg waren." },
            { title: "Schermvrij Uur", desc: "Leg je telefoon een uur weg. Geen input, alleen je eigen gedachten." }
        ]
    },
    {
        id: 5,
        author: "Lao Tzu",
        quote: "Anderen kennen is intelligentie; jezelf kennen is ware wijsheid. Anderen beheersen is kracht; jezelf beheersen is ware macht.",
        morning: {
            title: "De Pauzeknop",
            desc: "Tel vandaag tot 3 voordat je antwoord geeft op een vraag of appje."
        },
        challenges: [
            { title: "Luistervink", desc: "Voer een gesprek waarin je zelf zo min mogelijk zegt. Laat de ander praten." },
            { title: "De Trigger", desc: "Wat maakt je boos? Schrijf het op en vraag: waarom raakt dit mij zo?" },
            { title: "Ademhaling", desc: "Doe de 4-7-8 ademhaling (4 in, 7 vast, 8 uit) voor 5 rondes." }
        ]
    },
    {
        id: 6,
        author: "René Descartes",
        quote: "Ik denk, dus ik ben.",
        morning: {
            title: "De Waarnemer",
            desc: "Kijk naar je gedachten alsof het wolkjes zijn die voorbij drijven. Jij bent de lucht."
        },
        challenges: [
            { title: "Diepe Vraag", desc: "Vraag aan iemand: 'Waar denk je het meest aan als je alleen bent?'" },
            { title: "Wie ben ik?", desc: "Schrijf 'Ik ben...' en vul het 10 keer anders aan (niet je beroep!)." },
            { title: "Zintuigen", desc: "Focus 5 minuten volledig op één zintuig (alleen horen, of alleen voelen)." }
        ]
    },
    {
        id: 7,
        author: "Baruch Spinoza",
        quote: "Ik heb er voortdurend naar gestreefd menselijke acties niet te bespotten, niet te betreuren en niet te verachten, maar te begrijpen.",
        morning: {
            title: "De Antropoloog",
            desc: "Bekijk mensen vandaag alsof je een wetenschapper bent die een vreemde diersoort bestudeert. Oordeel niet, observeer."
        },
        challenges: [
            { title: "De Vijand", desc: "Lees een artikel of mening waar je het fundamenteel mee oneens bent, met als doel het te snappen." },
            { title: "De Waarom-vraag", desc: "Vraag iemand waarom ze iets deden, zonder oordeel in je stem." },
            { title: "People Watching", desc: "Ga 15 minuten op een bankje zitten en kijk naar voorbijgangers. Verzin verhalen bij hun levens." }
        ]
    },
    {
        id: 8,
        author: "Friedrich Nietzsche",
        quote: "Hij die een waarom heeft om voor te leven, kan bijna elke hoe verdragen.",
        morning: {
            title: "De Zinmaker",
            desc: "Kies de vervelendste taak van vandaag en bedenk één hoger doel dat deze taak dient."
        },
        challenges: [
            { title: "De Levensvraag", desc: "Vraag aan een vriend: 'Wat is de reden dat jij 's ochtends je bed uitkomt?'" },
            { title: "Het Grafschrift", desc: "Schrijf in 1 zin wat er op je grafsteen moet staan." },
            { title: "De Uitdaging", desc: "Doe een fysieke oefening (plank/muurzit) net iets langer dan comfortabel is. Focus op je 'waarom'." }
        ]
    },
    {
        id: 9,
        author: "Seneca",
        quote: "We lijden vaker in onze verbeelding dan in de werkelijkheid.",
        morning: {
            title: "De Reality Check",
            desc: "Vraag jezelf bij elke zorg vandaag: 'Is dit nu aan de hand, of verzin ik een horrorscenario?'"
        },
        challenges: [
            { title: "De Vriendelijke Weigering", desc: "Vraag om korting of een extraatje, puur om 'nee' te horen." },
            { title: "Worst-Case", desc: "Schrijf je grootste angst van nu op en wat je zou doen als het uitkomt." },
            { title: "Koude Douche", desc: "Draai de kraan koud. Het lijden is vooral de angst voor de kou, niet de kou zelf." }
        ]
    },
    {
        id: 10,
        author: "Viktor Frankl",
        quote: "Alles kan een mens worden ontnomen, behalve de keuze van je houding.",
        morning: {
            title: "De Reset",
            desc: "Als iets tegenzit vandaag, glimlach en zeg: 'Ik kies hoe ik hierop reageer'."
        },
        challenges: [
            { title: "Dienstbaarheid", desc: "Doe iets aardigs voor iemand die het niet 'verdient' of die chagrijnig is." },
            { title: "Reframing", desc: "Herschrijf een negatieve herinnering. Wat heb je ervan geleerd?" },
            { title: "Vasten", desc: "Sla één maaltijd of tussendoortje over en kies ervoor om de honger te observeren zonder te klagen." }
        ]
    },
    {
        id: 11,
        author: "Confucius",
        quote: "Het maakt niet uit hoe langzaam je gaat, zolang je maar niet stopt.",
        morning: {
            title: "De Schildpad",
            desc: "Doe één taak vandaag bewust heel langzaam en met volledige aandacht."
        },
        challenges: [
            { title: "Geduld", desc: "Ga in de langste rij staan in de winkel en wacht geduldig zonder telefoon." },
            { title: "De Lange Adem", desc: "Werk 20 minuten aan een project dat je al tijden laat liggen." },
            { title: "Wandelen", desc: "Maak een wandeling waarbij je bewust slentert. Haast je niet." }
        ]
    },
    {
        id: 12,
        author: "Winston Churchill",
        quote: "Als je door een hel gaat, blijf dan lopen.",
        morning: {
            title: "De Stap Vooruit",
            desc: "Vermijd vandaag niets. Als je ergens tegenop ziet, doe het als eerste."
        },
        challenges: [
            { title: "Hulp Vragen", desc: "Deel een probleem waar je mee zit met iemand anders. Blijf er niet alleen mee lopen." },
            { title: "Dagboek", desc: "Schrijf over je huidige 'hel'. Wat is de volgende, kleinste stap eruit?" },
            { title: "Sprintje", desc: "Ren of fiets even heel hard. Voel je hartslag en je kracht." }
        ]
    },
    {
        id: 13,
        author: "Nelson Mandela",
        quote: "De grootste roem in het leven ligt niet in nooit vallen, maar in telkens weer opstaan.",
        morning: {
            title: "De Comeback",
            desc: "Maak je een foutje vandaag? Zeg hardop: 'En nu weer door'."
        },
        challenges: [
            { title: "Sorry zeggen", desc: "Geef een fout toe aan iemand, zonder 'maar' of excuus." },
            { title: "Faal-CV", desc: "Schrijf 3 dingen op die mislukten in je leven en wat je daarvan leerde." },
            { title: "Evenwicht", desc: "Sta op één been met je ogen dicht tot je omvalt. Probeer het direct opnieuw." }
        ]
    },
    {
        id: 14,
        author: "Albert Camus",
        quote: "Midden in de winter begreep ik eindelijk dat er in mij een onoverwinbare zomer huisde.",
        morning: {
            title: "Het Lichtpuntje",
            desc: "Vind iets moois in een saaie of lelijke omgeving (een bloem, een lichtinval)."
        },
        challenges: [
            { title: "Troost", desc: "Stuur iemand die het moeilijk heeft een bemoedigend bericht." },
            { title: "Krachtbronnen", desc: "Maak een lijstje van 5 dingen die jou altijd energie geven." },
            { title: "Buitenlucht", desc: "Ga naar buiten, ongeacht het weer. Voel de wind of regen en geniet ervan." }
        ]
    },
    {
        id: 15,
        author: "Maya Angelou",
        quote: "Mensen zullen vergeten wat je zei, maar nooit vergeten welk gevoel je hen gaf.",
        morning: {
            title: "De Glimlach",
            desc: "Begroet iedereen die je tegenkomt vandaag (of de eerste 3) met een echte glimlach."
        },
        challenges: [
            { title: "Het Compliment", desc: "Geef een wildvreemde een compliment (over jas, hond, houding)." },
            { title: "Luisteren", desc: "Bel iemand op en praat niet over jezelf. Vraag alleen naar hen." },
            { title: "Verrassing", desc: "Leg een briefje of chocolaatje op het bureau/kussen van een huisgenoot of collega." }
        ]
    },
    {
        id: 16,
        author: "Plato",
        quote: "Wees vriendelijk, want iedereen die je ontmoet vecht een harde strijd.",
        morning: {
            title: "De Zachte Blik",
            desc: "Als iemand onaardig doet, bedenk dan: 'Welke pijn zou hij/zij hebben?'"
        },
        challenges: [
            { title: "De Check-in", desc: "Vraag aan iemand 'Hoe gaat het écht met je?' en wacht op het antwoord." },
            { title: "Metta", desc: "Wens in gedachten 3 voorbijgangers geluk en gezondheid toe." },
            { title: "Hulp", desc: "Vraag iemand 'Kan ik je ergens mee helpen?'" }
        ]
    },
    {
        id: 17,
        author: "Mahatma Gandhi",
        quote: "Wees de verandering die je in de wereld wilt zien.",
        morning: {
            title: "Het Voorbeeld",
            desc: "Ruim rommel op die niet van jou is, zonder te klagen."
        },
        challenges: [
            { title: "Vrijwilliger", desc: "Doe iets voor de gemeenschap (raap vuil op, help een buur)." },
            { title: "Visie", desc: "Schrijf op: Hoe ziet jouw ideale wereld eruit? Wat is jouw rol daarin?" },
            { title: "Consuminder", desc: "Koop vandaag helemaal niets (behalve noodzakelijk eten)." }
        ]
    },
    {
        id: 18,
        author: "Moeder Teresa",
        quote: "Niet iedereen kan grote dingen doen. Maar we kunnen allemaal kleine dingen doen met grote liefde.",
        morning: {
            title: "De Aandacht",
            desc: "Doe één klein huishoudelijk klusje met volle liefde en aandacht."
        },
        challenges: [
            { title: "De Kaart", desc: "Schrijf en verstuur een echte handgeschreven kaart." },
            { title: "Dankbaarheid", desc: "Bedank iemand die 'onzichtbaar' werk doet (schoonmaker, buschauffeur)." },
            { title: "Koken", desc: "Maak een maaltijd voor iemand anders (of jezelf) en maak het mooi op." }
        ]
    },
    {
        id: 19,
        author: "Martin Luther King Jr.",
        quote: "Duisternis kan geen duisternis verdrijven, enkel het licht kan dat. Haat kan geen haat verdrijven, enkel de liefde kan dat.",
        morning: {
            title: "De Vredestichter",
            desc: "Reageer vandaag op negativiteit met positiviteit. Breek de cirkel."
        },
        challenges: [
            { title: "Vergeving", desc: "Vergeef iemand (in je hoofd) die je nog steeds iets kwalijk neemt." },
            { title: "Liefde", desc: "Zeg 'ik hou van je' tegen iemand die dicht bij je staat." },
            { title: "Licht", desc: "Brand een kaarsje en denk aan de mensen die het moeilijk hebben." }
        ]
    },
    {
        id: 20,
        author: "Oscar Wilde",
        quote: "Wees jezelf; alle anderen zijn al bezet.",
        morning: {
            title: "De Eigenheimer",
            desc: "Draag, zeg of doe iets wat jij leuk vindt, ook al is het niet 'cool' of hip."
        },
        challenges: [
            { title: "Guilty Pleasure", desc: "Luister je favoriete 'foute' muziek of kijk die ene serie. Zonder schaamte." },
            { title: "Uniekheid", desc: "Schrijf 3 dingen op die jou 'anders' maken dan de rest." },
            { title: "Dansen", desc: "Dans 5 minuten in je woonkamer alsof niemand kijkt (want niemand kijkt)." }
        ]
    },
    {
        id: 21,
        author: "Antoine de Saint-Exupéry",
        quote: "Alleen met het hart kun je goed zien. Het wezenlijke is voor de ogen onzichtbaar.",
        morning: {
            title: "De Voeler",
            desc: "Neem een beslissing vandaag op gevoel, niet op feiten of logica."
        },
        challenges: [
            { title: "Verbinding", desc: "Kijk iemand tijdens een gesprek 5 seconden lang echt in de ogen aan." },
            { title: "Intuïtie", desc: "Schrijf op wat je 'onderbuik' je vertelt over een dilemma." },
            { title: "Natuur", desc: "Raak een boom of plant aan en sta even stil bij het leven erin." }
        ]
    },
    {
        id: 22,
        author: "Heraclitus",
        quote: "Niemand stapt twee keer in dezelfde rivier, want het is niet dezelfde rivier en hij is niet dezelfde man.",
        morning: {
            title: "De Stroom",
            desc: "Accepteer dat alles verandert. Als iets anders loopt dan gepland, zeg: 'Prima'."
        },
        challenges: [
            { title: "Herinnering", desc: "Bezoek een plek uit je verleden (fysiek of online). Hoe is het veranderd? Hoe ben jij veranderd?" },
            { title: "Loslaten", desc: "Gooi iets weg of geef iets weg wat je niet meer nodig hebt." },
            { title: "Douche", desc: "Visualiseer onder de douche dat het water je zorgen van je afspoelt. Alles stroomt." }
        ]
    },
    {
        id: 23,
        author: "Charles Darwin",
        quote: "Het is niet de sterkste soort die overleeft, maar degene die zich het beste kan aanpassen.",
        morning: {
            title: "De Kameleon",
            desc: "Als er vandaag iets tegenzit, pas je plan direct aan zonder te morren."
        },
        challenges: [
            { title: "Nieuw Eten", desc: "Eet iets wat je nog nooit gegeten hebt." },
            { title: "Plan B", desc: "Bedenk voor een belangrijk doel een alternatieve route voor als het misgaat." },
            { title: "Houding", desc: "Zit eens op een andere stoel of plek in huis dan je gewend bent." }
        ]
    },
    {
        id: 24,
        author: "Mark Twain",
        quote: "Over twintig jaar zul je meer spijt hebben van de dingen die je niet deed, dan van de dingen die je wel deed.",
        morning: {
            title: "De Durfal",
            desc: "Zeg 'ja' tegen een kans of uitnodiging waar je eigenlijk een beetje bang voor bent."
        },
        challenges: [
            { title: "Bucketlist", desc: "Schrijf 1 ding op dat je dit jaar nog wilt doen en plan de eerste stap." },
            { title: "Contact", desc: "Stuur dat berichtje dat je al weken in je hoofd hebt maar niet durft te sturen." },
            { title: "Avontuur", desc: "Ga naar buiten en sla willekeurig ergens links of rechts af. Verdwaal een beetje." }
        ]
    },
    {
        id: 25,
        author: "Leonardo da Vinci",
        quote: "Eenvoud is de ultieme verfijning.",
        morning: {
            title: "De Minimalist",
            desc: "Schrap één taak van je to-do lijst die eigenlijk niet hoeft."
        },
        challenges: [
            { title: "Nee zeggen", desc: "Zeg vriendelijk nee tegen een verzoek waar je geen tijd/zin in hebt." },
            { title: "Opruimen", desc: "Maak je werkplek of eettafel helemaal leeg. Alleen het noodzakelijke blijft." },
            { title: "Stilte", desc: "Zet alle notificaties op je telefoon uit voor de rest van de avond." }
        ]
    },
    {
        id: 26,
        author: "Aristoteles",
        quote: "We zijn wat we herhaaldelijk doen. Excelleren is dus geen handeling, maar een gewoonte.",
        morning: {
            title: "De Herhaling",
            desc: "Kies één kleine positieve actie en doe hem vandaag op vaste tijden (bijv. elk uur water drinken)."
        },
        challenges: [
            { title: "Evaluatie", desc: "Kijk naar je dag. Welke gewoonte dient je niet? Hoe kun je die morgen anders doen?" },
            { title: "De Ketting", desc: "Start vandaag met een habit-tracker (op papier). Zet het eerste kruisje." },
            { title: "Oefening", desc: "Oefen iets wat je wilt leren 10 minuten lang (taal, instrument, sport)." }
        ]
    },
    {
        id: 27,
        author: "Albert Einstein",
        quote: "Verbeelding is belangrijker dan kennis.",
        morning: {
            title: "De Dromer",
            desc: "Sta jezelf toe om 5 minuten te dagdromen zonder doel."
        },
        challenges: [
            { title: "Creativiteit", desc: "Teken, schilder of knutsel iets. Het hoeft niet mooi te zijn." },
            { title: "Wat als?", desc: "Bedenk 3 onmogelijke dingen die je zou willen kunnen (vliegen, tijdreizen)." },
            { title: "Wolken", desc: "Kijk naar de lucht en bedenk figuren bij de wolken." }
        ]
    },
    {
        id: 28,
        author: "Boeddha",
        quote: "Het probleem is: je denkt dat je tijd hebt.",
        morning: {
            title: "De Urgencie",
            desc: "Behandel deze dag alsof het een kostbaar cadeau is. Verspil geen tijd aan onzin."
        },
        challenges: [
            { title: "Belangrijk", desc: "Wat zou je doen als je nog maar een maand te leven had? Doe iets kleins daarvan vandaag." },
            { title: "Tijdrovers", desc: "Verwijder een app van je telefoon waar je te veel tijd aan verspilt." },
            { title: "Meditatie", desc: "Mediteer 5 minuten op de vergankelijkheid van alles." }
        ]
    },
    {
        id: 29,
        author: "Voltaire",
        quote: "Laten we onze tuin cultiveren.",
        morning: {
            title: "De Tuinman",
            desc: "Richt je vandaag alleen op wat jíj kunt beïnvloeden. Laat de rest los."
        },
        challenges: [
            { title: "Zorg", desc: "Verzorg iets levends (een plant, een huisdier, jezelf)." },
            { title: "Lokale actie", desc: "Verbeter iets in je directe omgeving (je kamer, je straat)." },
            { title: "Creatie", desc: "Maak iets met je handen (koken, repareren, bouwen)." }
        ]
    }
];