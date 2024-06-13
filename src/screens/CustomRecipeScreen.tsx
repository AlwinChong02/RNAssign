import React, { useEffect, useRef } from 'react';
import {
    Text, View, StyleSheet,
    TextInput, Image, ScrollView,
    FlatList, Button, TouchableHighlight,
    Alert

} from 'react-native';
import {
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import type { recipe } from '../../type';
// import io from 'socket.io-client';


// var socRecipe = io('http://localhost:5000/', { transports: ['websocket'] });
//var socUser = io('http://localhost:5100/user', { transports: ['websocket'] });





export default function CustomRecipeScreen({ route, navigation }: any) {
    //const recipe = route.params.recipe;


    // for the recipe
    const [recipeName, setRecipeName] = React.useState();
    const [ingredients, setIngredients] = React.useState();
    const [instructions, setInstructions] = React.useState();
    const [notes, setNotes] = React.useState();
    const [image, setImage] = React.useState<any>();



    return (
        <>
            <SafeAreaView>
                <ScrollView style={{}}>
                    <View>
                        <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ width: 200, height: 200, alignSelf: 'center' }}

                        ></Image>
                        <Button title='Add Image' onPress={(input: any) => { 
                            setImage(input);
                        }}></Button>

                    </View>
                    <View style={{}}>
                        <Text style={styles.textName}>Name: </Text>
                        <TextInput onTextInput={(input: any) => {
                            setRecipeName(input);
                         }}
                            style={{
                                flex: 1,
                                fontSize: 20,
                                fontStyle: 'italic',
                                borderColor: 'orange',
                                borderWidth: 3,
                                borderRadius: 10,
                                left: 10,
                                width: 370,
                            }} >aaaaaaaaaaaaaaaaaaaa</TextInput>
                    </View>
                    <View style={{}}>
                        <Text style={styles.textBigContainer}>Ingredient: </Text>
                        <TextInput style={styles.textInputBigContainer} 
                        onTextInput={(input: any) => {
                            setIngredients(input);
                            }}>sdsfd</TextInput>

                    </View>
                    <View style={{ top: 20 }}>
                        <Text style={styles.textBigContainer}>Instructions: </Text>
                        <TextInput style={styles.textInputBigContainer}
                        onTextInput={(input: any) => {
                            setInstructions(input);
                        }}>sdsfd</TextInput>
                    </View>
                    <View style={{ top: 20, height: 60 }}></View>
                    <View>
                        <Text style={styles.textBigContainer}>Notes: </Text>
                        <TextInput style={styles.textInputBigContainer}
                        onTextInput={(input: any) => {
                            setNotes(input);
                        }}
                        >notesssssss</TextInput>
                    </View>
                    <View style={{ top: 20, height: 60 }}></View>
                    <TouchableHighlight
                        onPress={() => {
                            Alert.alert('Recipe Added');
                            navigation.navigate('Home');
                            //socRecipe.emit('add_recipe', { name: name, ingredients: ingredients, instructions: instructions, notes: notes, image: image });
                        }}
                        style={{
                            backgroundColor: 'orange',
                            borderRadius: 10,
                            width: 200,
                            height: 50,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: 20,
                        }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Recipe</Text>
                    </TouchableHighlight>
                    <View style={{ top: 20, height: 150 }}></View>

                </ScrollView>
            </SafeAreaView>
        </>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        left: 10,
    },
    textBigContainer: {
        fontSize: 20,
        fontWeight: 'bold',
        top: 10,
        left: 10,
        bottom: 10,

    },
    textInputBigContainer: {
        textAlignVertical: 'top',
        fontSize: 20,
        height: 200,
        fontStyle: 'italic',
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 10,
        width: 370,
        left: 10,
        top: 20,
        bottom: 20,
    },
});