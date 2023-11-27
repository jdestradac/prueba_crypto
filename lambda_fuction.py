
import json
import mysql.connector
import os
import requests
from requests import Request, Session

url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
parameters = {
      'symbol':'BTC,ETH'
    }
    
key = os.environ['pro_api_key']

headers = {
      'Accepts': 'application/json',
      'X-CMC_PRO_API_KEY': key,
    }
    
host_db = os.environ['host_db']
user_db = os.environ['user_db']
password_db = os.environ['password_db']
database = os.environ['database']


db_config = {
    'host': host_db,
    'user': user_db,
    'password': password_db,
    'database': database,
}

def lambda_handler(event, context):
    
    session = Session()
    session.headers.update(headers)
    response = session.get(url, params=parameters)
    data = json.loads(response.text)
    btc=data['data']['BTC']['quote']['USD']['price']
    eth=data['data']['ETH']['quote']['USD']['price']
    btc_datetime =data['data']['BTC']['quote']['USD']['last_updated']
    eth_datetime=data['data']['ETH']['quote']['USD']['last_updated']
    
    try:
        connection = mysql.connector.connect(**db_config)
    
        if connection.is_connected():
            cursor = connection.cursor()
            query = "INSERT INTO Cryptocurrencies (crypto_name, crypto_price, date_time ) VALUES (%s, %s, %s)"
    
            cursor.execute(query, ('BTC', btc, btc_datetime))
            cursor.execute(query, ('ETH', eth, btc_datetime))
            
            connection.commit()
            cursor.close()
            connection.close()
            
    except mysql.connector.Error as err:
         print(f"Error: {err}")
    

    return {
        'statusCode': 200,
        'body': 'Base de datos actualizada'
    }
