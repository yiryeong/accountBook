// list data 가져오기
let backURL = 'http://13.125.78.34:9000/api/';
let searchDataURL = backURL+'searchData';
let deleteDataURL = backURL+'delSelectData';
let getAllDataUrl= backURL+'getAllData';
let getAllDataDown = backURL+'getAllDataDown';
// totalData : 총 데이터 수 , dataPerPage : 한 페이지에 나타낼 데이터 수 , pageCount : 한 화면에 나타낼 페이지 수
let totalData, dataPerPage = 10, pageCount = 5;
let data;

//자동실행 함수
$(function(){
    //검색영역에 날짜를 오늘로 설정
    $('#selectDay').val(new Date().toISOString().substring(0, 10));

    // data 화면에 띄우기
    showFirstPageList();
});


// 디비에 모든 데이터 가져오기
function getAllData(apiUrl){
    let data;
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: apiUrl,
        dataType: 'json',
        async: false,
        success: function(result) {
            data = result;
        },
        error: function(result) {
            console.log("error : " +result);
        }
    })

    return data;
}


// 디비에서 입력내용 데이터 검색
function searchData(){
    let selectDay = $('#selectDay').val();
    let productName = $('#keyword').val();

    postData = {
            selectDay : selectDay,
            productName : productName
    };
    $.ajax({
        url : searchDataURL,
        type : 'POST',
        data : JSON.stringify(postData),
        contentType: 'application/json',
        async: false,
        success : function(data) {
            resultData = JSON.parse(data);
            console.log(resultData);
            if(resultData == ''){
                let list = '<ul class="listUl"><li class="fl tc nodata"> <span> 검색한 데이터는 존재하지 않습니다. </span> </li></ul>';
                document.querySelector(".item_list").innerHTML = list;
                paging(0, dataPerPage, pageCount, 0);
            }else{
                showList(resultData, 0, resultData.length);
                paging(1, dataPerPage, pageCount, 1);
            }
        },
        error :  function(data) {
            console.log(data);
        }
    })
}

function enterKey(){
    if (window.event.keyCode == 13) {
        searchData();
    }
}


// 불러온 data 화면에 데이터 뿌려주기
function showList(jsonData, startNum, endNum){
    let list = '';
    // 리스트 영역 가져온 데이터 뿌리기
    for (let i = startNum; i < endNum; i++) {
        if (jsonData[i].place == "") {
            jsonData[i].place = "-";
        }
        list += '<ul class="listUl" id="ul'+i+'">'
            list += '<li class="fl tc list t_line lt_line checkbox"><input type="checkbox" id="checkbox'+i+'"></li>';
            list += '<li id="selectDay'+i+'" class="fl tc list t_line lt_line dateLi">'+jsonData[i].selectDay+'</li>';
            list += '<li id="category'+i+'" class="fl tc list t_line lt_line categoryLi">'+jsonData[i].category+'</li>';
            list += '<li id="productName'+i+'" class="fl tc list t_line lt_line nameLi">'+jsonData[i].productName+'</li>';
            list += '<li id="count'+i+'" class="fl tc list t_line lt_line countLi">'+jsonData[i].count+'</li>';
            list += '<li id="price'+i+'" class="fl tc list t_line lt_line priceLi">'+jsonData[i].price+'</li>';
            list += '<li id="place'+i+'" class="fl tc list t_line lt_line contentsLi">'+jsonData[i].place+'</li>';
            list += '<li class="fl tc list t_line lt_line buttonLi">'+'<button class="listButton" id="changeButton'+i+'" onClick="showUpdatePopup('+i+');">수정</button><button class="listButton" id="delButton'+i+'" onClick="deleteRow('+i+');">삭제</button>'+'</li>';
        list += "</ul>";
    }
    document.querySelector(".item_list").innerHTML = list;
}


