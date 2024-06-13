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
import Dialog from 'react-native-dialog';
let config = require('../../config');
const profile = require("./assets/profile.png");


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

    // const syncUserData = async () => {
    //   try {
    //     await AsyncStorage.getItem('UserData');
    //     .then(value => {
    //       if (value != null) {
    //         let user = JSON.parse(value);
    //         setName(user.Name);
    //         setEmail(user.Email);
    //         setPhone(user.Phone);
    //         setPassword(user.Password);
    //       }
    //     } )
    //   } catch (error) {
    //     console.error('Failed to fetch user data:', error);
    //     Alert.alert('Error', 'Unable to load user data.');
    //   }
    // }
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(/api/users/ + userEmail);
    //     const { name, email, phone, password } = response.data;
    //     setName(name);
    //     setEmail(email);
    //     setPhone(phone);
    //     setPassword(password);
    //   } catch (error) {
    //     console.error('Failed to fetch user data:', error);
    //     Alert.alert('Error', 'Unable to load user data.');
    //   }
    // };


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

        if (oldPassword.length == 0 || newPassword.length == 0) {
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
            let url = config.settings.serverPath + '/api/users/' + email;

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
    }

    return (
        <View style={styles.container}>

            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={profile}
                /></View>
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

            <View style={styles.logOutButton}>
                <Pressable style={styles.button} onPress={logout}>
                    <Text style={styles.buttonText}>Log out</Text>
                </Pressable>
            </View>
            <View style={styles.changePasswordButton}>
                <Pressable style={styles.button} onPress={showDialog}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </Pressable>
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
        // textAlign: "top",
        //paddingVertical : 40,
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
    },
    logOutButton: {
        position: 'absolute',
        bottom: '1%',
        width: '28%',
        height: '12%',
        left: '15%',
        //backgroundColor: '#ff7da0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePasswordButton: {
        position: 'absolute',
        bottom: '1%',
        width: '28%',
        height: '12%',
        right: '15%',
        justifyContent: 'center',
        //alignItems: 'center',
        textAlign: 'center', textAlignVertical: 'center',
    },
    changePasswordText: {
        fontSize: 10,
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
        width: 100,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },
    avatarContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    label: {
        marginTop: 20,
    },
    input1: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    form: {
        width: '80%',
    },

});