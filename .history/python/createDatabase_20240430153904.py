import sqlite3
db = sqlite3.connect('db.sqlite')

db.execute('DROP TABLE IF EXISTS users')

db.execute('''CREATE TABLE users(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone INTEGER NOT NULL,
    password TEXT NOT NULL
)''')


cursor = db.cursor()

cursor.execute('''
    INSERT INTO users(name,email,phone,password)
    VALUES('Angela','angela123@gmail.com','60164328932','utar2343')
''')
cursor.execute('''
    INSERT INTO users(name,email,phone,password)
    VALUES('AbuIskandar','Abu234@gmail.com','60134627893','school123')
''')
cursor.execute('''
    INSERT INTO users(name,email,phone,password)
    VALUES('Daniss','daniel17584@gmail.com','0148972134','pw123')
''')
cursor.execute('''
    INSERT INTO users(name,email,phone,password)
    VALUES('Alex','Aelx123@gmail.com','0157892632','pw123')
''')
cursor.execute('''
    INSERT INTO users(name,email,phone,password)
    VALUES('Derrick','derrick123@gmail.com','0164328932','pw123')
''')


db.commit()
db.close()