
var width = 200;
var height = 100;
var padding = 20;
var dataset = [10,20,30,40];
var margin = { top: 10, right: 0, bottom: 0, left: 0 };
var svg=d3.select("#chart-area").append("svg").attr("width", width + margin.right + margin.left)
.attr("height", height + margin.top + margin.bottom).
attr("x",10).attr("y",10);
 
svg.selectAll("rect").data(dataset).enter()
.append("rect")
.attr("x",function(d,i){
    console.log("as");
    return (i*21) ;
})
.attr("y",function(d){
    return height-d;
})
.attr("width",40-2)
.attr("height",function(d,i){return d;})
.style("fill","red");