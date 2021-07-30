var current_region = ''
var previous_region = ''
var region_data=[]
export function initRegionMap(mymap) {
    mymap = L.map('mapid').setView([37, -99], 6);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNob2tyYWoiLCJhIjoiY2txcmY3aDVjMTBicDJ3cGJ0Z2o0enZ5bCJ9.MgxILsBUMHFlXRR_TuI6lQ', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1,
    }).addTo(mymap);
    mymap.fitBounds([
        [26.712, -70.227],
        [54.774, -124.125]
    ]);
    //  return mymap;
}
 

export function loadDataToRegionMap(mymap, states, color, region_kpi) {
    L.geoJSON(states, {

        style: function (feature) {
            try {
                var temp = region_kpi.filter((({ REGION }) => REGION === feature.properties.region))
                console.log(temp)
                var in_stock_rate = temp[0]["INSTOCK_RATE"]
                console.log("color ", color(in_stock_rate))
                return {
                    fillColor: color(in_stock_rate),
                    //fillColor: "red",
                    fillOpacity: 0.8,
                    // opacity: 1,
                    color: "White"
                };
            } catch (err) {
                //do nothong

            }



        }

    }).addTo(mymap);
}


export function addClickEventToRegMap(states, mymap, getStateAPI, loadRegionMap, MidPoints, states_csv, us_states_json, getRegionDayWiseKPI) {

    function onMapClick(e) {
       // console.log(e.latlng)
        // window.open(e.latlng)
        var gjLayer = L.geoJson(states);
        var results = leafletPip.pointInLayer(e.latlng, gjLayer);
        try {
            var rg = results[0].feature.properties
            document.getElementById('moveAble').style.opacity = 0
            getStateAPI(callRegonMap)
            function callRegonMap(error, state_kpi_data) {
                loadRegionMap(rg["region"], state_kpi_data, mymap, MidPoints, states_csv, us_states_json);
            }

        } catch (err) {

            console.log(err)
        }

    }

    mymap.on('click', onMapClick);



    function onHover(e) {
       // console.log(e)
        //console.log(e.x)
        var gjLayer = L.geoJson(states);
        var results = leafletPip.pointInLayer(e.latlng, gjLayer);
        //     console.log(results)
        try {
            var rg = results[0].feature.properties
            //     console.log("region as " , rg["region"])
            // var y = e["originalEvent"].layerY 
            //var x =  e["originalEvent"].layerX
            var y = e["clientY"]
            // var x =  e["clientX"]
            //var x =  e["clientY"]
            //    ["layerPoint"].x
            var x = e["layerPoint"].x
            var y = e["layerPoint"].y
        //    console.log(x, y)
            //calll create chart 
          //  console.log(rg.region)
            current_region = rg.region
            //var current_region=''
            //var previous_region=''
            if (current_region != previous_region) {
                getRegionDayWiseKPI(rg.region, '2021-01-01', '2021-11-11', createChart)
            }
            previous_region = rg.region
            //   console.log("doc " , document.getElementById('moveAble'))'
            document.getElementById('moveAble').style.opacity = 1
            document.getElementById('moveAble').style.marginLeft = x + "px";
            document.getElementById('moveAble').style.marginTop = y + "px";

            // createChart()
            //  mymap.off();
            // mymap.remove();
            // getRegionMapJson(loadMap)
            //  getInstockRate(region_in_stock_g)
            //  console.log("{" + rg["region"] + ":[" + e.latlng.lat + "," + e.latlng.lng + "]}")

            // console.log(region_kpi)
        } catch (err) {

            console.log("error")
        }
    }
    mymap.on('mousemove', onHover);

    function onMoseOut() {
        document.getElementById('moveAble').style.opacity = 0;
    }
    mymap.on('mouseout', onMoseOut);

}

//#########################################

