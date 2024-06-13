import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB = 'user.sqlite'

app = Flask(__name__)

def user_get_row_as_dict(row):
    return {
        'user_id': row[0],
        'name': row[1],
        'email': row[2],
        'phone': row[3],
        'password': row[4],
    }

@app.route('/api/users/<email>', methods=['GET'])
def get_user(email):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE email=?', (email,))
    row = cursor.fetchone()
    db.close()

    if row:
        return jsonify(user_get_row_as_dict(row)), 200
    else:
        return jsonify(None), 200

@app.route('/api/users', methods=['POST'])
def store_user():
    if not request.json:
        abort(404)

    new_user = (
        request.json.get('name'),
        request.json.get('email'),
        request.json.get('phone'),
        request.json.get('password'),
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO users(name, email, phone, password)
        VALUES(?,?,?,?)
    ''', new_user)

    user_id = cursor.lastrowid
    db.commit()
    db.close()

    return jsonify({'user_id': user_id, 'affected': 1}), 201

@app.route('/api/users/<email>', methods=['PUT'])
def update_user(email):
    if not request.json:
        abort(400)

    if request.json.get('email') != email:
        abort(400)

    update_user = (
        request.json.get('name'),
        request.json.get('phone'),
        request.json.get('password'),
        email,
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE users SET name=?, phone=?, password=? WHERE email=?
    ''', update_user)

    db.commit()
    db.close()

    return jsonify({'user_email': email, 'affected': 1}), 201

@app.route('/api/users/<email>', methods=['DELETE'])
def delete_user(email):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('DELETE FROM users WHERE email=?', (email,))
    affected_rows = cursor.rowcount
    db.commit()
    db.close()

    if affected_rows:
        return jsonify({'message': 'User deleted successfully', 'affected': affected_rows}), 200
    else:
        return jsonify({'message': 'No user found with given email', 'affected': affected_rows}), 404

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    app.run(host='0.0.0.0', port=args.port, debug=True)

