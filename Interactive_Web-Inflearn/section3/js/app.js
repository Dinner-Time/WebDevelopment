// app.js

// --------- 변수 section --------- //

const contentWrap = document.querySelector('.contentWrap'); // 전체 content
const coverImgs = document.querySelectorAll('.coverImg'); // 앨범 이미지 => 클릭하면 해당 노래의 유튜브 링크로 연결된다.
const disk = document.querySelector('.disk'); // 뒤에서 돌아가는 디스크
const prevButton = document.getElementsByTagName('button')[0]; // 이전 곡 버튼
const nextButton = document.getElementsByTagName('button')[1]; // 다음 곡 버튼
const point = document.querySelectorAll('.pointWrap li'); // 노래 index버튼

// 배경 색 gredient를 위한 배열
const bgColor = new Array(); 
bgColor[0] = ['#0074a4', '#f99c57'];
bgColor[1] = ['rgb(174 132 155)', 'rgb(193 200 206)'];
bgColor[2] = ['#e48c80', 'rgb(112 94 162)'];

// 페이징을 위한 변수
var pageNum = 0; 
var totalPage = coverImgs.length - 1;


// --------- 페이징 section --------- //
// CSS에서 작업한 active 클래스를 추가, 삭제하는 것으로 페이징을 실행한다.

changePage(); // active 적용을 위한 최초 실행

// 이전 곡 버튼 클릭 이벤트
prevButton.addEventListener('click', function () {
    prevPage();
    changePage();
});

// 다음 곡 버튼 클릭 이벤트
nextButton.addEventListener('click', function () {
    nextPage();
    changePage();
});

// index 버튼 클릭 이벤트
for (var i = 0; i < point.length; i++) {
    (function (idx) {
        point[idx].onclick = function () {
            pageNum = idx;
            changePage();
        }
    })(i);
}

// --------- 터치 이벤트 section --------- //
// 터치 기능을 구현한다.

if (mobileChk()) { // 현재 접속이 모바일 기기인지 확인
    // touchFunc함수 실행
    contentWrap.addEventListener('touchstart', touchFunc, false);
    contentWrap.addEventListener('touchend', touchFunc, false);
}

var startX = 0; // 터치를 시작한 x좌표를 담을 변수
var endX = 0; // 터치를 끝낸 x좌표를 담을 변수

function touchFunc(evt) {

    switch (evt.type) {
        case "touchstart":
            startX = evt.changedTouches[0].clientX; // 터치를 시작한 x좌표
            endX = 0;
            break;
        case "touchend":
            endX = evt.changedTouches[0].clientX; // 터치를 끝낸 x좌표

            // 터치가 끝났기 때문에 페이징 실행
            var chkNum = startX - endX; 
            if (Math.abs(chkNum) > window.innerWidth*0.2) { // 두 좌표의 차의 절댓값이 브라우저 width의 20%보다 클 경우
                if (chkNum < 0) { // => 터치를 끝낸 좌표가 더 크다 => 왼쪽에서 오른쪽으로 스와이프
                    prevPage();
                } else { // => 터치를 끝낸 좌표가 더 작다 => 오른쪽에서 왼쪽으로 스와이프
                    nextPage();
                }
                changePage();
            }
            break;
    }
}

// --------- 함수 section --------- //

// 이전 페이지로 페이징을 위한 함수
function prevPage(){
    // 첫번째 페이지일 경우 마지막 페이지로 이동
    if (pageNum == 0) {
        pageNum = totalPage;
    } else {
        pageNum--;
    }
}

// 다음 페이지로 페이징을 위한 함수
function nextPage(){
    // 마지막 페이지일 경우 첫 페이지로 이동
    if (pageNum == totalPage) {
        pageNum = 0;
    } else {
        pageNum++;
    }
}

// 페이징 함수
function changePage() {
    // index버튼과 커버이미지에 추가된 모든 active클래스를 제거
    for (var i = 0; i < point.length; i++) {
        point[i].classList.remove("active");
        coverImgs[i].classList.remove("active");
    }
    // 현재 페이지에 해당하는 요소들에 active클래스 추가
    point[pageNum].classList.add('active');
    coverImgs[pageNum].classList.add("active");
    // 배경색 변경
    contentWrap.style.background =
        `linear-gradient(140deg, ${bgColor[pageNum][0]}, ${bgColor[pageNum][1]})`;
}

// 모바일 기기 확인 함수
function mobileChk() {
    var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
    for (var info in mobileKeyWords) {
        if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
            return true;
        }
    }
    return false;
}