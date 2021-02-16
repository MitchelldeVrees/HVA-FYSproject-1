# Testplan voor travelbuddy's
**Team**: IS102-2  
**Versie**: 1  
**Datum**: 16/12/2019

**Teamleden**:
- 500799984, Mitchell
- 500816420 Jarno
- 500831622, Noel
- 500821598, Jens
- 500811643, Jasmin

# Inleiding
In dit document gaan wij tests uitvoeren vooor de website. We voeren een System test en Smoke test uit.
Op onze website kan je met mensen verbinden die dezelfde interresse's hebben en die naar het zelfde land willen reizen.
Hierdoor kan je een buddy vinden om mee op vakantie te gaan.

# System Test
Hieronder volgen de test cases die beschikbaar zijn voor een System Test van de website. 

System Tests worden uitgevoerd om te garanderen dat de website in zijn geheel naar behoren functioneert en zijn daarom zeer gedetailleerd uitgewerkt, inclusief alternatieve scenario's waar nodig.

## 1 : Test Bericht Sturen
**Test Case ID:** Mitchell de Vries  
**Test Case Titel:** Test Bericht Sturen    
**Test Prioriteit (Hoog/Gemiddeld/Laag):** Gemiddeld  
**Gerelateerde requirements:**   
**Pre-condities:** Geen

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |

| 1 | Bericht sturen, Aan wie: jensmeeuwis@gmail.com | Onderwerp: TEST | Bericht: Hallo dit is een test | Dat jens een email krijgt met als onderwerp TEST en als bericht "hallo dit is een test"      

### Extensie Scenario - 1 - Bericht Sturen
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |

| 1.1 | Een email adres kunnen invoeren | Jensmeeuwis@gmail.com | Dat Jens een email in zijn inbox krijgt |  
| 1.2 | Een onderwerp kunnen invoeren | TEST | Dat wanneer je de email opent je als onderwerp TEST krijgt te zien |  
| 1.3 | Een tekst kan invoeren | Hallo, dit is een test | Dat je als bericht Hallo, dit is een test krijgt |  

## 2 : Test Inlogscherm
**Test Case ID:** Jens Meeuwis  
**Test Case Titel:** Inlogscherm  
**Test Prioriteit (Hoog/Gemiddeld/Laag):** Gemiddeld  
**Gerelateerde requirements:**   
**Pre-condities:** Geen

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |

| 1 | Inloggen Goed | E-mailadres & Wachtwoord | Inloggen op het account |  
| 2 | Inloggen Fout | E-mailadres & Wachtwoord | Een melding met dat het wachtwoord onjuist is |                      
                       

### Extensie Scenario - 1 - Inloggen Goed
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |

| 1.1 | E-mailadres invullen | E-mailadres: jensmeeuwis@gmail.com | Nog geen resultaat |  
| 1.2 | Wachtwoord invullen | Wachtwoord: FYS_team02 | Nog geen resultaat |  
| 1.3 | "Inloggen" knop indrukken | Muisklik | Ingelogd zijn met je account |  

### Extensie Scenario - 2 - Inloggen Fout

| 2.1 | E-mailadres invullen | E-mailadres: jensmeeuwis@gmail.com | Nog geen resultaat |  
| 2.2 | Wachtwoord invullen | Wachtwoord: DitIsEenFoutWachtwoord | Nog geen resultaat |  
| 2.3 | "Inloggen" knop indrukken | Muisklik | Een melding krijgen dat het wachtwoord onjuist is |  

## Test Registreren
**Test Case ID:** Jasmin Mahoud  
**Test Case Titel:** Test Registreren   
**Test Prioriteit (Hoog/Gemiddeld/Laag):** Hoog  
**Gerelateerde requirements:**   
**Pre-condities:** Geen

### Main Scenario
| Stap | omschrijving | Invoer |  Verwacht resultaat |

| 1 | Mijn gegevens in de register kunnen invullen | Jasmin, Mahmoud, mjasminsje@gmail.com, 19, Halo12345 | Een foutmeldingen ontvangen |  
| 2 | Geen verkeerde gegevens in de register kunnen invullen | Jasmin, Mahmoud, bfhwebjwh@gwrvjkwenkjn , 2000, 123, ... | Een foutmeldingen ontvangen |  

                       

