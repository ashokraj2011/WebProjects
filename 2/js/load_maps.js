import { getJson } from './map_layer_country.js';
import { getRegionList } from './map_layer_country.js';
import { getRegoinAPI } from './map_layer_country.js';
import {getRegionMapJson } from './map_layer_country.js';

var svg = d3.select("svg");
var div = d3.select("body").select(".tooltip");
var region_in_stock_g;
console.log(div)
div.style("display", 'none')
div.style.pointerEvents = 'none';
var sdiv = div.select('.text-content')
sdiv.select("h3").text("region")
sdiv.select("h4").text("in stock")




var width = 800;
var height = 500;
var prevSelectedRegion = '';
svg.attr("width", width)
svg.attr("height", height)

// Call the function with callback 
getJson(ready)

function ready(error, us_map,us_states_json, us_states_data) {
    var state_data = us_states_data;
    let regions = getRegionList(state_data);
    for (var i in regions) {
        var temp = []
        var jobj;
        var current_region = regions[i]
        jobj = state_data.filter((({ REGION }) => REGION === regions[i]))
        for (i in jobj) {
            temp.push(jobj[i].STATE_ID)
        }

        var selected = d3.set(temp);
        let us = us_map
        const geoJson = topojson.feature(us, us.objects.states)
        var projection = d3.geoIdentity().fitSize([width, height], geoJson);
        var path = d3.geoPath(projection)
        svg.append("path").attr("id", current_region.replace(' ', '_'))
            .datum(topojson.merge(us, us.objects.states.geometries.filter(function (d) {
                return selected.has(d.id);
            })))
            .attr("d", path).attr("class", "region-selected").on('click', function (e, d) {
               var g= d3.select(this).attr("id");
                //call the region map
           //     getRegionMapJson(g,drawRegion)
       




            })

    }

    getRegoinAPI(fillRegionData);

    var color = d3.scaleLinear()
        .domain([30, 70])
        .range(["yellow", "green"])



    function fillRegionData(error, region_in_stock) {

        region_in_stock_g = region_in_stock;


        for (var i = 0; i <= region_in_stock.length - 1; i++) {
            var in_stock_rate = region_in_stock[i]["INSTOCK_RATE"]
            var region_map = svg.select("#" + region_in_stock[i]["REGION"].replace(' ', '_'))
            region_map.style('fill', function () {
                return color(in_stock_rate);
            });
            var x, y
            svg.select("#" + region_in_stock[i]["REGION"].replace(' ', '_')).
                attr("x", function (d) {
                    x = path.centroid(d)[0]
                    return x
                })
                .attr("y", function (d) {
                    y = path.centroid(d)[1];
                    return y;
                })




            var temp_r = region_in_stock[i]["REGION"]

            if (temp_r.split(" ").length > 1) {
                temp_r = temp_r.split(" ")[0][0] + temp_r.split(" ")[1][0]
            }

            if (temp_r === 'PN') {
                x = x - 30;
                y = y - 80;
            }
            if (temp_r === 'Northeast') {
                // x = x - 30;
                y = y - 20;
            }
            svg.append("text").attr("x", x).attr("y", y).text(temp_r)
                .attr("id", "region_label_class")
            svg.append("text").attr("x", x).attr("y", y + 20).text(" " + in_stock_rate + "%")
                .attr("id", "in_stock_rate_label_class")






        }
        // addTable(region_in_stock_g)
        addTableRegion(region_in_stock_g)

    }
}


function addTableRegion(tabdata) {
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



function drawRegion(error ,region_json){
    var region_json = region_json
    var resp_Json=region_json;
    console.log(region_json)

console.log(resp_Json)
let us=resp_Json

// const geoJson=topojson.feature(us, us.objects.states)
//
// resp_Json.objects.Northern_California["geometries"]
const geoJson=topojson.feature(resp_Json ,resp_Json.objects["Midwest"])
//var projection = d3.geoMercator().fitSize([width, height], geojson);
//var path = d3.geoPath().projection(projection);
console.log(geoJson)
var projection = d3.geoMercator().fitSize([800,700],geoJson);
var path = d3.geoPath(projection)
svg.selectAll("path")
.attr("class", "state-borders")
.data(geoJson.features)
.enter().append("path")
.attr("d", path).attr('fill','lightgrey').attr('stroke','white')

/*
svg.append("path")
.attr("class", "state-borders")
.attr("d", path(topojson.mesh(resp_Json, resp_Json.objects["Midwest"], function(a, b) 
{ 
    console.log("one set begin");
    temp_a=a;
    console.log(a);
    console.log(b);
    console.log("one set end");
    return a["properties"].STATEFP !== b["properties"].STATEFP; })))
    .attr('stroke','red')

}*/
}