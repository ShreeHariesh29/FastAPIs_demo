import pymysql
import pymysql.cursors


def connection():
    try:
        connect = pymysql.connect(
            host='localhost',
            user='root',
            password='Shree@290602',
            database='employee_data',
            port=3306,
            cursorclass=pymysql.cursors.DictCursor
        )
        return connect
    except pymysql.MySQLError as e:
        raise Exception("DataBase Have not Connected") from e