### Extensie Scenario - 1 - Gegevens correct in register invoeren
|Branch Stap| Omschrijving | Invoer | Verwacht resultaat |

 | 1.1 | Gegevens in kunnen invoeren | Jasmin, Mahmoud| Geen foutmelding, doordat juiste gegevens zijn ingevuld|  
 | 1.2 | Een E-mail kunnen invoeren | mjasminsje@gmail.com | Geen foutmelding, doordat juiste gegevens zijn ingevuld|  
 | 1.3 | Een leeftijd kunnen invoeren | 19 | Geen foutmelding, doordat juiste gegevens zijn ingevuld |  
 | 1.4 | Een wachtwoord kunnen invoeren | Halo12345 | Geen foutmelding, doordat juiste gegevens zijn ingevuld |  
 
 ### Extensie Scenario - 2 - Gegevens incorrect in register invoeren
 |Branch Stap| Omschrijving | Invoer | Verwacht resultaat | 
 
  | 2.1 | Gegevens in kunen invoeren | Jasmin, Mahmoud| Geen foutmelding, doordat juiste gegevens zijn ingevuld |  
  | 2.2 | Geen incorrecte E-mail kunnen invoeren | bfhwebjwh@gwrvjkwenkjn | Een foutmelding krijgen, doordat de gegevens onjuist zijn ingevuld |  
  | 2.3 | Geen incorecte leeftijd kunnen invoeren | 2000 | Een foutmelding krijgen, doordat een onjuiste leeftijd is ingevuld |  
  | 2.4 | Geen incorecte wachtwoord kunnen invoeren | 123 | Een foutmelding krijgen, doordat er een onjuist wachtwoord is ingevuld |  
  | 2.5 | Geen lege vak kunnen laten |...| Een foutmelding krijgen, doordat er niks is ingevuld |

## Test Profiel Aanpassen  
**Test Case ID:** Noël Beckers    
**Test Case Titel:** Test Oefenen  
**Test Prioriteit (Hoog/Gemiddeld/Laag):** Gemiddeld  
**Gerelateerde requirements:**   
**Pre-condities:** Maak een nieuw account aan, Aanhef: Dhr., Voornaam: Test, Achternaam: Test, Leeftijd: 18, E-mailadres: TravelbuddiesFYS@gmail.com, Wachtwoord: Admin1234 en log in.

### Noël Beckers : Profiel aanpassen  
| Stap | Omschrijving | Invoer |  Verwacht resultaat |

| 1 | Test of alle onderdelen binnen het profiel aangepast kunnen worden | Exacte invoer staat beschreven in de extensie scenario | Alle kollommen kan in worden gevuld en verschijnt op het beeld  
| 2 | Test of alle onderdelen binnen het profiel opgeslagen kunnen worden | Exacte invoer staat beschreven in de extensie scenario | Alle kollommen worden opgeslagen/aangepast in de database, de pagina zal refreshen en de ingevulde gegevens tonen bij de bijbehorende kollomen

### Extensie Scenario - 1 - Profiel aanpassen  
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |

| 1.1 | Upload een kleine profielfoto | Gebruik zelf een kleine foto of gebruik deze: https://imgur.com/a/WPHtbCA | De naam van de foto staat rechts van "Bestand kiezen" en er worden 3 previews gegeven |  
| 1.2 | Upload een grote profielfoto  | Gebruik zelf een grote foto of gebruik deze: https://imgur.com/a/fkc6RGk | De naam van de foto staat rechts van "Bestand kiezen" en er worden 3 previews gegeven |  
| 1.3 | Vul een voornaam, achternaam, leeftijd, interesse 1 en 2 in | Vul de volgende gegevens in: Voornaam: Admin van, Achternaam: admin, Leeftijd: 22, Interesse 1: Fietsen, Interesse 2: Gamen | De voornaam, achternaam, leeftijd, interesse 1 en 2 kunnen ingevuld worden en blijft zichtbaar op het scherm |  
| 1.4 | Selecteer een geslacht en vakantie land | Klik beide geslachten minstens 1 keer aan en laat het tenslotte op "Man" staan en probeer alle landen ook minstens 1 keer aan te klikken en laat het vervolgens op "Griekeland" staan | Alle opties zijn klikbaar en verschijnen op het scherm |  
| 1.5 | Vul het vak "Over mij" volledig in | Check of er een limit van 255 karakters in zit door de tekst op deze pagina op te slaan en in te vullen in het vak: https://www.lipsum.com/feed/html | Het vak kan ingevuld worden en blijft verschijnen op het beeld, Er kan niet meer dan 255 karakters worden ingevuld |

