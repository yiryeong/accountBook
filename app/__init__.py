# 해당 파일은 위에서 선언한 from app import app을 통해 실행되는 모든 파일들을 전체적으로 초기화 및 실행하기 위한 파일
from flask import Flask
# 앞으로 새로운 폴더를 만들어서 파일을 추가할 예정임
# from app.main.[파일 이름] --> app 폴더 아래에 main 폴더 아래에 [파일 이름].py 를 import 한 것임
from app.main.frontend import front as frontend
from app.main.backend import backend as backend

# 추가할 모듈이 있다면 추가
# config 파일이 있다면 추가

app = Flask(__name__)

# 위에서 추가한 파일을 연동해주는 역할
app.register_blueprint(frontend)  #as frontend으로 설정해주었으므로
app.register_blueprint(backend)
