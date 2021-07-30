export function loadRegionMap(region, state_kpi_data_l,mymap,MidPoints,states_csv,us_states_json) {
    console.log("selected region", region);
    console.log(state_kpi_data_l);
    //  console.log(states_csv)
    mymap.off();
    mymap.remove();
  //  map_state = 1
    var co_ordinates = MidPoints[region]
    mymap = L.map('mapid').setView(co_ordinates, 5);
    var kl = states_csv.filter(key => key.REGION.toUpperCase() === region.toUpperCase())
    console.log(kl)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNob2tyYWoiLCJhIjoiY2txcmY3aDVjMTBicDJ3cGJ0Z2o0enZ5bCJ9.MgxILsBUMHFlXRR_TuI6lQ', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1,
    }).addTo(mymap);

    /* L.geoJSON(someFeatures, {
         filter: function(feature, layer) {
             return feature.properties.show_on_map;
         }
     }).addTo(map);
 */
    L.geoJSON(us_states_json, {
        filter: function (feature) {
            //     console.log(feature.properties.name)

            // kl=temp2.filter(key => key.REGION.toUpperCase() === 'Midwest'.toUpperCase())
            //kl.map(e => e.STATE).indexOf("Indiana")
            //console.log(region)

            //console.log(kl)
            var rlt = kl.map(e => e.STATE).indexOf(feature.properties.name)
            // console.log(feature.properties.name, "  " ,rlt )
            //  console.log(rlt===-1?true:flase )
            if (rlt == -1) { rlt = 0 } else { rlt = -1 }
            return rlt
        },

        style: function (feature) {
            try {
                var temp = region_kpi.filter((({ REGION }) => REGION === feature.properties.region))
                //       console.log(temp)
                var in_stock_rate = temp[0]["INSTOCK_RATE"]
                //     console.log(color(in_stock_rate))
                return { fillColor: color(in_stock_rate) };
            } catch (err) {
                //do nothong

            }



        }

    }).addTo(mymap);



    function onMapClick(e) {
        var gjLayer = L.geoJson(us_states_json);
        var results = leafletPip.pointInLayer(e.latlng, gjLayer);
        try {
            var rg = results[0].feature.properties
        
        } catch (err) {

            console.log("error")
        }
       
    }
    

    var filterd_state_data =[]
    state_kpi_data_l.filter(e => e.REGION === region).forEach((entry) => {
        filterd_state_data.push(entry);
        // Get the lang ,lat 
        //get the text ( Prve) , diff 
        //print
        var cord = [entry["LATITUDE"], entry["LONGITUDE"]]
        var instock = entry["CUR_INSTOCK_RATE"]
        var rate = entry["CUR_INSTOCK_RATE"] - entry["PRV_INSTOCK_RATE"]
        rate = Math.round(rate, 2)
        var textLatLng = cord
        var up_arrow = "&#8593"
        
        var down_arrow = "&#8595"
        var key = instock + "(" +  rate +")"
        if (rate>0){
            key = instock + "<span class=prv_instock_rate_negative>" +  "(" + rate + down_arrow + ") </span>"
        //    key = instock + "(" +  rate + down_arrow +")"
        } else {
            key = instock +   "<span class=prv_instock_rate_positive>" + "(" + rate +  up_arrow + ") </span>"
            //    key = instock + "(" +  rate + down_arrow +")"
        }
        //var key = instock + "(" +  rate +")"
        // console.log(key)
        //console.log("html", html_text)
        var myTextLabel = L.marker(textLatLng, {
            icon: L.divIcon({
                className: 'text-labels',   // Set class for CSS styling
                html: key
            }),
            zIndexOffset: 1000     // Make appear above other map features
        }).addTo(mymap);

    });

mymap.on('click', onMapClick);
addTableRegion(filterd_state_data);



function onHover(e) {
    console.log(e)
    //console.log(e.x)
    var gjLayer = L.geoJson(us_states_json);
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
        console.log(x, y)
        //calll create chart 
        console.log("rg==",rg)
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
    // ****************************************************************************************************
    //function loadregion
}



function addTableRegion(tabdata) {
    console.log("tab " ,tabdata);
  //  <h2 id = "id1H2" class="h2class">In Stock Rate By Region</h2>
    if(tabdata.length==1){
        document.getElementById("id1H2").innerText = "In Stock Rate in " + tabdata.flatMap(Object.values)[0]

    }else {
  document.getElementById("id1H2").innerText = "In Stock Rate in " + tabdata[1]["REGION"]
    }
    $("#datatable").remove();
    $("#datatablediv").append(" <table id=\"datatable\"></table>")
    //datatablediv
    $('#datatable tr[id=nameoftr]').remove();
    var markup = "<tr><th>State</th><th>In Stock Rate</th></tr>"
    var row = '';
    for (var i = 0; i <= tabdata.length - 1; i++) {
        var k = tabdata[i]["STATE_NAME"]
        var in_stock_rate_diff = Math.round(tabdata[i]["CUR_INSTOCK_RATE"] - tabdata[i]["PRV_INSTOCK_RATE"], 2)
        //  console.log(row)
        var up_arrow = " &#8593"
        var down_arrow = " &#8595"

        var color_html;
        //<span class="mychangecolor"> I am in yellow color!!!!!!</span>
        if (in_stock_rate_diff < 0) {
            // tabdata[i]["INSTOCK_RATE"]+ arrow + "(" + in_stock_rate_diff + ")"
            color_html = tabdata[i]["CUR_INSTOCK_RATE"] + "<span class=prv_instock_rate_negative>" + down_arrow + "(" + in_stock_rate_diff + ") </span>"
        } else {
            color_html = tabdata[i]["CUR_INSTOCK_RATE"] + "<span class=prv_instock_rate_positive>" + up_arrow + "(" + in_stock_rate_diff + ") </span>"
        }


        row = row + "<tr><td>" + k + "</td><td>" + color_html + "</td></tr>"

    }
    markup = markup + row
    $("#datatable").append(markup);
}
