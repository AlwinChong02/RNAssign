import React, { useState, useEffect} from 'react';
import { Alert } from 'react-native';
import { Text, View, FlatList, Image, StyleSheet, TouchableNativeFeedback } from "react-native";
let config = require('../../config.js');

export function HomeScreen ({ navigation, route }:any) {
    const [fetching, setFetching] = useState(false);
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      getData();
    }, [])
  
    const getData = () => {
      let url = config.settings.serverRecipePath + '/api/recipes';
      setFetching(true);
  
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            Alert.alert('Error in fetching recipes', response.status.toString());
            throw Error('Error in fetching recipes: ' + response.status);
          }
          return response.json();
        })
        .then((recipes) => {
          console.log(recipes);
          setRecipes(recipes);
          setFetching(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    return (
        <View>
            <View style={styles.container}>
                <Text style={{ fontSize: 35, color: 'black', fontFamily: 'font1',justifyContent:'center',top:6}}>
                    Welcome to Recipe Guide App 
                </Text>
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    refreshing={fetching}
                    data={recipes}
                    renderItem={({ item }:any) => {
                        return (
                            <TouchableNativeFeedback
                                onPress={() => {
                                    navigation.navigate('FoodScreen', {id: item.id, name: item.name, image: item.image, ingredients: item.ingredients, instructions: item.instructions,notes: item.notes})
                                }}>
                                <View style={styles.recipeItem}>                           
                                    <Image source={{ uri: item.image }} style={styles.recipeImage}></Image>
                                    <View style={{margin:5,padding:5}}>
                                        <Text style={styles.recipeText}>{item.name}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        );
                    }}>
                    </FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        height:70
    },
    flatListContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 5,
        height: 570,
    },
    recipeItem: {
        marginTop: 10,
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: '#FEF8E0'
    },
    recipeText: {
        fontSize: 20,
        marginRight: 5,
        paddingLeft: 10,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'font1',
    },
    recipeImage: {
        width: 120,
        height: 120,
    },
});

export default HomeScreen;