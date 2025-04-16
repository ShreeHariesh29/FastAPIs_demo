from fastapi import FastAPI, HTTPException, Path
from connector import connection
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
    cursor.execute("""select * from new_employee_data""")
    data = cursor.fetchall()
    return data
@app.get('/employee_data/{id}')
def part_data(id: int):
    connector = connection()
    cursor = connector.cursor()
    cursor.execute("""select * from new_employee_data where id = %s""",(id,))
    data = cursor.fetchone()
    return data

class Employee(BaseModel):
    employee_name: str
    employee_age: int
    employee_designation: str
    employee_salary: float
    employee_number: str
    employee_shift: str

@app.post("/add_employee_json")
def add_employee_json(emp: Employee):
    try:
        connector = connection()
        cursor = connector.cursor()

        insert_query = """
        INSERT INTO new_employee_data (employee_name, employee_age, employee_designation, employee_salary, employee_number, employee_shift)
        VALUES (%s, %s, %s, %s, %s, %s)
        """

        cursor.execute(insert_query, (
            emp.employee_name,
            emp.employee_age,
            emp.employee_designation,
            emp.employee_salary,
            emp.employee_number,
            emp.employee_shift
        ))

        connector.commit()

        return {"message": "Employee added successfully!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.put("/update_employee/{employee_id}")
def update_employee(employee_id: int = Path(...), emp: Employee = None):
    try:
        connector = connection()
        cursor = connector.cursor()

        update_query = """
        UPDATE new_employee_data
        SET employee_name=%s, employee_age=%s, employee_designation=%s,
            employee_salary=%s, employee_number=%s, employee_shift=%s
        WHERE id=%s
        """

        cursor.execute(update_query, (
            emp.employee_name,
            emp.employee_age,
            emp.employee_designation,
            emp.employee_salary,
            emp.employee_number,
            emp.employee_shift,
            employee_id
        ))

        connector.commit()
        return {"message": "Employee updated successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

