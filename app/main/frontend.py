from flask import Blueprint, render_template
# from flask_cors import CORS


# index 파일을 들어갔을 때 어떻게 이름을 설정할지 결정하는 부분
# url_prefix는 URL을 어떻게 뒤에 붙일지 결정하는 부분
front = Blueprint('front', __name__, url_prefix='/')
# 모든 곳에서 /api/로 호출하는 것을 허용하게 됩니다.
# cors = CORS(front, resources={r"*": {"origins": "*"}})


# 메인 화면 html 보여주기
@front.route('/', methods=['GET'])
def index():
    # /main/index.html은 사실 /protfolio/app/templates/index.html을 가리킵니다.
    return render_template('/main/index.html')


# 추가 팝업창 html 새창 띄우기
@front.route('/showAddPopup', methods=['GET'])
def addPopup():
    return render_template('/popup/addDataPopup.html', title='추가', clickFunction='addData();')


# 수정 팝업창 html 새창 띄우기
@front.route('/showUpdatePopup', methods=['GET'])
def updatePopup():
    return render_template('/popup/addDataPopup.html', title='수정', clickFunction='updateData();')
