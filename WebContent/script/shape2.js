// 자동정리 절대 하지마세요. 오류 발생
// 게임을 클리어 한 적이 있을때 실행되는 팝업창
function start(){
swal({
  title: "그림맞추기 게임",
  text: "단어에 맞는 그림을 끌어와주세요!\n"+"저번에는 "+localStorage.dragCounter+"번만에 맞췄어요!",
  icon: "info",
  button: "시작"
});
}
// 게임을 클리어 한 적이 없을때 실행되는 팝업창
function noStart(){
swal({
  title: "그림맞추기 게임",
  text: "단어에 맞는 그림을 끌어와주세요!\n첫 도전에 성공해보세요!!!",
  icon: "info",
  button: "시작"
});
}
// dragCounter는 게임을 클리어 했을때만 늘어나기 때문에 이를 클리어 경험의 유무로 판단
if(localStorage.dragCounter>0){
	start();
} else{
	noStart();
}
const draggableElements = document.querySelectorAll(".draggable");
//const는 상수 / draggableElements는 .draggable이 붙은 모든 객체를 가져온다.
const droppableElements = document.querySelectorAll(".droppable");
//const는 상수 / dropbaleElements는 .droppable이 붙은 모든 객체를 가져온다.
draggableElements.forEach(elem => {
	elem.addEventListener("dragstart", dragStart);
	// 사용자가 항목을 끌기 시작하면 즉시 발생 - 여기에서 드래그 데이터를 정의할 수 있습니다.
	// 여기서 elem은 draggableElements 배열의 각 칸을 의미한다.
	// 그래서 드래그가능한 객체들을 가져와서 이벤트리스너를 넣어주고 드래그가 시작될때 dragStart 함수를 호출합니다.  
});
droppableElements.forEach(elem => {
	elem.addEventListener("dragenter", dragEnter);
	// 끌어온 항목이 올바른 드롭 대상에 들어갈 때 dragEnter를 호출합니다.
	elem.addEventListener("dragover", dragOver);
	// 끌어서 놓기 가능한 항목이 드롭 영역 내에 있는 동안 끌어다 놓은
	// 항목이 유효한 드롭 대상 위로 반복적으로 끌 때 발생합니다.
	elem.addEventListener("dragleave", dragLeave);
	// Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
	// 끌어온 항목이 유효한 드롭 대상을 벗어날 때 발생합니다. / 끌어서 드롭 영역이 아닌곳에 넣을때
	elem.addEventListener("drop", drop); 
	// 항목이 유효한 드롭 대상에 놓일 때 발생합니다. / 끌어서 드롭 영역인 곳에 넣을때
});
///////////////////////////////////////////////////////////////
////////////////////// 드래그 앤 드랍 함수/////////////////////////
//////////////////////////////////////////////////////////////
//  드래그 타겟에서 시작되는 이벤트 
function dragStart(event) {
	event.dataTransfer.setData("text", event.target.id);
	// 드래그 되는 타겟의 아이디를 가져옵니다.
}
////////////////////////////////////////////////////////////////////////////////////
let hiddenCount = 0;
// 숨겨진 기능을 위한 카운트입니다.
let hidden = function(event){
				switch (event.type){
				case "click":	hiddenCount++;
								if(hiddenCount % 7 ==0){
								swal({
  									title: "숨겨진 기능",
  									text: "게임에 집중하세요!!!!",	
  									icon: "warning",
  									button: "시작"
									});
								}
							}
						}
// 이 기능을 bell과 moon에 넣어주면 bell과 moon을 7번 이상 클릭하면 숨겨진 메세지가 나옵니다.
				let btn1 = document.getElementById("bell");
				let btn2 = document.getElementById("moon");
				bell.onclick = hidden;
				moon.onclick = hidden;
