import React, { useEffect } from "react";
import { Text, View, FlatList, Button, Image } from "react-native";
import SearchBar from "./SearchRecipeScreen";
import io from 'socket.io-client';

var socRecipe = io('http://localhost:5000/recipe', { transports: ['websocket'] });


// implement a seach bar in the home screen and scrollable list of photos of recipes
const HomeScreen = ({ route, navigation }: any) => {

    // store all recipes data
    const [recipes, setRecipes] = React.useState<any[]>([]);

    const recipeData = [
        { key: 'Recipe 1', value: 'recipe 1', image: 'https://reactnative.dev/img/tiny_logo.png'},
        { key: 'Recipe 2', value: 'recipe 2', image: 'https://reactnative.dev/img/tiny_logo.png'},
        { key: 'Recipe 3', value: 'recipe 3', image: 'https://reactnative.dev/img/tiny_logo.png'},
    ];


    useEffect(() => {
        socRecipe.on('send_systemRecipe', (data: any) => {
            setRecipes(data);
        });
        socRecipe.emit('get_systemRecipe', 'get system recipe');
    }, []);

    return (
        <>
            <View style={styles.container}>
                <Text style={{ fontSize: 30, color: 'black', top: 10, bottom: 10 }}
                >Welcome to Recipe Guide App </Text>
            </View>
            <View style={{

                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                top: 10,
                borderRadius: 10,
                left: 15,
                right: 15,
                height: 50,
            }}>
            <FlatList
                data={recipeData}
                renderItem={({ item }) =>
                    <View style= {{flexDirection: 'row',
                                             top: 10, 
                                             bottom: 10,
                                             padding: 20,
                                             margin: 5,
                                             borderRadius: 10,
                                             borderColor: 'black',
                                             borderWidth: 1,
                                             alignContent: 'center',
                                             }}>
                        <Text style={{
                            fontSize: 20,
                            color: 'black',
                            fontWeight: 'bold',
                            alignItems: 'center',
                        }}>{item.key}
                        </Text>
                        <Image source={{ uri: item.image }} style={{ width: 200, height: 200, alignSelf:'flex-end' }}></Image>
                    </View>}
                style={{
                    backgroundColor: 'white',
                    top: 20,
                    borderRadius: 10,
                    left: 15,
                    right: 15,
                    //height: 50,

                }}
                
            />
            </View>

            <View style={{

                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 50, color: 'black' }}>Home</Text>
            </View>
        </>
    );
};

const styles = {
    container: {
        shadowColor: '#000',


    },
};

export default HomeScreen;