
import {getShopDayWiseKPI} from './map_layer_country.js'

var current_state = ''
var previous_state = ''
var zip_code_level_kpi=[]
var cur_state_in=''

export function loadStateMap(state_lat_log,mymap,us_states_json,state_master_instock_prv_stock,color) {
    console.log("all data", state_master_instock_prv_stock);

    
    //  console.log(states_csv)
    mymap.off();
    mymap.remove();
  //  map_state = 1
  /*[
    "state",
    "latitude",
    "longitude",
    "STATE_NAME"
  ]*/
  console.log(state_lat_log);
  cur_state_in= state_lat_log[0].STATE_NAME;
    var co_ordinates =[state_lat_log[0].latitude,state_lat_log[0].longitude]
    console.log("cord",co_ordinates)
    mymap = L.map('mapid').setView(co_ordinates, 7);
    //var kl = states_csv.filter(key => key.REGION.toUpperCase() === region.toUpperCase())
    //console.log(kl)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNob2tyYWoiLCJhIjoiY2txcmY3aDVjMTBicDJ3cGJ0Z2o0enZ5bCJ9.MgxILsBUMHFlXRR_TuI6lQ', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1,
    }).addTo(mymap);

     
    

L.geoJSON(us_states_json, {
        filter: function (feature) {
          // console.log(feature.properties.name)
            

            // kl=temp2.filter(key => key.REGION.toUpperCase() === 'Midwest'.toUpperCase())
            //kl.map(e => e.STATE).indexOf("Indiana")
            //console.log(region)

            //console.log(kl)
           // var rlt = kl.map(e => e.STATE).indexOf(feature.properties.name)
            // console.log(feature.properties.name, "  " ,rlt )
            //  console.log(rlt===-1?true:flase )
            //if (rlt == -1) { rlt = 0 } else { rlt = -1 }
        

          if (feature.properties.name===cur_state_in){
            return -1}
            else {return 0}
        },

        style: function (feature) {
            if (feature.properties.name===cur_state_in){
                return {
                  fillColor: "none",
                    weight: 2,
                    //opacity: 0,
                    color: 'blue',  //Outline color
                   // fillOpacity: 0.7
                };}else {

                }


        }

    }).addTo(mymap);
 
   // L.marker([50.5, 30.5]).addTo(map);

   /* {
        "UI_NAME": "Walmart Grocery 98532#2249",
        "INSTOCK_RATE": "35.0",
        "PRV_INSTOCK_RATE": "42.0",
        "SHOP_ID": "2327",
        "SHOP_GROUP_ID": "NULL",
        "SET_ID": "0",
        "SHOP_NAME": "delivery.walmart.com",
        "CODE": "98532$2249",
        "USER_CODE": "kraft_availability_pricing_only",
        "ZIP_CODE": "98532",
        "STATE_NAME": "Washington",
        "STATE_ID": "WA",
        "DIVISION": "Pacific",
        "REGION": "Pacific Northwest",
        "CITY": "Chehalis",
        "STREET_ADDRESS": "1601 Nw Louisiana Ave, Chehalis, WA 98532, United States",
        "LATITUDE": "46.678925",
        "LONGITUDE": "-122.979138",
        "RETAILER": "4160"
      } */

    

