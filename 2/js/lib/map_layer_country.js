/* loads all maps  */
const path = ''
const map_url = 'https://d3js.org/us-10m.v1.json';
const api_base_url= "http://127.0.0.1:5000/";
const get_region_wise_instock_api = "get_instock_regionwise" ;
const get_state_wise_instock_api = "get_instock_statewise" ;
const getRegionMapJson_api="getRegionMap"
const states_json_path = "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
const getRegionDayWiseKPIURL ='get_daywise_region_instock'
const getStateDayWiseKPIURL ='get_daywise_state_instock'
const getShopDayWiseKPIURL ='get_daywise_shop_instock'
const getStateLantLongURL='get_states_lat_long'
const getStateDayWiseInStockPrvStock ='get_state_cur_prv_instock'

export function getRegionMapJson(callback){
  queue()
    .defer(d3.json, api_base_url+getRegionMapJson_api)
    .defer(d3.json, states_json_path)
    .defer(d3.csv, "state.csv").await(callback)
}
export function getStateLantLong(state_name,callback){
  var url=api_base_url + getStateLantLongURL + "?state_name=" +state_name
  queue()
    .defer(d3.csv, url)
    .defer(d3.csv ,api_base_url+ getStateDayWiseInStockPrvStock)
    .await(callback)
}

/* export function getJson(callback) {
  queue()
    .defer(d3.json, map_url)
    .defer(d3.csv, "state.csv").await(callback)
} */


export function getStateRegion(state_data, state_id, v_REGION) {
  return state_data.findIndex((({ STATE_ID }) => STATE_ID === state_id) && (({ REGION }) => REGION === v_REGION))
}



export function getRegionList(state_data) {
  var Regions = [];
  for (var i = 0; i < state_data.length; i++) {
    Regions.push(state_data[i].REGION);
  }

  let regions = Regions.filter((x, i, a) => a.indexOf(x) == i)
  return regions;
}

export function getRegoinAPI(callback) {
  var url=api_base_url + get_region_wise_instock_api
  queue()
    .defer(d3.csv, url).await(callback)
}

/*export function getRegionMapJsonOLD(region,callback){
  var url=api_base_url + "getRegionMap?region="+ region
  queue()
    .defer(d3.json, url).await(callback)
}*/

export function getStateAPI(callback){
  var url=api_base_url + get_state_wise_instock_api 
  queue()
    .defer(d3.csv, url).await(callback)
}

export function getRegionDayWiseKPI(region,from_date,to_date,callback){
 
  var url=api_base_url + getRegionDayWiseKPIURL + "?region=" +region+"&from_date=" +from_date+ "&to_date=" + to_date
  //console.log(url) 
  queue()
    .defer(d3.csv, url).await(callback)
}

export function getStateDayWiseKPI(state_name,from_date,to_date,callback){
 
  var url=api_base_url + getStateDayWiseKPIURL + "?state_name=" +state_name+"&from_date=" +from_date+ "&to_date=" + to_date
  //console.log(url) 
  queue()
    .defer(d3.csv, url).await(callback)
}


export function getShopDayWiseKPI(shop_name,from_date,to_date,callback){
  //console.log(url) 
  var url=api_base_url + getShopDayWiseKPIURL + "?shop_id=" +shop_name
  console.log(url) 
  queue()
    .defer(d3.csv, url).await(callback)
}