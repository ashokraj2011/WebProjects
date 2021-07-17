
var svg = d3.select("svg");

//var path = d3.geoPath();

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
let resp_Json = JSON.parse(resp);

var state_data;
d3.csv("state.csv", function (d) {
  state_data = d;
  // return {state:d.STATE,state_code=d.STATE_CODE,region=d.REGION,id=d.STATE_ID};
});


function getStateRegion(state_id, v_REGION) {
  return state_data.findIndex((({ STATE_ID }) => STATE_ID === state_id) && (({ REGION }) => REGION === v_REGION))
}


// sleep 
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var Regions = [];
async function demo() {
  await sleep(1000);

  // Sleep in loop
  for (let i = 0; i < 2; i++) {
    if (i === 3)
      await sleep(1000);
    // console.log(i);
  }
  //console.log(state_data);

  for (var i = 0; i < state_data.length; i++) {
    Regions.push(state_data[i].REGION);
  }


  let us = resp_Json;
  regions = Regions.filter((x, i, a) => a.indexOf(x) == i)
 
  //var projection = d3.geoAlbersUsa()
  //var path = d3.geoPath()


  /* svg.append("g")
   .attr("class", "states")
 .selectAll("path")
 .data(topojson.feature(us, us.objects.states).features)
 .enter().append("path")
   .attr("d", path).on('click',function(e,d){
     console.log(e);
   }); 
 
 
   svg.append("path")
   .attr("class", "state-borders")
   .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) 
   { 
       return a !== b; })))
       
 
       ;*/

  for (i in regions) {
    var temp = []
    var current_region = regions[i]
    jobj = state_data.filter((({ REGION }) => REGION === regions[i]))
    for (i in jobj) {
      temp.push(jobj[i].STATE_ID)
    }

    var selected = d3.set(temp);
    const geoJson=topojson.feature(us, us.objects.states)
    var projection = d3.geoIdentity()
  .fitSize([660,400],geoJson);
  var path = d3.geoPath(projection)
    //let svg2 = svg.append("g").attr("id", current_region);
    svg.append("path").attr("id", current_region)
      .datum(topojson.merge(us, us.objects.states.geometries.filter(function (d) {
        return selected.has(d.id);
      })))
      .attr("d", path).attr("class", "state-selected").on('click', function (e, d) {

        console.log(d3.select(this).attr("id"));
        display_single_region(d3.select(this).attr("id"));
      })
      .on("mouseover", function (e, d) {
        var color = Math.random() * 100;
        d3.select(this).style("fill", `rgb(${color / 100},${color * 9},${color})`);
      })
      ;

    function display_single_region(in_region) {
      
      svg.selectAll("*").remove();
      jobj_reg = state_data.filter((({ REGION }) => REGION === in_region))
      var states_in_region=[];
      for (i in jobj_reg) {
        states_in_region.push(jobj_reg[i].STATE_ID)
      }
    
     
      //function to show states in the region
      //topojson.feature(us, us.objects.states)
      // var mergeTopo = topojson.merge(us, us.objects.states.geometries.filter(function(d) { return selected.has(d.id); }));

      var geoData =  topojson.feature(resp_Json, resp_Json.objects.states).features.filter
      (function(d){
          return states_in_region.indexOf(d.id) > -1;
      }
      )
      console.log(geoData);
      
    var states = topojson.feature(resp_Json, resp_Json.objects.states);
 var state = states.features.filter(function(d) { return d.id === '06'; })[0];
console.log(state)
      var projection1 = d3.geoAlbers();
      var width1 = 960;
      var height1 = 500;

var path1= d3.geoPath().projection(projection1);


projection1.scale(1).translate([0, 0]);

var b = path1.bounds(state);
var s = .95 / Math.max((b[1][0] - b[0][0]) / width1, (b[1][1] - b[0][1]) / height1);
var t = [(width1 - s * (b[1][0] + b[0][0])) / 2, (height1 - s * (b[1][1] + b[0][1])) / 2];

projection1.scale(s).translate(t);

      svg.append("g")
    .attr("class",  in_region)
  .selectAll("path")
  .data( states.features)
  .enter().append("path").attr("class", "state-selected")
    .attr("d", path1).on('click',function(e,d){
      console.log(e);
    }); 

      /*

      svg.append("g")
    .attr("class",  in_region)
  .selectAll("path")
  .data(geoData)
  .enter().append("path").attr("class", "state-selected")
    .attr("d", path).on('click',function(e,d){
      console.log(e);
    }); 
      //delete

 svg.append("path").attr("id", current_region)
      .datum(topojson.merge(us, us.objects.states.geometries.filter(function (d) {
        return selected.has(d.id);
      })))
      .attr("d", path).attr("class", "state-selected")

      //delte

      workng code 
        svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(geoData)
      .enter().append("path").attr("class", "state-selected")
      .attr("d", path).on('click', function (e, d) {
        console.log(e);
      }); 
*/

    }


 


// for loop
}

  }
  demo();



