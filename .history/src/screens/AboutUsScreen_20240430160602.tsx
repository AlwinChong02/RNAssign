import React from 'react';
import { Alert, Button, Linking, StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const openFbURL = async () => {
    const url = 'https://www.facebook.com/UTARnet/?locale=ms_MY'
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
        await Linking.openURL(url); // It will open the URL on browser.
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
}

const openInstaURL = async () => {
    const url = 'https://www.instagram.com/utarnet1/'
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
        await Linking.openURL(url); // It will open the URL on browser.
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
}

const openYtbURL = async () => {
    const url = 'https://www.youtube.com/@UtarEduMy'
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
        await Linking.openURL(url); // It will open the URL on browser.
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
}


const App = () => {
    return (
        <ScrollView style={{ marginTop: 5, flex: 1, backgroundColor: 'white' }}>
            <View style={{ padding: 10 }}>
                <View style={{ padding: 10, borderColor: "black", borderWidth: 1, borderRadius: 10 }}>
                    <Image source={require('../img/UTAR.png')} style={{ width: 240, height: 120, alignSelf: 'center' }} />
                    <Text style={styles.titleText}>Universiti Tunku Abdul Rahman (UTAR)</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.descriptionText}>
                        Welcome to UTAR, your go-to recipe guide and food app! Whether you're a beginner or a seasoned chef, UTAR offers a diverse range of recipes, cooking tips, and culinary inspiration. Our mission is to simplify cooking, spark creativity, and foster a love for good food. Join us on a flavorful journey with UTAR today!
                    </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.urlContainer}>
                        <Ionicons name='logo-facebook' size={40} color="blue" paddingHorizontal={20} marginRight={30} />
                        <Button
                            title="https://www.facebook.com/"
                            onPress={openFbURL}
                            color="grey"
                        />
                    </View>
                    <View style={styles.urlContainer}>
                        <Ionicons name='logo-instagram' size={40} color="#cd486b" paddingHorizontal={20} marginRight={30} />
                        <Button
                            title="https://www.instagram.com/"
                            onPress={openInstaURL}
                            color="grey"
                        />
                    </View>
                    <View style={styles.urlContainer}>
                        <Ionicons name='logo-youtube' size={40} color="red" paddingHorizontal={20} marginRight={30} />
                        <Button
                            title="https://www.youtube.com/"
                            onPress={openYtbURL}
                            color="grey"
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    urlContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    descriptionText: {
        fontSize: 15,
        textAlign: 'justify',
        padding: 15,
    },

});

export default App;