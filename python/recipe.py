import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB = 'recipe.sqlite'

app = Flask(__name__)

def recipes_get_row_as_dict(row):
    return {
        'recipe_id': row[0],
        'name': row[1],
        'ingredients': row[2],
        'instructions': row[3],
        'notes': row[4],  # Include notes in the response
        'image': row[5]  

    }

# get all recipes (home page)
@app.route('/api/recipes', methods=['GET'])
def get_all_recipes():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM recipe')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = recipes_get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

# get choose recipes (home page)
@app.route('/api/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM recipe WHERE recipe_id=?', (recipe_id,))
    row = cursor.fetchone()
    db.close()

    if row:
        return jsonify(recipes_get_row_as_dict(row)), 200
    else:
        return jsonify(None), 404

# add new recipes
@app.route('/api/recipes', methods=['POST'])
def store_recipe():
    if not request.json:
        abort(404)

    new_recipe = (
        request.json.get('name'),
        request.json.get('ingredients'),
        request.json.get('instructions'),
        request.json.get('notes'),
        request.json.get('image'),
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO recipe(name, ingredients, instructions, notes, image)
        VALUES(?,?,?,?,?)
    ''', new_recipe)

    recipe_id = cursor.lastrowid
    db.commit()
    db.close()

    return jsonify({'recipe_id': recipe_id, 'affected': 1}), 201

# update recipes
@app.route('/api/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    if not request.json:
        abort(400)

    updated_recipe = (
        request.json.get('name'),
        request.json.get('ingredients'),
        request.json.get('instructions'),
        request.json.get('notes'),
        request.json.get('image'),
        recipe_id,
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE recipe SET name=?, ingredients=?, instructions=?, notes=?,image=? WHERE recipe_id=?
    ''', updated_recipe)

    db.commit()
    db.close()

    return jsonify({'recipe_id': recipe_id, 'affected': 1}), 201

# delete recipes
@app.route('/api/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('DELETE FROM recipe WHERE recipe_id=?', (recipe_id,))
    affected_rows = cursor.rowcount
    db.commit()
    db.close()

    if affected_rows:
        return jsonify({'message': 'Recipe deleted successfully', 'affected': affected_rows}), 200
    else:
        return jsonify({'message': 'No recipe found with given ID', 'affected': affected_rows}), 404

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5001, type=int, help='port to listen on')
    args = parser.parse_args()
    app.run(host='0.0.0.0', port=args.port, debug=True)