var filterd_state_data=[]
//<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
   state_master_instock_prv_stock.filter(k=>k.STATE_NAME===cur_state_in).forEach(element => {
    filterd_state_data.push(element)
    var icon_color=color(element.INSTOCK_RATE)
    var myIcon =L.divIcon({
        html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style="fill:` + icon_color + `"  d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
        `,
        className: "",
        iconSize: [24, 40],
        iconAnchor: [12, 40],
      });  
       var coords = [element.LATITUDE,element.LONGITUDE]
      var marker= L.marker(coords, {icon: myIcon})
        marker.key=[element.UI_NAME ,element.INSTOCK_RATE ,element.SHOP_ID]
        marker.addTo(mymap);
     // marker.valueOf()._icon.style.forgroundColor = 'green'
      console.log(icon_color)
    //  marker.bindPopup(element.PRV_INSTOCK_RATE);
      marker.on('mouseover',function(e) {
          console.log("e " ,e )
          var shop_name=e.sourceTarget.key[0]
          var in_st_rate=e.sourceTarget.key[1]
          var x = e["layerPoint"].x
          var y = e["layerPoint"].y
          var shop_id=element.SHOP_ID
          console.log("shop_name", shop_name)
          console.log("in_st_rate", in_st_rate)



      //  marker.openPopup();
     getShopDayWiseKPI(shop_id, '2021-01-01', '2021-11-11', createChartShopHelper)
    document.getElementById('moveAble').style.opacity = 1
    document.getElementById('moveAble').style.marginLeft = x + "px";
    document.getElementById('moveAble').style.marginTop = y + "px";
      function createChartShopHelper(error,shop_day_wise){
        console.log("shop_name", shop_name)
        console.log("in_st_rate", in_st_rate)
        createChartShop(shop_day_wise,shop_name,in_st_rate);
      }
      });
     // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    //circle.bindPopup("I am a circle.");
    //polygon.bindPopup("I am a polygon.");
      
   });
  

   function onMoseOut() {
    document.getElementById('moveAble').style.opacity = 0;
}
mymap.on('mouseout', onMoseOut);
    // ****************************************************************************************************
    //function loadregion





   addTableState(filterd_state_data);


}


function addTableState(tabdata) {
    console.log("tab " ,tabdata);
  //  <h2 id = "id1H2" class="h2class">In Stock Rate By Region</h2>
    if(tabdata.length==1){
        document.getElementById("id1H2").innerText = "In Stock Rate in " + tabdata.flatMap(Object.values)[0]

    }else {
  document.getElementById("id1H2").innerText = "In Stock Rate in " + tabdata[1]["STATE_NAME"]
    }
    $("#datatable").remove();
    $("#datatablediv").append(" <table id=\"datatable\"></table>")
    //datatablediv
    $('#datatable tr[id=nameoftr]').remove();
    var markup = "<tr><th>Shop Name</th><th>In Stock Rate</th></tr>"
    var row = '';
    for (var i = 0; i <= tabdata.length - 1; i++) {
        var k = tabdata[i]["UI_NAME"]
        var in_stock_rate_diff = Math.round(tabdata[i]["INSTOCK_RATE"] - tabdata[i]["PRV_INSTOCK_RATE"], 2)
        //  console.log(row)
        var up_arrow = " &#8593"
        var down_arrow = " &#8595"

        var color_html;
        //<span class="mychangecolor"> I am in yellow color!!!!!!</span>
        if (in_stock_rate_diff < 0) {
            // tabdata[i]["INSTOCK_RATE"]+ arrow + "(" + in_stock_rate_diff + ")"
            color_html = tabdata[i]["INSTOCK_RATE"] + "<span class=prv_instock_rate_negative>" + down_arrow + "(" + in_stock_rate_diff + ") </span>"
        } else {
            color_html = tabdata[i]["INSTOCK_RATE"] + "<span class=prv_instock_rate_positive>" + up_arrow + "(" + in_stock_rate_diff + ") </span>"
        }


        row = row + "<tr><td>" + k + "</td><td>" + color_html + "</td></tr>"

    }
    markup = markup + row
    $("#datatable").append(markup);
}

//createChartShop(shop_day_wise,shop_name,in_st_rate);

function createChartShop( shop_day_wise,shop_name,in_st_rate) {

    console.log("called create chart  shop ",shop_day_wise)
    console.log("shop_name", shop_name)
    console.log("in_st_rate", in_st_rate)
    console.log("*******" )
     //<div class="info" id="id2"  style="width: 100; height: 100;">
     //<p>In Stock Rate: 10 %  (-8%   )  </p>
     //<canvas id="myChart" width="100" height="100"></canvas>
    //var metrics=getInstockRateState(current_state,sate_data)
     //  console.log("metrics " ,metrics)
     document.querySelector("#id2").innerHTML = ' <p>' + shop_name +' <br>ISR: ' + in_st_rate  + '% </p> <canvas id="myChart" width="200" height="200"></canvas>';
 
 
     var ctx = document.getElementById('myChart').getContext('2d');
     // const labels = ['Jan','Feb','Mar'];
     const labels = []
     shop_day_wise.forEach(function (item) { labels.push(item.WEEKBDAY) })
    // console.log("label", labels)
     const mydatadata = []
     shop_day_wise.forEach(function (item) { mydatadata.push(item.IN_STOCK_RATE) })
  //   console.log("mydatadata", mydatadata)
     const data = {
         labels: labels,
         //legend: { display: false },
         datasets: [{
             label: '',
             data: mydatadata,
 
             fill: false,
             borderColor: 'rgb(75, 192, 192)',
             tension: 0
         }]
     };
 
     const config = {
         type: 'line',
         data: data,
         options: {
             plugins: {
                 legend: {
                     display: false
                 },
             }
         }
     };
 
     const chart = new Chart(ctx, config)
 }