// 페이징  -- 변수 설명(순서대로) : 총 데이터 수, 한 페이지에 보이는 데이터 수, 한 화면에 보이는 페이지 수, 현재 페이지 수
function paging(totalData, dataPerPage, pageCount, currentPage) {
    // 총 페이지 수
    let totalPage = Math.ceil(totalData/dataPerPage);

    // 화면에 보여질 첫번째 페이지 번호
    let first = currentPage - currentPage % pageCount + 1;
    if (first <= 0) {
        first = 1;
    }

    // 화면에 보여질 마지막 페이지 번호
    let last = currentPage - currentPage % pageCount + pageCount;
    if (last > totalPage) {
        last = totalPage;
    }

    let $pingingView = $("#paging");

    let html = "";

    if(totalPage > pageCount){
        html += "<a href=# id='prev'><<</a> ";
    }
    for(var i=first; i <= last; i++){
        html += "<a href='#' id=" + i + ">" + i + "</a> ";
    }

    if(last < totalPage && totalPage > pageCount) {
        html += "<a href=# id='next'>>></a>";
    }

    // 페이지 목록 생성
    $("#paging").html(html);
    $("#paging a").css("color", "black");
    // 현재 페이지 표시
    $("#paging a#" + currentPage).css({"text-decoration":"none", "color":"red", "font-weight":"bold"});

    $("#paging a").click(function(){
        let $item = $(this);
        let $id = $item.attr("id");
        let selectedPage = $item.text();

        if($id == "next")    selectedPage = first+pageCount;
        if($id == "prev")    selectedPage = first-pageCount;

        if(selectedPage < 0) {
            selectedPage = 1;
        }

        //모든 데이터 가져오기
        jsonData = getAllData(getAllDataUrl);

        let startNum = (selectedPage-1)*10 ;
        let endNum = (selectedPage-1)*10+10 ;

        if (endNum > jsonData.length){
            endNum = jsonData.length;
        }

        showList(jsonData, startNum, endNum);

        if(selectedPage%pageCount != 0 ) {
            paging(totalData, dataPerPage, pageCount, selectedPage);
        }else{
            $("#paging a#" + currentPage).css({"text-decoration":"underline", "color":"black", "font-weight":"normal"});
            $("#paging a#" + selectedPage).css({"text-decoration":"none", "color":"red", "font-weight":"bold"});
        }
    });
}


// 첫페이지의 data 가져와서 화면에 띄우기
function showFirstPageList(){
    let allData = getAllData(getAllDataUrl);
    let endNum = allData.length;

    if(endNum > 10){
        endNum = 10;
    }
    // 리스트 보여주기
    showList(allData, 0, endNum);
    // 페이징 처리  jsonData.length
    paging(allData.length, dataPerPage, pageCount, 1);
}


// 데이터 삭제
function deleteRow(rowNum) {
    let result = confirm('데이터를 삭제하시겠습니다?');
    let arr = new Array();

    if(result == true){
        $('#ul'+rowNum+' li').each(function(index, element) {
            arr.push($(this).text());
        })
        postData = {
            selectDay : arr[1],
//            category : arr[2],
            productName : arr[3],
//            count : arr[4],
//            price : arr[5],
//            place : arr[6]
        };

        $.ajax({
            url : deleteDataURL,
            type : 'POST',
            data : JSON.stringify(postData),
            contentType: 'application/json',
            async: false,
            success : function(data) {
                alert('삭제성공!');
                window.location.reload();
            },
            error :  function(data) {
                alert('삭제실패!');
                window.location.reload();
            }
        })
    }
}


// sorting 오름차순
function dateSortUp(){
    showFirstPageList();
}
//내림차순
function dateSortDown(){
    let allData = getAllData(getAllDataDown);
    let endNum = allData.length;

    if(endNum > 10){
        endNum = 10;
    }
    // 리스트 보여주기
    showList(allData, 0, endNum);
    // 페이징 처리  jsonData.length
    paging(allData.length, dataPerPage, pageCount, 1);
}
