let data =[10,20,30]
let svg=d3.select('svg')

let allCircles=svg.selectAll('circle').data(data).join('circle');
console.log(allCircles)