//////////////////////////////////////////////////////////////////////
// 드랍되는 타겟으로부터 시작되는 이벤트 
function dragEnter(event) {
	// 드래그해서 적합한 드롭 대상위에 올라갔을 때 실행되는 함수
	if (!event.target.classList.contains("dropped")) {
	// 이벤트의 타겟(드랍되는 타겟)이 dropped의 클래스를 가지고 있지 않을 경우
		event.target.classList.add("droppable-hover");
	// 이벤트의 타겟에 droppable-hover의 클래스를 넣어줍니다.
	}
}
function dragOver(event) {
	// 드래그해서 특정영역에 들어가있는 상태
	if (!event.target.classList.contains("dropped")) {
	// 이벤트의 타겟이 dropped의 클래스를 가지고 있지 않을 경우
		event.preventDefault(); // Prevent default to allow drop
	// 이벤트에 기본으로 있는 기능들을 제거합니다.
	}
}
function dragLeave(event) {
	// 드래그하는 요소나 텍스트 블록이 적합한 드롭 대상에서 벗어났을 때 발생한다.
	if (!event.target.classList.contains("dropped")) {
	// 이벤트의 타겟이 dropped의 클래스를 가지고 있지 않을 경우
		event.target.classList.remove("droppable-hover");
	// 이벤트의 타겟에 droppable-hover의 클래스를 제거해줍니다.
	}
}
///////////////////////
let tempCounter = 0;
// 새로고침 후 사용될 임시 카운터
let fails = 0;
// 새로고침 후 사용될 임시 카운터 드래그 대상을 잘못 선택했을때 누적됨
function drop(event) {
	event.preventDefault();
	// 이는 브라우저의 데이터 기본 처리를 방지하기 위한 것입니다.
	event.target.classList.remove("droppable-hover");
	//	드랍받는 객체에게서 droppable-hover의 클래스를 지워준다.
	const draggableElementData = event.dataTransfer.getData("text"); 
	// 드래그한 객체의 데이터를 가져옵니다. 이 메서드는 setData() 메서드에서 동일한 형식으로 설정된 정보 (아이디)를 반환합니다.
	const droppableElementData = event.target.getAttribute("data-draggable-id");
	// 드롭받는 객체의 아이디를 가져옵니다.
	const isCorrectMatching = draggableElementData === droppableElementData;
	if (isCorrectMatching) {
		//드래그한 객체의 아이디와 드랍받는 객체의 아이디가 같다면 실행되는 if문
		const draggableElement = document.getElementById(draggableElementData);
		// draggableElement에 draggableElementData를 id로하는 객체와 똑같은 객체
		event.target.classList.add("dropped");
		// 이벤트 타겟(드랍받는 객체)에게 dropped라는 클래스를 추가해줍니다.
		event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
		// draggable의 컬러를 드랍받는 객체의 배경에 넣어줍니다.
		draggableElement.classList.add("dragged");
		// 드래그해온 객체에 dragged 클래스를 추가해줍니다.
		draggableElement.setAttribute("draggable", "false");
		// 드래그해온 객체를 더 이상 드래그 하지 못하도록 해줍니다.
		event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
		// 드랍받은 객체에 내부에 Html태그를 덮어씌윕니다. 드래그 해온 객체의 fas fa-이름 으로 이렇게하면 배경색을 뚫고 원래의 그림이 흰색으로 나옵니다.
		tempCounter++;
		// 임시카운트를 +1해줍니다. 왜냐면 드래그를 해줬기 때문이죠
		if(tempCounter==5){
		// 다섯군데에 모두 성공적으로 넣었다면
		tempCounter+=fails;
		// 임시카운트에 실패카운트를 합해줍니다.
		localStorage.dragCounter=tempCounter;
		// 그리고 임시카운트의 값을 로컬저장소에 있는 dragCounter에 할당해줍니다.
		console.log("최종"+localStorage.dragCounter);
		// 확인용 콘솔입니다.
			success();
		// 성공 알럿창을 띄웁니다.
		}
	}else{ // 잘못 넣었을때
		fails++;
		// 실패카운트를 +1 해줍니다.
		fail();
		// 실패 메세지를 출력해줍니다.
		console.log("fails: "+fails);
		// 확인용 콘솔입니다.
	}
}
function success(){
swal ( {
  text : " 참 잘하셨어요! " ,
  icon : "success",
  button: "돌아가기"
} ) ;
}
// 성공시 출력되는 메세지
function fail(){
swal ( {
  text : "단어와 맞지 않는 그림이에요!",
  icon : "error",
  button: "돌아가기"
} ) ;
}
// 실패시 출력되는 메세지