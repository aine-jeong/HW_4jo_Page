function more() {
			swal({
				title: "✨ 환영합니다 ✨ ",
				icon: "info",
				button: "OK"
			});
		} 
		
let learn_more = function(event) {
	switch (event.type){
		case "click": more();
	}
}

let main_intro = document.getElementById("more");
main_intro.onclick = learn_more;
