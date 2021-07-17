let planetData = [
    {
      name: 'Mercury',
      diameter: 4879,
      density: 5427,
      color: 'green'
    },
    {
      name: 'Venus',
      diameter: 12104,
      density: 5243,
      color: 'purple'
    },
    {
      name: 'Earth',
      diameter: 12756,
      density: 5514,
      color: 'dodgerblue'
    },
    {
      name: 'Mars',
      diameter: 6792,
      density: 3933,
      color: 'indianred'
    },
    {
      name: 'Jupiter',
      diameter: 142984,
      density: 1326,
      color: 'gold'
    },
    {
      name: 'Saturn',
      diameter: 120536,
      density: 687,
      color: 'navy'
    },
    {
      name: 'Uranus',
      diameter: 51118,
      density: 1271,
      color: 'thistle'
    },
    {
      name: 'Neptune',
      diameter: 49528,
      density: 1638,
      color: 'pink'
    },
    {
      name: 'Pluto',
      diameter: 2370,
      density: 2095,
      color: 'brown'
    }
  ];

  d3.select("#diameter svg").attr("width","100%").attr("height","350")
  d3.select("#density svg").attr("width","100%").attr("height","350")

  let selectionOrder='ascending'
  document.querySelector('#btn').addEventListener('click',
  function(){
      if(selectionOrder=='ascending'){
          document.getElementById('msg').innerText='Ascending order selected'
          selectionOrder='desc'
          setTimeout(() => {
            document.getElementById('msg').innerText=''
          }, 2000);
          genDiameterChart(selectionOrder);
          genDensityChart(selectionOrder);
      }else {
        document.getElementById('msg').innerText='Dcending order selected';
        selectionOrder='ascending' 
        setTimeout(() => {
            document.getElementById('msg').innerText=''
          }, 2000);
          genDiameterChart(selectionOrder);
          genDensityChart(selectionOrder);
      }
  }
  )

  function genDiameterChart(order){
      let cx=0;
      const diaP= d3.select('#diameter p').text(`Diameter of the planets in KM ,sorted in ${order} order`)
      .attr('class','text');
      const diaSvg=d3.select('#diameter svg').selectAll('circle')
      .data(planetData, function(d){return d.name;})
      .join('circle')
      .sort((a,b)=>{ return order==='ascending' ? a.diameter-b.diameter : b.diameter - a.diameter;})
      .attr('r',d=>d.diameter/1000)
      .attr('cy',150)
      .attr('cx',function(d,i,n){
          if(i==0){
              cxValue=d.diameter/1000;
          }else{
              prvR=Number(d3.select(n[i-1]).attr("r"))
              cxValue=cxValue+prvR + d.diameter/1000;
          }
          return 75*(i+1) + cxValue;
      }).style("fill",d=>d.color)
      ;
      console.log(diaSvg);

      const diaText = d3.select("#diameter svg")
      .selectAll('text')
      .data(planetData ,function(d){
          return d.name;
      })
      .join('text')
      .sort((a,b)=>{ return order==='ascending' ? a.diameter-b.diameter : b.diameter - a.diameter;})
      .attr('x',(d,i,n)=>{
          return document.querySelectorAll('svg circle')[i].getAttribute('cx');
      })
      .attr('y',function(d,i){
          return i%2 == 0 ? '330': '15';
      })
      .text(d=>(`${d.name},${d.diameter}`))
      .style('text-anchor','middle')
      .style('fill','blue')
      .style('font-size','bold')
      
  }

  function genDensityChart(order){
      d3.select('#density p').text(`Density of the plantes in ${order} `)
      .attr('class','text');
      const denSvg = 
         d3.select('#density svg').selectAll('rect')
         .data(planetData,d=>d.name)
         .join('rect')
         .sort((a,b)=>{ return order==='ascending' ? a.density-b.density : b.density - a.density;})
        .attr('width',d=>d.density/10)
        .attr('height','40')
        .attr('y',(d,i)=>i*40)
        .attr('x','10')
        .style('fill',d=>d.color);


        const denText=  d3.select('#density svg').selectAll('text')
        .data(planetData,function(d){
            return d.name;
        })
         .join('text')
         .sort((a,b)=>{ return order==='ascending' ? a.density-b.density : b.density - a.density;})
         .attr('x',d=>d.density/10 + 20)
         .attr('y',(d,i)=>(i*40) +20 )
         .text(d=>(`${d.name} , ${d.density}`))
         .style('text-anchor','start')
         .style('fill','rgb(63,63,63')
         .style('font-size','13')
         .style('font-weight','bold');


  }