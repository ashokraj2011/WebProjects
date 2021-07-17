
var svg = d3.select("svg");

var temp_a;

let url = "https://d3js.org/us-10m.v1.json";

var resp;
var xmlHttp;

resp = '';
xmlHttp = new XMLHttpRequest();

if (xmlHttp != null) {
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  resp = xmlHttp.responseText;
}
//let resp_Json = JSON.parse(resp);

let resp_Json;
d3.json("/Users/ashokraj/Documents/D3/2/js/Midwest1.json", function (d) {
    console.log(d);
    resp_Json=d;
  
});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  var Regions = [];
  async function demo() {
    await sleep(2000);
  
    // Sleep in loop
    for (let i = 0; i < 2; i++) {
      if (i === 3)
        await sleep(2000);
      // console.log(i);
    }
    //console.log(state_data);
  
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

/
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


}
demo();