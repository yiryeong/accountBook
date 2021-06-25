from flask import Blueprint, render_template, request
from app.main import funcFile as func
from app.main import dbConnect as dbConnect


# index 파일을 들어갔을 때 어떻게 이름을 설정할지 결정하는 부분
# url_prefix는 URL을 어떻게 뒤에 붙일지 결정하는 부분
main = Blueprint('main', __name__, url_prefix='/')


# 메인 화면 html 보여주기
@main.route('/', methods=['GET'])
def index():
    # /main/index.html은 사실 /protfolio/app/templates/index.html을 가리킵니다.
    return render_template('/main/index.html')


# 추가 팝업창 html 새창 띄우기
@main.route('/showAddPopup', methods=['GET'])
def addPopup():
    return render_template('/popup/addDataPopup.html', title='추가', clickFunction='addData();')


# 수정 팝업창 html 새창 띄우기
@main.route('/showUpdatePopup', methods=['GET'])
def updatePopup():
    return render_template('/popup/addDataPopup.html', title='수정', clickFunction='updateData();')


# json data 가져오기
@main.route('/getAllData', methods=['GET'])
def getAllData():
    result = func.getDbData()
    return result


# 데이터 추가 하기
@main.route('/addOk', methods=['POST'])
def addOk():
    jsonData = request.get_json()
    result = func.addDataToDB(jsonData)
    return result


# 데이터 수정 하기
@main.route('/updateOK', methods=['POST'])
def updateOK():
    jsonData = request.get_json()
    result = func.updateDataToDB(jsonData)
    return result


# 데이터 삭제
@main.route('/delSelectData', methods=['POST'])
def delData():
    jsonData = request.get_json()
    result = func.delData(jsonData)
    return result


# 데이터 검색
@main.route('/searchData', methods=['POST'])
def searchData():
    jsonData = request.get_json()
    result = func.searchData(jsonData)
    return result
