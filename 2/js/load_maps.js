import { getJson } from './map_layer_country.js';
import { getRegionList } from './map_layer_country.js';
import {getRegoinAPI} from './map_layer_country.js';

var svg = d3.select("svg");
var div = d3.select("body").select(".tooltip");
var region_in_stock_g ;
console.log(div)
// .style.visibility='hidden' 
div.style("display",'none' )
div.style.pointerEvents = 'none';
var sdiv=div.select('.text-content')
sdiv.select("h3").text("region")
sdiv.select("h4").text("in stock")


var width = 800;
var height = 500;
var prevSelectedRegion='' ;
svg.attr("width",width)
svg.attr("height",height)

// Call the function with callback 
getJson(ready)


function ready(error, us_map, us_states_data) {
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
        svg.append("path").attr("id", current_region.replace(' ','_'))
            .datum(topojson.merge(us, us.objects.states.geometries.filter(function (d) {
                return selected.has(d.id);
            })))
            .attr("d", path).attr("class", "region-selected").on('click', function (e, d) {
                console.log(d3.select(this).attr("id"));
             
            })
            .on("mouseover", function (e, d) {
            /*     div.style("display",'block' ).style("pointer-events","none")
                .transition()
                .delay(100)
                .duration(600);
                console.log(d3.select(this).attr("id"))
                div.style("left", (d3.event.pageX - 34) + "px")
                .style("top", (d3.event.pageY - 12) + "px")
                sdiv.select("h3").text(d3.select(this).attr("id"))
                sdiv.select("h4").text("In Stock :  10%") */

               // d3.select(this).style("fill", "red");
                
                
                }).on("mouseout",()=>{
                    console.log("in mouse pop");
                d3.select(this).style("fill",  function(){
                    
                    // console.log( color(region_in_stock[i]["INSTOCK_RATE"]));
                     
                div.style("display",'none' )
                .transition()
                .delay(100)
                .duration(600);
                return   color(region_in_stock_g[i]["INSTOCK_RATE"]);})})
           


            

            


    }
  
  
   // svg.select('#South').style('fill','blue')

   getRegoinAPI(fillRegionData)
   var color = d3.scaleLinear()
   .domain([30,70])
   .range(["yellow" , "green"])


   function fillRegionData(error ,region_in_stock){
       console.log(region_in_stock)
         region_in_stock_g=region_in_stock ;

       
       for (var i =0;i<=region_in_stock.length-1;i++){
         //  console.log( region_in_stock[i]["REGION"]);
         var region_map = svg.select("#" + region_in_stock[i]["REGION"].replace(' ','_'))
         region_map.style('fill', function(){
            // console.log( color(region_in_stock[i]["INSTOCK_RATE"]));
             return   color(region_in_stock[i]["INSTOCK_RATE"]);
         } );
         var x,y 
          svg.select("#" + region_in_stock[i]["REGION"].replace(' ','_')).
          attr("x", function(d){
              x= path.centroid(d)[0]
              return x})
         .attr("y", function(d){
             y= path.centroid(d)[1] ;
            return y;})
             
            
              

            var temp_r=region_in_stock[i]["REGION"]

            if(temp_r.split(" ").length > 1){
            temp_r=temp_r.split(" ")[0][0] +  temp_r.split(" ")[1][0] 
            }

            if (temp_r==='PN'){
                x=x-30;
                y=y-70;
            }
            svg.append("text").attr("x", x).attr("y",y ).text(temp_r)
            .attr("text-anchor", "middle")  
            .style("font-size", "14px")
            .style("fill", "black")
          
            

            
          

      }
  

   }
}
