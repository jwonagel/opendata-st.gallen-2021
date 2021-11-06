## Facts

Total Power kW Peak: 146'312


import dateutil.parser


## Download weather predeiction data

load current data:

Sunshine

http://www.meteoschweiz.admin.ch/product/input/measured-values/chartData/sunshine_hour/chartData.sunshine_hour.STG.de.json

Required Header:

Referer: https://www.meteoschweiz.admin.ch/home/messwerte.html?param=messwerte-sonnenscheindauer-10min&station=STG&chart=hour


Air temp

	https://www.meteoschweiz.admin.ch/product/input/measured-values/chartData/temperature_hour/chartData.temperature_hour.STG.de.json
    Referer: https://www.meteoschweiz.admin.ch/product/input/measured-values/chartData/temperature_hour/chartData.temperature_hour.STG.de.json


Rain: 
 	https://www.meteoschweiz.admin.ch/product/input/measured-values/chartData/precipitation_hour/chartData.precipitation_hour.STG.de.json
    Referer: https://www.meteoschweiz.admin.ch/home/messwerte.html?param=messwerte-niederschlag-10min&chart=hour&station=STG

    Download Stromprod

    https://daten.sg.ch/explore/dataset/stromproduktion-der-solaranlagen-der-stgaller-stadtwerke%40stadt-stgallen/export/?disjunctive.name&disjunctive.smart_me_name&disjunctive.modultyp&disjunctive.leistung_modul_in_wp