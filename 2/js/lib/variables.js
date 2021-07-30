
export var MidPoints = {
    "Rock Mountain": [43.1436, -109.5632],
    "Northeast": [43.29, -76.15],
    "South": [34.87, -85.67],
    "Northern California": [41.57, -118.67],
    "Southern Pacific": [38.02, -121.7],
    "Pacific Northwest": [47.276671273775186, -122.51562607288362],
    "Mid-Atlantic": [40.36827914916014, -80.85546982288362],
    "Midwest": [44.51379915504413, -95.35742294788362],
    "South West": [34.59, -97.7],
    "Florida": [29.14950321154457, -79.05273544788362]
}


//export var color = d3.scaleLinear()
 //   .domain([40, 50, 60, 70])
  //  .range(["white", "yellow", "blue", "green"])
 // olorScale = d3.scaleSequential()
   // .interpolator(d3.interpolateBrBG)
    //.domain([0,99]);


  export var color = d3.scaleSequential()
    .domain([30,50])
    .interpolator(d3.interpolateGreens);