
var draggableElements = document.getElementsByClassName("draggable-elements");
var droppablaElements = document.getElementById("here");

/* 드래그 허용 (기본동작 막기 실행) */
function allowDrop(e){
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id)
    // 드래그시작시, 드래그 당하고있는 해당 객체의 id를 담는다.
}

/* 드랍박스 영역 */
function drop(e) {
    e.preventDefault(); // 기본 동작 막기 (다른 요소의 위에 위치할 수 있도록 만들어주는 것)

    var data = e.dataTransfer.getData("text");
	// 드래그 시작시 담아둔 정보를 get
	
	// 해당 정보(id)의 정보에 따라 다르게 처리하기 위한 함수
	switch(data){
		case 'mhc': mhc();
					break;
		case 'bsh': bsh();
					break;
		case 'bbs': bbs();
					break;
		case 'hjs': hjs();
					break;
		case 'ain': ain();
					break;
	}
}


// 해당 미모지가 드랍박스에 드랍될 때 띄울 SweetAlert실행
function mhc() {
    location.href="https://moonhyungcheol.github.io/-introduce/";
}

function bsh() {
    location.href="https://sunhee1021.github.io/self_intro_Bootstrap/WebContent/index.html";
}

function bbs() {
    location.href="https://bo-like-chicken.github.io/UI/MyPage_bs/WebContent/index.html";
}

function hjs() {
    location.href="https://bo-like-chicken.github.io/UI/MyPage_js/index.html.html";
}

function ain() {
    location.href="https://bo-like-chicken.github.io/UI/MyPage_bs/WebContent/index.html";
}