from fastapi import FastAPI
from connector import connection
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For testing, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/employee_data')
def home():
    connector = connection()
    cursor = connector.cursor()
    cursor.execute("""select * from employees""")
    data = cursor.fetchall()
    return data