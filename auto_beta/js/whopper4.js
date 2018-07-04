/*
* tag : 엘리먼트 텍스트 저장
*
*
*
*
*
*
*	@ 기능 구현 필요 ------------------------------
*	@ 엘리먼트 추가시 input 으로 갈지 textarea 로 하여 줄넘김을 갈지  contenteditable 로 가면 대신 줄넘김을 div 에서 br 로 수정해야 한다
*	@ li 계속 추가후에 종료 시점을 체크해야 한다 그시점에서 ul 을 닫는다
*	@ a 태그 top/left/width/height 등의 속성제어를 어떻게 할것인가
*		ㄴ 동시에 중앙에서 밀경우에 대비는 어떻게 할것인가
* ? 1013 텍스트 입력칸의 heading 과 li 가 들여쓰기가 되어야 하는가??
*	V 버전 관련 -----------------------------------
*	추가 삭제 기능을 어떻게 구현할것인가
*	중간에 추가/삭제 시  클래스명 indexing 은 어떻게 처리할것인가
*	input_list 에서는?  ul li 가 쌓인곳은 어떻게 대응할 것인가
*
*	=> data- 를 이용할것인가?
*		! 엘리먼트에 값을 저장할 경우 다른 앨리먼트가 수정되었을때 전체가 index 값이 변경되어야 하므로 리소스 낭비이다
* => 추가 기능 제작시 추가할 엘리먼트는 어떻게 선택해야 하는가? 계속 자신을 복제하여 추가할것인? 해딩테그는 그런 행동이 필요한기?
*		! 추가시 엘리먼트를 선택할  셀렉트박스르 보여줄까?
*
*	! 일단은 추가 기능은 보류!!
*/


var tag = {
		h1 : ['<h1>','</h1>'],
		h2 : ['<h2>','</h2>'],
		h3 : ['<h3>','</h3>'],
		h4 : ['<h4>','</h4>'],
		h5 : ['<h5>','</h5>'],
		h6 : ['<h6>','</h6>'],
		p : ['<p>','</p>'],
		ul : ['<ul>','</ul>'],
		li : ['<li>','</li>'],
		a : ['<a href="', '" target="', '" title="', '">'] // func 로 변경하럿
	},
	input_list = []; // 굳이 필요 한가

add_line.ul_status = false; // 열려있음 : ture , 닫힘 false 외부로 뺀이유는 독립성을 위해

function add_line(element) {
	var targetarea = $('.add_input'); // 입력 input 이 추가될 영역
	var tmpClass = 'line_' + input_list.length + ' element_default'; // 기본 클래스명

	this.element_label = function (){
		if (element == 'li') { // li 일때 marginleft 이란 클래스 추가
			tmpClass = 'line_' + input_list.length + ' marginleft'+ ' element_' + element;
		}
		return '<div class="' + tmpClass + '"><label for="input_' + input_list.length + '">' + element + '</label> <input type="text" id="input_' + input_list.length + '"> <button type="button" class="btn_remove_gap">삭제</button><button type="button" class="btn_add_gap">추가</button></div>'; // 입력상자와 label 조합
	};
	this.element_label2 = function (){
		var tmpClass = 'line_' + input_list.length + ' element_' + element; // 기본 클래스명
		return '<div class="' + tmpClass + '"><label for="input_' + input_list.length + '">' + element + '</label> <input type="text" id="input_' + input_list.length + '" placeholder="URL"> <input type="text" placeholder="alt"><select> <option value="_blank" selected="select">_blank</option> <option value="_parent">_parent</option> <option value="_self">_self</option> <option value="_top">_top</option> </select><button type="button" class="btn_remove_gap">삭제</button><button type="button" class="btn_add_gap">추가</button></div>'; // a 태그 관련한 태그추가
	};
	
	if (element == 'li') { // li 일때
		if (!this.ul_status) { // ul 열려 있지 않음
			console.log(input_list.length);
			input_list.push('ul'); // ul 과 li 를 같이 배열에 추가한다
			targetarea.append('<p class="t_list line_' + input_list.length + '">ul</p>');
			input_list.push('li'); // ul 과 li 를 같이 배열에 추가한다
			// targetarea.append('<p class="t_list">ul</p>');
			console.log(input_list.length);
			this.ul_status = true;
		} else {
			input_list.push('li'); // 열려 있을때 목록 배열에 li 만 추가한다
			console.log(input_list.length);
		}
		targetarea.append(element_label); //입력상자에 추가
		
	} else {
		
		if (this.ul_status) { // 열려 있으면 닫기
			this.ul_status = false;
		}
		
		if ( element == 'a' ) { // 그외
			input_list.push('a'); // 추가순서
			console.log(input_list.length);
			targetarea.append(element_label2); //입력상자에 추가
			
		} else { // 해딩 + p 에 대한 내용
			input_list.push(element); // 추가순서
			console.log(input_list.length);
			targetarea.append(element_label); //입력상자에 추가
		}
	}
	// console.log(input_list);
}

function readURL(event){ // 이미지 배경삽입
	var getImagePath = URL.createObjectURL(event.target.files[0]);
	$('.whopper').css('background-image', 'url(' + getImagePath + ')');
}

$('.add').on('mouseup', function () {
	var text = $(this).html();
	switch (text) {
		case 'a': // a 버튼은 다른 행동 필요
			console.log('aaaaa');
			add_line('a');
			break;
		case 'ul &gt; li': // ul li 관계를 정리하여야 하므로 다른 행동필요
			console.log('lilili');
			add_line('li')
			break;
		default: // a, li 이외에 무조건 엘리먼트 추가
			add_line(text);
			break;
	}
	// console.log(text);
});

$('.btn_remove_gap').on('click', function (){ // 중간 엘리먼트 삭제
	console.log('btn_remove_gap');
});
$('.btn_add_gap').on('click', function (){ // 중간 엘리먼트추가
	console.log('btn_add_gap');
});