### Extensie Scenario - 2 - Profiel opslaan  
| 2.1 | Sla de ingevulde gegevens van stap 1 op | Vul de gegevens van stap 1 in en druk op de opslaan knop | De gegevens worden opgeslagen in de database, De pagina refresht en vervolgens worden de opgeslagen gegevens vertoont in de juiste kollommen.|  
| 2.2 | Verander foto naar een kleine foto | Upload een kleine profielfoto, Gebruik zelf een kleine foto of gebruik deze: https://imgur.com/a/WPHtbCA en druk op de opslaan knop | De foto wordt opgeslagen en wordt getoont bij het vak van profielfoto en ook rechtsboven in het scherm getoont |  

## 2 : Test buddies zoeken 
**Test Case ID:** Jarno van der Velde  
**Test Case Titel:** Buddies  
**Test Prioriteit (Hoog/Gemiddeld/Laag):** Hoog  
**Gerelateerde requirements:**   
**Pre-condities:** Ingelogd zijn en interesse's op je profiel

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |

| 1 | Buddies zoeken correct | Op de Tab buddies klikken | Buddies zien die dezelfde interesses hebben als jij |  
| 2 | Buddies zoeken fout | Op de Tab buddies klikken | Geen enkele buddy zien |                      
                       

### Extensie Scenario - 1 - Buddies zoeken correcte buddies
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |

| 1.1 | Interesse's correct hebben ingevoerd |Interesse 1: Gamen Interesse 2: lekker niksen | Nog geen resultaat |  
| 1.2 | Opslaan klikken zodat de interesse's worden opgeslagen | Op het knopje opslaan klikken | Nog geen resultaat |  
| 1.3 |  Buddies vinden | Op de tabblad buddies klikken | Buddies met de interesse Gamen en Lekker niksen. |  

### Extensie Scenario - 2 - Buddies zoeken foute buddies

| 2.1 | Interesse's correct hebben ingevoerd |Interesse 1: Gamen Interesse 2: lekker niksen | Nog geen resultaat |  
| 2.2 | Opslaan klikken zodat de interesse's worden opgeslagen | Op het knopje opslaan klikken | Nog geen resultaat |   
| 2.3 | Buddies vinden | Op de tabblad buddies klikken | Je ziet geen enkele buddies. Of je ziet buddies met de verkeerde interesses |


# Smoke Test
Hieronder volgen de test cases die beschikbaar zijn voor een Smoke Test van de website. 

Smoke Tests worden uitgevoerd na uitrol van een nieuwe versie om te garanderen dat de belangrijkste onderdelen van de website nog steeds functioneel zijn. Deze test cases zijn een stuk minder gedetailleerd dan System Tests omdat ze snel uit te voeren moeten zijn, liefst binnen 20 minuten.

## [Login]
| 1 | Registreren met een testnaam: admin admin, e-mailadres: admin@gmail.com en leeftijd: 20 Wachtwoord: admin | Check of de gegevens worden opgeslagen bij het aangemaakte account in de database |  
| 2 | Inloggen met de admin@gmail.com en wachtwoord: admin  | Verwacht in te loggen met de aangemaakte gegevens en ze dan ook nog te bekijken op het profiel |


## [Bericht sturen]
| 1 | Een email sturen naar jens.meeuwis@hva.nl door zijn adres in te voeren en als titel: "Tekst" en als bericht: "Test" te typen en te versturen | De ontvanger krijgt de mail binnen met de titel en tekst die was ingevoerd |

## [Buddy zoeken]
| 1 | Het zoeken van buddy's op de homepagina als er turkije wordt ingevuld | Personen worden vertoont die ook naar turkije wordt gegaan |

## [Reizen bekijken]
| 1 | Klik op 2 reizen die onder op de pagina staan| Wordt doorgestuurd naar de boekpagina van de gedrukte reis |

## [Profielgegevens aanpassen]
| 1 | Op het account van admin het profiel aanpassen als volgt: Profielfoto naar keuze, Voornaam: Dirk, Achternaam: Zegenveer, Leeftijd: 30, Geslacht: Man, Over mij: Test test test, Interesse 1: Fietsen, Interesse 2: Gamen, Vakantie Land: Griekeland| Als er op opslaan wordt gedrukt veranderen de gegevens in de database en meteen opnieuw vertoont op de website|


