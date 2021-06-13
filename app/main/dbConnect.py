import boto3
from botocore.exceptions import ClientError


# aws dynamoDB 연결
def connectDB():
    db = boto3.resource(
        'dynamodb',
        endpoint_url='https://dynamodb.ap-northeast-2.amazonaws.com'
    )
    return db


# 모든 데이터 가져오기
def dbConnectToGetData():
    dynamodb = connectDB()
    table = dynamodb.Table('moneyList')

    try:
        response = table.scan()
    except ClientError as e:
        return e.response['Error']['Message']
    else:
        return response['Items']


# 입력 데이터 추가 하기
def inputDBData(data):
    dynamodb = connectDB()
    table = dynamodb.Table('moneyList')

    selectDay = data['selectDay']
    category = data['category']
    productName = data['productName']
    count = data['count']
    price = data['price']
    place = data['place']

    try:
        # DynamoDB에 새로운 data 입력
        response = table.put_item(
            Item={
                'selectDay': selectDay,
                'category': category,
                'productName': productName,
                'price': price,
                'count': count,
                'place': place
            }
        )
        return response
    except ClientError as e:
        return e.response['Error']['Message']


# 입력 데이터 수정 하기
def updateDBData(data):
    dynamodb = connectDB()
    table = dynamodb.Table('moneyList')

    selectDay = data['selectDay']
    category = data['category']
    productName = data['productName']
    count = data['count']
    price = data['price']
    place = data['place']

    try:
        # DynamoDB에 data 수정
        response = table.update_item(
            Key={
                'selectDay': selectDay,
                'productName': productName
            },
            UpdateExpression="set category= :c, #ct=  :co, price= :p, place= :pl",
            ExpressionAttributeNames={
                "#ct": "count"
            },
            ExpressionAttributeValues={
                ':c': category,
                ':co': count,
                ':p': price,
                ':pl': place
            },
            ReturnValues="UPDATED_NEW"
        )
        return response
    except ClientError as e:
        print(e.response['Error'])
        return e.response['Error']['Message']


# 선택한 데이터 삭제하기
def delDBData(data):
    dynamodb = connectDB()
    table = dynamodb.Table('moneyList')

    selectDay = data['selectDay']
    productName = data['productName']

    try:
        # DynamoDB에 새로운 data 입력
        response = table.delete_item(
            Key={
                'selectDay': selectDay,
                'productName': productName
            }
        )
    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])
        else:
            raise
    else:
        return response
