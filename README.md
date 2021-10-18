# KYC-website
A project for a potential employer 

## Oppgavebeskrivelse
Jeg valgte å følge foreslått oppgave grunnet min mangel på for mye erfaring med teknologien jeg ønsket å bruke. Jeg viste at tid var viktig for meg så jeg ønsket ikke å bruke for mye tid på å tenke på hva jeg skulle gjøre når jeg viste jeg kom til å bruke litt ekstra tid på å huske/lære på ny hvordan jeg bruker node og dens mange moduler. 

Det jeg endte opp med er en applikasjon hvor en bruker kan gjennomføre et PEP søk på en enkeltperson eller gjøre et mer grundig KYC søk ved å oppgi organisasjonsnummeret. Dersom en bruker velger å kjøre et søk på en organisasjon vil brukeren få data om personer som jobber i organisasjonen gjennom et pep søk på personer som relaterer til bedriften
Jeg valgte også å publisere oppgaven på Heroku. Her er en lenke til det:
https://lunde-erlend-job-app.herokuapp.com/ 

All funksjonalitet på siden baserer seg på Stacc sitt API. Jeg vurderte å starte på å skape mitt eget api basert på data vi fikk, men valgte å nedprioritere denne oppgaven grunnet tid. 

## Hvordan kjøre prosjektet
1.Last ned kode
2.Installer node
3.Kjør "npm install" i root av prosjektet
4.Kjør "node src/app.js" i root av prosjektet for å starte programmet
5.Gå til nettleser og skriv inn "localhost:3000" i nettleseren

Eventuelt kan det bli sett på gjennom Heroku:
https://lunde-erlend-job-app.herokuapp.com/ 


## Kommentarer

Utfordringer: 
Min største utfordring var mangel på erfaring med front end javascript og asynkronisert programmering. Jeg merker at javascriptet på klientsiden er ikke det jeg er mest stolt over men valgte å gjøre det på denne måten for å fullføre prosjektet til tidsrammen. Kjenner jeg angrer litt på å ikke ha satt meg mer inn i react.js eller vue.js tidligere. Om ikke annet har jeg funnet ut hva det neste jeg skal lære meg er for noe (tenker react).
Jeg har et litt optimalt oppsett når en søker etter PEP sjekk på personer gjennom bedriftsøket. Jeg looper gjennom et resultat i en forEach loop og returnerer personen sin pep status til nettsiden. Jeg ønsket å gi brukeren en melding før søket startet som «PEP søk er startet» og deretter gi brukeren en melding som «PEP søk ferdig» men grunnet oppsettet mitt klarer jeg ikke helt se hvordan jeg lett kan gjøre dette. (Jeg har en teori om hvordan jeg kan lage en funksjon som tar inn en callback fonksjon som jeg gir pep søk oppgaven til og returnerer en ferdigmelding når callback funksjonen er ferdig men grunnet tid og egen erfaring fikk jeg ikke implementert det)

en bug som irriterer meg men jeg ikke får kontroll på i tide er: 
programmet sjekker om det er et eksisterende resultat på siden før den starter et nytt søk. Deretter fjerner applikasjonen eksisterende resultat rett før den starter å søke, men siden det tar applikasjonen noen sekunder å gjennomføre søket er det mulig å klikke på «søk knappen» igjen før det har kommet et resultat. Dette kan resultere i at samme resultat returneres flere ganger dersom en bruker velger å «Spamme» søk knappen(har en ide om en løsning som innebærer å lage en sjekk på om det allerede er sendt en forespørsel om data men fikk ikke implementert dette i tide)

Nå har jeg kanskje virket litt negativ, men det er jeg ikke. Jeg er stolt over hva jeg har laget på tiden vi fikk og ikke minst har jeg hatt det veldig gøy med å lage det. Det var utrolig flott å ha en ekstern motivasjon til å jobbe med programmering (samt en unnskyldning til min samboer om hvorfor jeg må bruke så mye tid på programmering og mindre tid på husarbeid 😉)

Jeg ønsker å takke Stacc for muligheten jeg får til å delta på teknisk intervju og ikke minst for å la meg delta på en gøy og utfordrerne kodeoppgave
