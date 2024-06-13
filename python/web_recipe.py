# from flask import Flask
# from flask_socketio import SocketIO, emit
# import json

# class Recipe:
#     def __init__(self, userId ,name, ingredients: any, instructions, notes, image):
#         self.userId = userId
#         self.name = name 
#         self.ingredients = ingredients
#         self.instructions = instructions
#         self.notes = notes
#         self.image = image | None

#     def __init__(self):
#         self.userId = None
#         self.name = None
#         self.ingredients = None
#         self.instructions = None
#         self.notes = None
#         self.image = None


# recipe = Recipe()  


# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
# socketio = SocketIO(app)


# @socketio.on('connect', namespace='/recipe')
# def handle_connect_recipe():
#     print('Client connected to recipe namespace')

# @socketio.on('disconnect', namespace='/recipe')
# def handle_disconnect_recipe():
#     print('Client disconnected from recipe namespace')

# @socketio.on('emit_recipe', namespace='/recipe')
# def emit_recipe(recipe):
#     emit('server_response_recipe', json.dumps({
#         'userId': recipe.userId,
#         'name': recipe.name,
#         'ingredients': recipe.ingredients,
#         'instructions': recipe.instructions,
#         'notes': recipe.notes,
#         'image': recipe.image
#     }), namespace='/recipe')  

# @socketio.on('client_addRecipe', namespace='/recipe')
# def handle_client_send_recipe(recipe):
#     print('received json: ' + str(recipe))
#     emit('server_response_recipe', recipe)

# @socketio.on('client_receive_recipe', namespace='/recipe')
# def handle_client_receive_recipe(recipe):
#     print('received json: ' + str(recipe))
#     #emit the data to client
#     emit('server_response_recipe', recipe)
    
# @socketio.on('preload_systemRecipe', namespace='/recipe')
# def preload_systemRecipe():
#     emit('server_response_recipe', json.dumps({
#         'userId': 'system',
#         'name': 'ABCDEFG',
#         'ingredients': '1 cup of flour\n 1 glss of milk',
#         'instructions': 'Step1: add in `flour` \n Step2: add in `milk`',
#         'notes': 'sfsfsafafdsa',
#         'image': 'system'
#     },{
#         'userId': 'system',
#         'name': 'HIJKLMN',
#         'ingredients': '1 cup of cookies\n 1 glss of cookies',
#         'instructions': 'Step1: add in `cookies` \n Step2: add in `cookies`',
#         'notes': 'sfsfsafafdsa',
#         'image': 'system'
#     },{
#         'userId': 'system',
#         'name': 'OPQRSTU',
#         'ingredients': '1 cup of choco\n 1 glss of choco',
#         'instructions': 'Step1: add in `choco` \n Step2: add in `choco`',
#         'notes': 'sfsfsafafdsa',
#         'image': 'system'
#     }
#     ), namespace='/recipe')


# if __name__ == '__main__':
#     socketio.run(app, host='0.0.0.0', port=5000, debug=True)


from flask import Flask, render_template, request
from flask_socketio import SocketIO
import sqlite3
import json
import os

# Create Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

db = 'recipes.sqlite'

# Function to create SQLite database if not exists
def create_database():
    if not os.path.exists(db):
        conn = sqlite3.connect(db)
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE recipes
                          (id INTEGER PRIMARY KEY AUTOINCREMENT,
                           name TEXT NOT NULL,
                           ingredients TEXT,
                           instructions TEXT,
                           notes TEXT,
                           image TEXT)''')
        conn.commit()
        conn.close()

# dunction to store system recipes into recipes.sqlite
def preload_systemRecipe():
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO recipes (name, ingredients, instructions, notes, image) VALUES (?, ?, ?, ?, ?)",
                   ('ABCDEFG', '1 cup of flour\n 1 glss of milk', 'Step1: add in `flour` \n Step2: add in `milk`', 'sfsfsafafdsa', 'system'))
    cursor.execute("INSERT INTO recipes (name, ingredients, instructions, notes, image) VALUES (?, ?, ?, ?, ?)",
                   ('HIJKLMN', '1 cup of cookies\n 1 glss of cookies', 'Step1: add in `cookies` \n Step2: add in `cookies`', 'sfsfsafafdsa', 'system'))
    cursor.execute("INSERT INTO recipes (name, ingredients, instructions, notes, image) VALUES (?, ?, ?, ?, ?)",
                   ('OPQRSTU', '1 cup of choco\n 1 glss of choco', 'Step1: add in `choco` \n Step2: add in `choco`', 'sfsfsafafdsa', 'system'))
    conn.commit()
    conn.close()


# Function to add a new recipe to the database
def add_recipe(name, ingredients, instructions, notes, image):
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO recipes (name, ingredients, instructions, notes, image) VALUES (?, ?, ?, ?, ?)",
                   (name, ingredients, instructions, notes, image))
    conn.commit()
    conn.close()

# Function to delete a recipe from the database
def delete_recipe(recipe_id):
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM recipes WHERE id=?", (recipe_id,))
    conn.commit()
    conn.close()

# Function to view all recipes from the database
def view_recipes():
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM recipes")
    recipes = cursor.fetchall()
    conn.close()
    return recipes


# Define WebSocket event handler
@socketio.on('connect')
def handle_connect():
    print('Client connected')
    socketio.emit('recipes', json.dumps(view_recipes()))

# Define WebSocket event handler to add a new recipe
@socketio.on('add_recipe')
def handle_add_recipe(data):
    data = json.loads(data)
    add_recipe(data['name'], data['ingredients'], data['instructions'], data['notes'])
    socketio.emit('recipes', json.dumps(view_recipes()))

# Define WebSocket event handler to delete a recipe
@socketio.on('delete_recipe')
def handle_delete_recipe(data):
    delete_recipe(data)
    socketio.emit('recipes', json.dumps(view_recipes()))

# Run the Flask application
if __name__ == '__main__':
    create_database()
    socketio.run(app, debug=True)
