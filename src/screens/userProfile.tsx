import React, { useState, useEffect, Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
let config = require('../../config');
const profile = require("../img/profile.png");
import AppButton from '../../AppButton';

export default function Profile({ navigation, route }: any) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [oldPassword, setOldPassword] = React.useState(null);
    const [newPassword, setNewPassword] = React.useState(null);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        validateUser();
        const userEmail = route.params?.email;
    }, [])

    const validateUser = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        let user = JSON.parse(value);
                        setName(user.Name);
                        setEmail(user.Email);
                        setPhone(user.Phone);
                        setPassword(user.Password);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('UserData');
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleChange = () => {

        if (oldPassword == null || newPassword == null) {
            Alert.alert('Warning', 'Please fill in all the particulars.');
            return;
        }

        if (oldPassword != password) {
            Alert.alert(
                'Error',
                'Incorrect old password. Please try again.'
            );

            setOldPassword('');
            setNewPassword('');
        }
        else {
            let url = config.settings.serverUserPath + '/api/users/' + email;

            fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    password: newPassword,
                    email: email,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        Alert.alert('Error in updating the password: ', response.status.toString());
                        throw Error('Error in updating the password: ' + response.status);
                    }

                    return response.json()
                })
                .then((responseJson) => {
                    if (responseJson.affected > 0) {
                        Alert.alert('Password Successfully Changed');

                        saveUser('');

                        setOldPassword('');
                        setNewPassword('');
                        setVisible(false);
                    }
                    else {
                        Alert.alert('Error in changing password.');
                        setVisible(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const saveUser = async () => {
        try {
            var theUser = {
                Name: name,
                Email: email,
                Phone: phone,
                Password: newPassword,
            }
            await AsyncStorage.setItem('UserData', JSON.stringify(theUser));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = () => {
        let url = config.settings.serverUserPath + '/api/users/' + email; 
      
        fetch(url, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((response) => {
          if (!response.ok) {
            Alert.alert('Error', response.status.toString());
            throw Error('Error: ' + response.status);
          }else{
            Alert.alert('User Deleted');
          }
      
          return response.json();
        }).then((responseJson) => {
          if (responseJson.affected > 0) {
            navigation.navigate('Login');
          } else {
            Alert.alert('Error deleting user');
          }
        })
          .catch((error) => {
            console.error(error);
            Alert.alert('Error', 'Failed to delete user account.');
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={profile}
                />
            </View>
            <Text style={styles.changeAvatarButtonText}>Profile</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Name: </Text>
                <Text style={styles.input1}>
                    {name}
                </Text>
                <Text style={styles.label}>Email: </Text>
                <Text style={styles.input1}>
                    {email}
                </Text>
                <Text style={styles.label}>Phone Number:</Text>
                <Text style={styles.input1}>
                    {phone}
                </Text>
            </View>

            <View style={styles.ontainer}>
                <AppButton title="Log out" onPress={logout} />
            </View>
            <View style={styles.appButtonContainer}>
                <AppButton title="Change Password" onPress={showDialog} />
            </View>
            <View style={styles.appButtonContainer}>
                <AppButton title="Delete Account" onPress={deleteUser} />
            </View>

            <Dialog.Container visible={visible}>
                <Dialog.Title>Change Password</Dialog.Title>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setOldPassword(value)}
                    value={oldPassword}
                    placeholder="Current Password"
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setNewPassword(value)}
                    value={newPassword}
                    placeholder="New Password"
                    secureTextEntry={true}
                />
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Change Password" onPress={handleChange} />
            </Dialog.Container>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5f1ee',
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 20,
        color: "red"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeAvatarButtonText: {
        color: '#1E90FF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logOutButton: {
        position: 'absolute',
        bottom: '27%',
        width: '26%',
        height: '12%',
        left: '13%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePasswordButton: {
        position: 'absolute',
        bottom: '27%',
        width: '26%',
        height: '12%',
        right: '18%',
        justifyContent: 'center',
        textAlign: 'center', textAlignVertical: 'center',
    },
    deleteButton: {
        position: 'absolute',
        bottom: '16%',
        width: '28%',
        height: '12%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: "#1E90FF",
        height: 50,
        width: 150,
        borderColor: "gray",
        borderRadius: 200,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonDelete: {
        backgroundColor: "red",
        height: 50,
        width: 200,
        borderColor: "gray",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    avatarContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    label: {
        marginTop: 20,
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    input1: {
        borderColor: '#ccc',
        color: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    form: {
        width: '80%',
    },
     appButtonContainer: {
        // Style the container for the AppButton component if needed
        marginTop: 20,
        alignItems: 'center',
    },
});