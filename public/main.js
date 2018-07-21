var weatherResponse=document.querySelector('.weatherResponse');
var getWeather=document.querySelector('#getWeather');
var city=document.querySelector(".city");
var list=document.querySelector(".list");
var predictionWindow=document.querySelectorAll(".predictionWindow");
var messageWindow=document.querySelector(".messageWindow");
var listGroupItem;

var resp,innerHtml,theUrl,inputCity,inputCityLength,i,j;
//location names
var locationNames=["London","San Francisco","New York","Sydney","Philadelphia","Manchester","Houston","Birmingham","Los Angeles","Berlin","Chicago","Tokyo","Beijing","Mexico City","Osaka","Bristol","Mumbai","Glasgow","Amsterdam","Johannesburg","Rio de Janeiro","Shanghai","New Delhi","Delhi","Jakarta","Seoul","São Paulo","Moscow","Hong Kong","San Diego","San Jose","Dallas","Indianapolis","San Antonio","Montréal","Jacksonville","Austin","Kiev","Phoenix","Madrid","Toronto","Fort Worth","Guangzhou","Columbus","Memphis","Washington DC","Paris","Munich","Brisbane","Rome","Milwaukee","Bradford","Liverpool","Wakefield","Istanbul","El Paso","Seattle","Baltimore","Las Vegas","Melbourne","Buenos Aires","Boston","Nashville","Edinburgh","Perth","Karachi","Hamburg","Dubai","Leeds","Sheffield","Adelaide","Charlotte","Detroit","Louisville","Barcelona","Denver","Portland","Oklahoma City","Cardiff","Kolkata","Cairo","Virginia Beach","Kinshasa","Honolulu","Tehrān","Colorado Springs","Auckland","Dongguan","Sacramento","Kansas City","Fresno","Bangkok","Ho Chi Minh City","Mesa","Atlanta","Bangalore","Lima","Albuquerque","Tucson","Lagos","Long Beach","Shenzhen","Bogotá","Omaha","Raleigh","Miami","Exeter","Hà Nội","Casablanca","Singapore","Yokohama","Nairobi","Tianjin","Dhaka","Pyongyang","Addis Ababa","Hyderabad","Santa Cruz","Dublin","Budapest","Milan","Cambridge","Oxford","Vienna","Brussels","Cologne","Riyadh","Damascus","Ankara","Little Rock","Wilmington","Santiago","Birmingham","Baghdad","Boise","Anchorage","Athens","Santorini","Reykjavík","Sofia","Prague","Zagreb","Oslo","Copenhagen","Bucharest","Torino","Stockholm","Naples","Warsaw","Bridgeport","Wichita","Richmond","New Orleans","Calgary","Edmonton","St Petersburg","Manila","Vancouver","Maracaibo","Caracas","Cheyenne","Charleston","Santander","İzmir","Toulouse","Bordeaux","Wuhan","Marseille","Lille","Ahmedabad","Lyon","Nice","Lahore","Belfast","Bremen","Stoke-on-Trent","Fargo","Sendai","Truro","Preston","Sunderland","Lisbon","Phuket","Palm Springs","Leicester","Stuttgart","Coventry","Gothenburg","Hanover","St. Louis","Salvador","Plymouth","Lake Tahoe","Nuremberg","Mountain View","Kawasaki","Kyoto","Kobe","Hangzhou","Blackpool","Yangon","Bakersfield","Salt Lake City","Geneva","Portland","Reading","Durban","Saitama","Brighton","Dresden","Ajaccio","Pune","Mombasa","Providence","Chennai","Kharkiv","Helsinki","Taipei","Essen","St Ives","Aberdeen","Oakland","Sapporo","Ipswich","Norwich","Christchurch","Surat","Busan","Manchester","Hiroshima","Northampton","Leipzig","Southend-on-Sea","The Hague","Minsk","Salford","Kirkwall","Swansea","Penzance","Ibadan","Billings","Alexandria","Newcastle","Jackson","Sioux Falls","Nagoya","Swindon","Brasília","Dundee","Kano","Kitakyushu","Denpasar","Boulder","Minneapolis","Frankfurt","Falmouth","Middlesbrough","Rhyl","Bournemouth","Fukuoka","Newark","Manukau","Luton","Wellington","Abidjan","Kingston upon Hull","Des Moines","Windhoek","Calvi","Venice","Santa Cruz de Tenerife","Chengdu","York","Kuala Lumpur","Portsmouth","Burlington","Santa Fe","Zurich","Nottingham","Derby","Huddersfield","Dortmund","Wolverhampton","Cape Town","Düsseldorf","Columbia"]
var locationNamesLength=locationNames.length;
var months=['Jan','Feb','Mar','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];

//keydown listener on input
city.addEventListener('keydown',function(event){
  //timeout for input to read latest value
  window.setTimeout(function(){
    if(event.key=='Enter'){
      j=-1;
      for(i=0;i<listGroupItem.length;i++){
        if(listGroupItem[i].classList.contains('bg1')){
          j=i;
          break; 
        }
      }
      if(j!=-1){
        city.value=listGroupItem[j].textContent;
      }
      getWeather.click();
      return;
    }

    //up-down arrow movement on list
    if(event.key=='ArrowDown'){
      j=-1;
      for(i=0;i<listGroupItem.length;i++){
        if(listGroupItem[i].classList.contains('bg1')){
          j=i;
          break; 
        }
      }
      if(j!=listGroupItem.length-1){
        if(j!=-1)
          listGroupItem[j].classList.remove('bg1');
          listGroupItem[j+1].className+=' bg1';
      }
      return;
    }
    if(event.key=='ArrowUp'){
      j=-1;
      for(i=0;i<listGroupItem.length;i++){
        if(listGroupItem[i].classList.contains('bg1')){
          j=i;
          break; 
        }
      }
      if(j>0){
        listGroupItem[j].classList.remove('bg1');
        listGroupItem[j-1].className+=' bg1';
      }
      return;
    }

    //creating list
    list.innerHTML='<ul class="list-group">';
    inputCity=city.value;
    inputCityLength=inputCity.length;
      //matching input with city names
    if(inputCityLength){
      j=0;
      for(i=0;i<locationNamesLength;i++){
        if(j>20)break;
        if(locationNames[i].slice(0,inputCityLength).toLowerCase()==inputCity.toLowerCase()){
          list.innerHTML+='<li class="list-group-item">'+locationNames[i]+'</li>';  //adding city to list
          j++;
        }
      }
    }
    list.innerHTML+='</ul>';

    //mouse events on list
    listGroupItem=document.querySelectorAll('.list-group-item');
    for(i=0;i<listGroupItem.length;i++){
      listGroupItem[i].addEventListener('mousemove',function(event){
        for(j=0;j<listGroupItem.length;j++){
          listGroupItem[j].classList.remove('bg1');
        }
        this.className+=' bg1';
      });
      listGroupItem[i].addEventListener('mouseleave',function(event){
        this.classList.remove('bg1');
      });
      listGroupItem[i].addEventListener('click',function(event){ //on clicking any list value
        city.value=this.innerHTML;
        list.innerHTML='';
        window.setTimeout(function(){
          getWeather.click(); //click button
        },10);
      });
    }
  },10);
});

//auto focus on input
city.focus();

//click event listener on button
getWeather.addEventListener('click',function(event){
  if(city.value=='')return;
  list.innerHTML='';
  // getXhr();
  fetchUrl();
  weatherResponse.innerHTML='Getting Weather Data for '+city.value;
  for(var i=0;i<6;i++){
    predictionWindow[i].innerHTML='<img class="my-5 py-3 mx-auto" src="img/loading.svg" alt="Getting Weather...">';
  }
  messageWindow.innerHTML='';
});

//function interacting with server

// function getXhr(){
//   theUrl='http://localhost:3001/'+city.value;
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.open( "GET", theUrl,true);
//   xmlHttp.onreadystatechange=function(){
//     if(xmlHttp.readyState==4){
//       resp=xmlHttp.responseText;
//       resp=JSON.parse(resp); 
//     }
//   }
//   xmlHttp.send( null );
// }
function fetchUrl(){
  theUrl='https://us-central1-weatherprediction-1.cloudfunctions.net/app/'+city.value;
  fetch(theUrl)
    .then(function (response) {
      console.log("Response status: ",response.status);
      return response.json();
    })
    .then(function (result) {
      DisplayWeather(result);
    })
    .catch(function (error) {
      console.log("error:",error.message);
      weatherResponse.innerHTML='Get Your Weather Forecast Here...';
      for(var i=0;i<6;i++){
        predictionWindow[i].innerHTML='<img class="my-5" src="img/icon-rainy.png" height="50px" alt="icon-rainy">';
      }
      messageWindow.innerHTML='<br> oops! Something went Wrong';
      city.value='';
      city.focus();
    });
}
function DisplayWeather(resp){
  if(resp.message){
    console.log(resp.message);
    weatherResponse.innerHTML='Get Your Weather Forecast Here...';
    for(var i=0;i<6;i++){
      predictionWindow[i].innerHTML='<img class="my-5" src="img/icon-rainy.png" height="50px" alt="icon-rainy">';
    }
    messageWindow.innerHTML='<br> Oops! '+resp.message;
    city.value='';
    city.focus();
  }
  else{
    weatherResponse.innerHTML='Weather at '+resp['title'];
    for(var i=0;i<6;i++){
      var date=resp["consolidated_weather"][i]["applicable_date"];
      var day=months[parseInt(date.slice(5,7))-1]+' '+date.slice(8,10);
      if(i==0)day='Today';
      if(i==1)day='Tomorrow';
      innerHtml='<div style="font-size: 1.3em;font-family:"Courier New", Courier, monospace;font-weight: 600;color:palegreen">'
      +day
      +'</div><div><img src="./img/'
      +resp["consolidated_weather"][i]["weather_state_abbr"]
      +'.png"height="40px"></div><div style="font-size: 0.9em">'
      +resp["consolidated_weather"][i]["weather_state_name"]
      +'</div><div style="font-size: 1.5em;color:paleturquoise;font-weight: 700;margin-top:0">'
      +Math.round(resp["consolidated_weather"][i]["max_temp"])
      +'°C</div><div style="font-size: 1.5em;color:paleturquoise;font-weight: 700;margin-top:0">'
      +Math.round(resp["consolidated_weather"][i]["min_temp"])
      +'°C</div><div>Wind : '
      +Math.round(resp["consolidated_weather"][i]["wind_speed"])
      +'mph <img height="16px"style="transform:rotate('
      +Math.round(resp["consolidated_weather"][i]["wind_direction"])
      +'deg)"src="img/down-arrow.png"></div><div>Humidity : '
      +resp["consolidated_weather"][i]["humidity"]
      +'%</div>';
      predictionWindow[i].innerHTML=innerHtml;
    }
    city.value='';
    city.focus();
  }
}