function createChart(error, regoin_data) {
  //  console.log(regoin_data)
   // console.log("called create chart")

    //<div class="info" id="id2"  style="width: 100; height: 100;">
    //<p>In Stock Rate: 10 %  (-8%   )  </p>
    //<canvas id="myChart" width="100" height="100"></canvas>
    

    document.querySelector("#id2").innerHTML = ' <p>In Stock Rate: 10 %  (-8%   )  </p> <canvas id="myChart" width="100" height="100"></canvas>';


    var ctx = document.getElementById('myChart').getContext('2d');
    // const labels = ['Jan','Feb','Mar'];
    const labels = []
    regoin_data.forEach(function (item) { labels.push(item.WEEKBDAY) })
   // console.log("label", labels)
    const mydatadata = []
    regoin_data.forEach(function (item) { mydatadata.push(item.IN_STOCK_RATE) })
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



//Region specific maps


export function addTextLabelAndKPIRegion(MidPoints, region_kpi, mymap) {
    Object.keys(MidPoints).forEach(function (key) {
        var textLatLng = MidPoints[key]
        var key = key;
        var html_text = getInstockRateRegion(key, region_kpi)

        /*   var up_arrow = " &#8593"
           var down_arrow = " &#8595"
   
           var color_html;
           //<span class="mychangecolor"> I am in yellow color!!!!!!</span>
           if (in_stock_rate_diff < 0) {
               // tabdata[i]["INSTOCK_RATE"]+ arrow + "(" + in_stock_rate_diff + ")"
               color_html = tabdata[i]["INSTOCK_RATE"] + "<span class=prv_instock_rate_negative>" + down_arrow + "(" + in_stock_rate_diff + ") </span>"
           } else {
               color_html = tabdata[i]["INSTOCK_RATE"] + "<span class=prv_instock_rate_positive>" + up_arrow + "(" + in_stock_rate_diff + ") </span>"
           }
    */
        var up_arrow = "&#8593"
        var down_arrow = "&#8595"

        key = key + "<br>(" + html_text[0];
        var in_stock_rate_diff = html_text[2];
        if (in_stock_rate_diff < 0) {
            // tabdata[i]["INSTOCK_RATE"]+ arrow + "(" + in_stock_rate_diff + ")"
            key = key + "<span class=prv_instock_rate_negative>" + down_arrow + in_stock_rate_diff + ") </span>"
        } else {
            key = key + "<span class=prv_instock_rate_positive>" + up_arrow + in_stock_rate_diff + ") </span>"
        }
        // console.log(key)
        //console.log("html", html_text)
        var myTextLabel = L.marker(textLatLng, {
            icon: L.divIcon({
                className: 'text-labels',   // Set class for CSS styling
                html: key
            }),
            zIndexOffset: 1000     // Make appear above other map features
        }).addTo(mymap);

    })

}


export function getInstockRateRegion(region, region_kpi) {
    //Helper function for Text 

    var INSTOCK_RATE = region_kpi.find(key => key.REGION.toUpperCase() === region.toUpperCase()).INSTOCK_RATE
    var PRV_INSTOCK_RATE = region_kpi.find(key => key.REGION.toUpperCase() === region.toUpperCase()).PRV_INSTOCK_RATE
    var in_stock_rate_diff = Math.round(INSTOCK_RATE - PRV_INSTOCK_RATE, 2)

    return [INSTOCK_RATE, PRV_INSTOCK_RATE, in_stock_rate_diff]

}

export function fillCountryData(error, region_in_stock) {
    var region_in_stock_g = region_in_stock
    addTableCountry(region_in_stock_g)
}


function addTableCountry(tabdata) {
    document.getElementById("id1H2").innerText = "In Stock Rate By Region "

    $("#datatable").remove();
    $("#datatablediv").append(" <table id=\"datatable\"></table>")
    //datatablediv
    $('#datatable tr[id=nameoftr]').remove();
    var markup = "<tr><th>Region</th><th>In Stock Rate</th></tr>"
    var row = '';
    for (var i = 0; i <= tabdata.length - 1; i++) {
        var k = tabdata[i]["REGION"]
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
