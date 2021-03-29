gameStart();

var countGame;
// Check browser support
if (localStorage.getItem("countGame") !== null) {
  // Store
  localStorage.setItem("countGame", parseInt(localStorage.getItem("countGame")) + 1);
  // Retrieve
  document.getElementById("result").innerHTML = "당신의 도전횟수는 " + localStorage.getItem("countGame") + "회 입니다.";
} else {
	countGame = 0;
	localStorage.setItem("countGame", countGame + 1);
	document.getElementById("result").innerHTML = "당신의 도전횟수는 " + localStorage.getItem("countGame") + "회 입니다.";
}

// 보물 3개
var treasureArray = [
	{
	lat: 37.50314085337616,
	lng: 127.02451885675279
	},
	{
	lat: 37.50442122415063,
	lng: 127.01945256177565
	},
	{
	lat: 37.503617460113944,
	lng: 127.0286356733188
	}
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

var randomIndex = getRandomInt(0,3);

// 보물 위치
var treasure = {
	lat: treasureArray[randomIndex].lat,
	lng: treasureArray[randomIndex].lng
};

var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(37.5026907188107, 127.02267528261572), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    // 클릭한 위치에 마커를 표시합니다 
    addMarker(mouseEvent.latLng);             
});

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
var markers = [];
var infowindows = [];
var chance = 3;

// 마커를 생성하고 지도위에 표시하는 함수입니다
function addMarker(position) {
    
    var distance = getDistanceFromLatLonInKm(treasure.lat, treasure.lng, position.getLat(), position.getLng());
    
    if(distance < 50) {
    	goodEnd();
    	return;
    }
    
    if(chance == 0) {
    	gameOver();
    	return;
    }
    
    chance--;
    
    var imageSrc = 'x_image.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(20, 20), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(0, 0)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: position,
        image : markerImage
    });
    
    var content = "보물과의 거리가 " + distance + "m 남았습니다.";
    var iwContent = '<div class="div-distance-info">'+content+'</div>';

	// 인포윈도우를 생성합니다
	var infowindow = new kakao.maps.InfoWindow({
	    position : position, 
	    content : iwContent 
	});
	  
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    
    // 생성된 마커를 배열에 추가합니다
    markers.push(marker);
    infowindows.push(infowindow);
    
    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
	infowindow.open(map, marker); 
	
	showCircle(position, distance);
}

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
}

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setInfowindow(map) {
    for (var i = 0; i < infowindows.length; i++) {
        infowindows[i].setMap(map);
    }            
}

// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showMarkers() {
    setMarkers(map);
    setInfowindow(map);   
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideMarkers() {
    setMarkers(null);
    setInfowindow(null);   
}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371000; 
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; 
  return Math.ceil(d);
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function refresh() {
	document.location.href = "http://localhost:8090/Hw01/Treasure_hunt.html";
}

function showCircle(position, distance) {
	// 지도에 표시할 원을 생성합니다
	var circle = new kakao.maps.Circle({
	    center : new kakao.maps.LatLng(position.getLat(), position.getLng()),  // 원의 중심좌표 입니다 
	    radius: distance, // 미터 단위의 원의 반지름입니다 
	    strokeWeight: 5, // 선의 두께입니다 
	    strokeColor: '#75B8FA', // 선의 색깔입니다
	    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
	    strokeStyle: 'dashed', // 선의 스타일 입니다
	    fillColor: '#CFE7FF', // 채우기 색깔입니다
	    fillOpacity: 0.7  // 채우기 불투명도 입니다   
	}); 
	
	// 지도에 원을 표시합니다 
	circle.setMap(map); 
}

function goodEnd() {
	swal ({
			  text : "gg wp" ,
			  icon : "success"
		});
}

function gameStart() {
	
	swal({
		  title: "보물찾기 게임",
		  text: "지도를 클릭해서 주어진 기회 안에 보물을 찾아 부자되세요. \n 기회는 총 4번입니다.",
		  icon: "info",
		  button: "시작"
		});
}

function gameOver() {

	swal({
		  title: "보물찾기 게임",
		  text: "남은 기회를 모두 사용하여 재시작 합니다.",
		  icon: "error",
		  button: "시작"
		}).then(refresh);
}



