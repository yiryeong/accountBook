// 팝업창 중앙정렬
function popupCenter(href, popupName, w, h) {
	var xPos = (document.body.offsetWidth/2) - (w/2); // 가운데 정렬
	xPos += window.screenLeft; // 듀얼 모니터일 때
	var yPos = (document.body.offsetHeight/2) - (h/2);
	return window.open(href, popupName, "width="+w+", height="+h+", left="+xPos+", top="+yPos+", location=no, resizable=yes");
}


// 추가 팝업창 띄우기
function showAddPopup() {
    var win = popupCenter("/showAddPopup", "추가", 420, 350);
    setTimeout(() => win.document.getElementById('addPop_selectDay').value = new Date().toISOString().substring(0, 10), 200);
}
// data 추가
function addData(){
    postData('/addOk', console.log('추가 실패'));
}



// 수정 팝업창 띄우기
function showUpdatePopup(rowNum) {
    var win = popupCenter("/showUpdatePopup", "수정", 420, 350);
    setTimeout(setValue, 200, win, rowNum);
}
// 수정 팝업창에 데이터 넣기
function setValue(win, rowNum){
    var newDocument = win.document;
    var category = $('#category'+rowNum).text();
    var sel = newDocument.getElementById('addPop_category');
    var opts = sel.options;

    newDocument.getElementById('addPop_selectDay').value = $('#selectDay'+rowNum).text();
    newDocument.getElementById('addPop_productName').value = $('#productName'+rowNum).text();
    newDocument.getElementById('addPop_count').value = $('#count'+rowNum).text();
    newDocument.getElementById('addPop_price').value = $('#price'+rowNum).text();
    newDocument.getElementById('addPop_place').value = $('#place'+rowNum).text();
    for (var j = 0; opt = opts[j]; j++) {
        if (opt.value == category) {
            sel.selectedIndex = j;
            break;
        }
    }
}
// data 수정
function updateData(){
    postData('/updateOK', func());
}
function func() {
    window.close();
    opener.location.reload();
}

// 추가 필수값 확인  // TODO 개선 필요
function checkAddData() {
    let productName = $('#addPop_productName').val();
    let price = $('#addPop_price').val();
    let count = $('#addPop_count').val();

    if(productName != '' && price != '' && count != '') {
        return true;
    }else{
        if(productName == '' || price == '' || count == '') {
            alert('필수값을 입력해주세요.');
        }
        return false;
    }
}


// 데이터 추가/수정
function postData(url, command) {
    // 추가 필수값 check 함수
    let result = checkAddData();
    let place = $('#addPop_place').val();
    if($('#addPop_place').val() == '-'){
        place = '';
    }

    if(result) {
        postData = {
            selectDay : $('#addPop_selectDay').val(),
            category : $('#addPop_category').val(),
            productName : $('#addPop_productName').val(),
            price : $('#addPop_price').val(),
            count : $('#addPop_count').val(),
            place : place
        };

        $.ajax({
            url : url,
            type : 'POST',
            data : JSON.stringify(postData),
            contentType: 'application/json',
            async: false,
            success : function(data) {
                window.close();
                alert('성공!');
                opener.location.reload();
            },
            error :  function(data) {
                alert('실패!');
                command
            }
        })
    }
}
