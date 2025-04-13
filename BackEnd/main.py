from fastapi import FastAPI
from connector import connection

app = FastAPI()

@app.get('/')
def home():
    connector = connection()
    cursor = connector.cursor()
    cursor.execute("""select * from employees""")
    data = cursor.fetchall()
    return data