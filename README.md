## Inspiration
Die Elektromobilität in der Stadt St. Gallen boomt. Stand Oktober 2021 sind über 1000 Elektrofahrzeuge immatrikuliert. Das Energiekonzept der Stadt sieht bis 2050 nur noch elektrisch angetriebenen Fahrzeuge in der Stadt vor. Demgegenüber stehen bisher 65 öffentliche Ladestationen. Dieser Ausbau wird in den nächsten Jahren vorangetrieben und ist kostenintensiv.
Weiter betreibt die Stadt 35 Photovoltaikanlagen mit einer Peakleistung von 7700kW. Diese liefern die Leistung abhängig der Sonnenscheindauer und könnten an sonnigen Tagen günstig Strom abgegeben.

## What it does
Die bestehenden Kandelaber, welche in der Nähe von öffentlichen Parkplätzen stehen, sollen als öffentliche Ladepunkte ausgebaut werden. Auch andere Schweizer Städte möchten Strassenlaternen / Kandelaber in Zukunft als Ladestationen verwenden, so zum Beispiel die Stadt [Bern](https://www.ewb.ch/ueber-uns/medien/medienmitteilungen/2021/laternenladen).

 Unser Case ermittelt geeignete Standorte anhand Parkplatz-, Beleuchtungsanlagen- und Trottoir-Daten.
Weiter stehen von Frühling bis Herbst Leistungsüberschüsse der Photovoltaik-Anlagen an. Diese Energie soll effizient lokal genutzt werden können. E-Autos könnten in einem späteren Schritt als Ausgleichsspeicher dienen. Unser Tool soll dem umweltbewussten E-Auto Fahrer mitteilen, mit welchem Photovoltaik Anteil er in den nächsten Tagen am optimalsten sein Fahrzeug an einem Kandelaber-Lader lädt.

## How we built it
Unsere Lösung besteht aus drei separaten Komponenten:

### Potentielle Ladestationen suchen
Damit ein Parkplatz als Ladestation in Frage kommt, muss in zwei Metern um den Parkplatz herum ein Kandelaber stehen, der mit einem Ladeanschluss versehen werden kann. Um diese zu finden, haben wir die Datensets [Parkplätze und Parkhäuser](https://daten.stadt.sg.ch/explore/dataset/parkplatze-und-parkhauser-stadt-stgallen/information/?disjunctive.kategorie&disjunctive.plz&disjunctive.parkplatzart), [Öffentliche Beleuchtung](https://daten.stadt.sg.ch/explore/dataset/offentliche-beleuchtung-stadt-stgallen/information/) und den [Gemeindestrassenplan](https://daten.stadt.sg.ch/explore/dataset/gemeindestrassenplan/information/?disjunctive.strassenkl&disjunctive.strassenna&disjunctive.strassennr) der Stadt St. Gallen verwendet.
Die Daten haben wir in einem Jupyter Notebook mit Pandas und Geopandas weiterverarbeitet:

Die Parkplätze sind als einzelne Punkte im Datensatz abgebildet. Mit diesen Punkten suchen wir den Strassenabschnitt, in dem sich die Parkplätze befinden. Den Punkt des Parkplatzes projezieren wir auf die Kontur der Trasse. So wissen wir an welcher Strassenseite sich die Parkfelder befinden und können entlang dem Strassenverlauf nach Kandelabern suchen. Alle Parkfelder, die in zwei Meter Nähe eines Kandelabers stehen, exportieren wir als GeoJSON. So haben wir eine Liste der potentiell als Ladestation verwendbaren Parkplätze.
### Voraussage Photovoltaik Ladeanteil

Die E-Autos sollen wenn möglich mit grünem Strom / Photovoltaik-Strom geladen werden. Damit die Autofahrer möglichst vom Photovoltaik-Strom der Stadt profitieren können, möchten wir ihnen anzeigen, wann voraussichtlich viel Photovoltaik-Strom verfügbar sein wird.

Für die Prognose verwenden wir folgende Datensätze:
* Sonnenschein von Meteoschweiz
* Lufttemperatur von Meteoschweiz
* Regenwahrscheinlichkeit von Meteoschweiz
* [Stromproduktion der Solaranlagen der St. Galler Kraftwerke](https://daten.stadt.sg.ch/explore/dataset/stromproduktion-der-solaranlagen-der-stgaller-stadtwerke/information/?disjunctive.name&disjunctive.smart_me_name&disjunctive.modultyp&disjunctive.leistung_modul_in_wp)

Mit den historischen Wetter- und Stromproduktionsdaten trainierten wir in einem Jupyter Notebook mit Pandas und sklearn ein Lineares Regressionsmodell. Damit können wir auf einem Testdatensatz zu ca. 83% genau voraussagen, wie viel Photovoltaik-Strom pro Stunde aufgrund der Wetterlage produziert werden wird. Die vorausgesagten Produktionsdaten werden schlussendlich wieder exportiert, damit sie im Frontend angezeigt werden können.

### Web Frontend

Die E-Autofahrer sollen auf einer Webseite sehen, wo es in der Nähe ihres Zielortes einen Kandelaber-Lader hat. Dafür haben wir eine Webseite mit Angular erstellt, die dem Benutzer auf einer Karte die Kandelaber-Lader der Stadt St. Gallen anzeigt. Als Datengrundlage verwenden wir die in den vorherigen Schritten aufbereiteten Daten. Die Karte ist mit [Leaflet.js](https://leafletjs.com) umgesetzt, damit werden auch die Positionen der Ladestationen dargestellt. Die Voraussage des Photovoltaik-Ladeanteils wird ebenfalls auf der Webseite dargestellt, umgesetzt mit [Highchart](https://www.highcharts.com).

## Challenges we ran into

Die Parkplätze werden von der Stadt St. Gallen als geographische Punkte bereitgestellt. Parkflächen für mehrere Autos (z.B. eine blaue Zone für 4 Autos) sind ebenfalls nur als einzelner Punkt vorhanden. Um mögliche Ladestationen zu finden, benötigen wir die genaue Fläche der einzelnen Parkfelder, damit wir den Abstand zu Kandelabern möglichst genau berechnen können.
Unsere erste Idee war, mittels Bilderkennung die genauen Parkplatzflächen in den Swisstopo Bilddaten nach den Parkfeldern zu suchen. Wegen fehlender vortrainierten Modellen oder Trainingsdaten für diesen Anwendungsfall haben wir diesen Ansatz aber wieder verworfen. Um das Problem schlussendlich zu lösen, haben wir einige Parkfelder der Stadt gemessen. Aufgrund der Parkplatzgrösse konnten wir den Strassenabschnitt / die Strassenseite eingrenzen, den wir nach möglichen Kandelabern absuchen. Um die Abstände korrekt zu messen bräuchten wir aber die genauen Positionen / Flächen der einzelnen Parkfelder.

## Accomplishments that we're proud of

Mit unserem Projekt konnten wir aufzeigen, dass es auch in der Stadt St. Gallen grosses Potential gibt, die Strassenlaternen als Ladestationen zu verwenden. Zusammen mit der Webanwendung für die E-Autofahrer können wir so vielleicht einen kleinen Beitrag für das Klimaziel der Stadt St. Gallen beisteuern!

## What we learned

Öffentliche Daten lohnen sich! Hätte die Stadt all die Daten die wir verwendeten nicht bereitgestellt, wäre es gar nicht möglich, Konzepte wie die Kandelaber-Lader zu erarbeiten.

## What's next for Kandelabergelaber

Um effektiv geeignete Standorte für Kandelaber-Lader zu finden, braucht es noch genauere Informationen zu den Parkplätzen in St. Gallen. Unsere aktuelle Lösung errechnet den ungefähren Standort der einzelnen Parkfelder. Mit der exakten Position der Parkfelder könnte genau ermittelt werden, welche Parkfelder tatsächlich in Frage kommen. Mit weiteren Daten (z.B. wo sind stark besuchte POIs oder allgemein viel Verkehr) könnte zusätzlich priorisiert werden, welche Parkfelder als erstes aufgerüstet werden sollen.

Des weiteren braucht es auch seitens Frontend noch weitere Funktionen, damit die Benutzer z.B. direkt nach einem Standort suchen könnten, auch mit der Information, ob der Parkplatz noch frei ist (z.B. mit dem Datensatz der [freien Parkplätze](https://daten.stadt.sg.ch/explore/dataset/freie-parkplatze-in-der-stadt-stgallen-pls/information/?disjunctive.phid&disjunctive.phname)).

In Zukunft könnten die Elektroautos an diesen Ladestationen auch einen weiteren Beitrag leisten: Mit ihren grossen Akkus sind die Elektroautos auch ein Energiespeicher, der dem Stromnetz wieder zur Verfügung steht.