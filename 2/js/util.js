

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function demo() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Two seconds later, showing sleep in a loop...');
  
    // Sleep in loop
    for (let i = 0; i < 5; i++) {
      if (i === 3)
        await sleep(2000);
      console.log(i);
    }
  }



  svg.append("g")
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
        
        ;








  svg.selectAll(null)
  .data(regions)
  .enter()
  .append("path")
  .attr("d", function(region) {
    var feature = topojson.merge(us, us.objects.states.geometries.filter(function(state) { 
      console.log(region) ;
      return getStateRegion(region,state.id)> -1; 
     }))
     return path(feature);
  })
