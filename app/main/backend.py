from flask import Blueprint, request
from app.main import funcFile as func
from flask_cors import CORS


# index 파일을 들어갔을 때 어떻게 이름을 설정할지 결정하는 부분
# url_prefix는 URL을 어떻게 뒤에 붙일지 결정하는 부분
backend = Blueprint('backend', __name__, url_prefix='/')
# 모든 곳에서 /api/로 호출하는 것을 허용하게 됩니다.
cors = CORS(backend, resources={r"/api/*": {"origins": "*"}})


# json data 가져오기
@backend.route('/api/getAllData', methods=['GET'])
def getAllData():
    result = func.getDbData()
    return result


# json data 가져오기
@backend.route('/api/getAllDataDown', methods=['GET'])
def getAllDataDown():
    result = func.getAllDataDown()
    return result


# 데이터 추가 하기
@backend.route('/api/addOk', methods=['POST'])
def addOk():
    jsonData = request.get_json()
    result = func.addDataToDB(jsonData)
    return result


# 데이터 수정 하기
@backend.route('/api/updateOK', methods=['POST'])
def updateOK():
    jsonData = request.get_json()
    result = func.updateDataToDB(jsonData)
    return result


# 데이터 삭제
@backend.route('/api/delSelectData', methods=['POST'])
def delData():
    jsonData = request.get_json()
    result = func.delData(jsonData)
    return result


# 데이터 검색
@backend.route('/api/searchData', methods=['POST'])
def searchData():
    jsonData = request.get_json()
    result = func.searchData(jsonData)
    return result
