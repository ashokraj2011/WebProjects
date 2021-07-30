
import { getRegionMapJson } from './map_layer_country.js';
import { getRegoinAPI } from './map_layer_country.js';
import { getStateAPI } from './map_layer_country.js'
import  {MidPoints } from './lib/variables.js '
import {color} from './lib/variables.js'
import  { initRegionMap} from './lib/map_country.js'
import {loadDataToRegionMap }  from  './lib/map_country.js'
import {addClickEventToRegMap }  from  './lib/map_country.js'
import {addTextLabelAndKPIRegion }  from  './lib/map_country.js'
import {fillCountryData} from './lib/map_country.js '

import {loadRegionMap} from './lib/map_region.js'
import {getRegionDayWiseKPI} from './map_layer_country.js'



 
var svg = d3.select("#mapid");
var div = d3.select("body").select(".tooltip");
var region_in_stock_g;



//console.log(MidPoints)

div.style("display", 'none')
div.style.pointerEvents = 'none';
var sdiv = div.select('.text-content')
sdiv.select("h3").text("region")
sdiv.select("h4").text("in stock")
let map_state = 0

var width = 800;
var height = 700;
var prevSelectedRegion = '';
svg.attr("width", width)
svg.attr("height", height)


let region_kpi;
getRegoinAPI(fillRegionData);
function fillRegionData(error, data) {
    region_kpi = data;
 
}


getRegionMapJson(loadMap)

function loadMap(error, states_geojson, us_states_json, states_csv) {
    //console.log(us_states_json)
    map_state = 0
    /* L.map('mapid', {
        zoomSnap: 0.25
    }); */

   var  mymap = L.map('mapid', {
    zoomSnap: 0.20
}).setView([37, -99], 3);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNob2tyYWoiLCJhIjoiY2txcmY3aDVjMTBicDJ3cGJ0Z2o0enZ5bCJ9.MgxILsBUMHFlXRR_TuI6lQ', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1,
    }).addTo(mymap);
    mymap.fitBounds([
        [48.712, -90.227],
       // [25.774, -124.125]
       [25.774, -100.125]
    ]);


   

    document.getElementById("btnhome").addEventListener("click", home);

    var states = states_geojson
    // Create regions and change color using stockdate 
    loadDataToRegionMap(mymap,states,color,region_kpi)


    //add click event to the Regional map

    addClickEventToRegMap( states,mymap,getStateAPI,loadRegionMap,MidPoints,states_csv,us_states_json,getRegionDayWiseKPI)
   
    //{ lat: 40.979898069620155, lng: -109.08984482288362 }
    addTextLabelAndKPIRegion(MidPoints,region_kpi,mymap)

    // ****************************************************************************************************

   

    //console.log("xxx",Object.keys(MidPoints))

    //var MidPoints = { "Rock Mountain":[40.1436, -109.5632],

    getRegoinAPI(fillCountryData);
   
  

    //mymap.on('click', onMapClick)


   

  function home() {
   // <div id="mapid" style="width: 900px; height: 500px;"></div>
//document.getElementById('weathermap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
//<div id="mapid" style="width: 900px; height: 500px;">

    document.getElementById('mapview').innerHTML = "<div id='mapid' style='width: 900px; height: 500px;'></div> ";
     

    getRegionMapJson(loadMap)

}

/*$(document).ready(function(){
    $('mapid').mousemove(function(e){

        console.log(e)
          var y = e.pageY;
          var x = e.pageX;
          $('.moveAble').css('top', y-20).css('left', x-20);
    });
  }); */


}

