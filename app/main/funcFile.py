import json
from flask import make_response
from app.main import dbConnect as dbConnect


# 디비 모든 데이터 가져오기
def getDbData():
    dbData = dbConnect.dbConnectToGetData()
    result = json.dumps(dbData, ensure_ascii=False)
    return result
    # dict_data = {}
    # final_data = []
    #
    # with open(file, "r") as fp:
    #     for line in fp.readlines():
    #         split_data = line.split(",")
    #         dict_data["date"] = split_data[0]
    #         dict_data["category"] = split_data[1]
    #         dict_data["name"] = split_data[2]
    #         dict_data["price"] = split_data[3]
    #         if len(split_data) > 4:
    #             dict_data["contents"] = split_data[4]
    #         else:
    #             dict_data["contents"] = ""
    #
    #         final_data.append(dict_data)
    #         dict_data = {}
    #
    #         json_data = json.dumps(final_data, ensure_ascii=False)
    #         res = make_response(json_data)
    #         res.headers['Content-Type'] = 'application/json'
    #
    #     return res


# 데이터 추가 하기
def addDataToDB(data):
    price = data['price']
    productName = data['productName']
    count = data['count']

    if not productName:
        result = 'please input productName.\n'
        return result
    elif not price:
        result = 'please input price.\n'
        return result
    elif not count:
        result = 'please input count.\n'
        return result
    else:
        result = dbConnect.inputDBData(data)
        return result


# txt 파일에 데이터 추가 하기
def updateDataToDB(data):
    price = data['price']
    productName = data['productName']
    count = data['count']

    if not productName:
        result = 'please input productName.\n'
        return result
    elif not price:
        result = 'please input price.\n'
        return result
    elif not count:
        result = 'please input count.\n'
        return result
    else:
        result = dbConnect.updateDBData(data)
        return result


# 데이터 삭제 하기
def delData(data):
    result = dbConnect.delDBData(data)
    return result
