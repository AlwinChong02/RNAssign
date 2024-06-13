
import React from 'react';
import { Alert, Button, Linking, StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'


const openMapURL = (latitude: any,longitude: any) => {
    console.log('Open Map');
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
}


const facebookURL = 'https://www.facebook.com/UTARnet/?locale=ms_MY';
const instaURL = 'https://www.instagram.com/utarnet1/';
const ytbURL = 'https://www.youtube.com/@UtarEduMy';

type OpenURLButtonProps = {
    url: string;
    children: string;
};

const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
    const handlePress = async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
    }
    };

    return <Button title={children} onPress={handlePress} color="grey" />;
};

const AboutUsScreen = () => {
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
                        <OpenURLButton url={facebookURL}>https://www.facebook.com/   </OpenURLButton>
                    </View>
                    <View style={styles.urlContainer}>
                        <Ionicons name='logo-instagram' size={40} color="#cd486b" paddingHorizontal={20} marginRight={30} />
                        <OpenURLButton url={instaURL}>https://www.instagram.com/</OpenURLButton>
                    </View>
                    <View style={styles.urlContainer}>
                        <Ionicons name='logo-youtube' size={40} color="red" paddingHorizontal={20} marginRight={30} />
                        <OpenURLButton url={ytbURL}>https://www.youtube.com/     </OpenURLButton>
                    </View>
                    <View style={{marginTop:20}}>
                        <Button title="Open Map" 
                        onPress={() => { openMapURL(3.0402, 101.7944) }} ></Button>
                    </View>
                    <View style={{ top: 20, height: 150 }}></View>
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




export default AboutUsScreen;

