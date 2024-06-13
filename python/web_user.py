from flask import Flask
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('connect', namespace='/user')
def handle_connect_user():
    print('Client connected to user namespace')

@socketio.on('disconnect', namespace='/user')
def handle_disconnect_user():
    print('Client disconnected from user namespace')

@socketio.on('client_send_user', namespace='/user')
def handle_client_send_user(user):
    print('received json: ' + str(user))
    emit('server_response_user', user)

@socketio.on('client_receive_user', namespace='/user')
def handle_client_receive_user(user):
    print('received json: ' + str(user))
    #emit the data to client
    emit('server_response_user', user)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5100, debug=True)