/* loads all maps  */
const path = ''
const map_url = 'https://d3js.org/us-10m.v1.json';
const api_base_url= "http://127.0.0.1:5000/";
const get_region_wise_instock_api = "get_instock_regionwise" ;






export function getJson(callback) {
  queue()
    .defer(d3.json, map_url)
    .defer(d3.csv, "state.csv").await(callback)
}


export function getStateRegion(state_data, state_id, v_REGION) {
  return state_data.findIndex((({ STATE_ID }) => STATE_ID === state_id) && (({ REGION }) => REGION === v_REGION))
}

export function getRegionList(state_data) {
  var Regions = [];
  for (var i = 0; i < state_data.length; i++) {
    Regions.push(state_data[i].REGION);
  }


  let regions = Regions.filter((x, i, a) => a.indexOf(x) == i)
  //console.log(regions)
  return regions;
}

export function getRegoinAPI(callback) {
/*  var resp;
var xmlHttp;
  xmlHttp = new XMLHttpRequest();
  var url=api_base_url + get_region_wise_instock_api
 
  if (xmlHttp != null) {
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    resp = xmlHttp.responseText;
    console.log(resp);
  }*/
  var url=api_base_url + get_region_wise_instock_api
  queue()
    .defer(d3.csv, url).await(callback)
 

}

