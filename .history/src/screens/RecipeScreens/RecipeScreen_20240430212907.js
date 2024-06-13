import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeScreen = ({ route }) => {
    if (!route || !route.params) {
        return <Text>Error: No route parameters provided</Text>;
    }


    const {recipeId} = route.params;
    const [recipeData, setRecipeData] = useState();

    const db = SQLite.openDatabase(
        { name: 'recipes.db',
        // location: 'default',
        createFromLocation: '~recipes.db'
    },
        () => { console.log('Database opened successfully'); },
        error => { console.error('Failed to open database:', error); }
    );

    // useEffect(() => {

    //         const db = SQLite.openDatabase(
    //             { name: 'recipes.db', createFromLocation: '~recipes.db' },
    //             () => { console.log('Database opened successfully'); },
    //             error => { console.error('Failed to open database:', error); }
    //         );

            
    //     db.transaction(tx => {
    //         tx.executeSql(
    //             'SELECT * FROM recipes WHERE id = ?',
    //             [recipeId],
    //             (_, { rows }) => {
    //                 const recipe = rows.item(0);
    //                 setRecipeData(recipe);
    //             },
    //             error => {
    //                 console.error('Failed to fetch recipe:', error);
    //                 Alert.alert('Error', 'Failed to fetch recipe data.');
    //             }
    //         );
    //     });
    // }, []);
    useEffect(() => {


        if (recipeId) {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM recipes WHERE id = ?',
                    [recipeId],
                    (_, { rows }) => {
                        if (rows.length > 0) {
                            const recipe = rows.item(0);
                            setRecipeData(recipe);
                        } else {
                            // Handle the case where no data is returned
                            Alert.alert('Error', 'No recipe found.');
                        }
                    },
                    error => {
                        console.error('Failed to fetch recipe:', error);
                        Alert.alert('Error', 'Failed to fetch recipe data.');
                    }
                );
            });
        }
    }, [recipeId]);  // Adding recipeId as a dependency to useEffect

    const handleDownload = async (recipeData) => {
        try {
            const recipeToSave = {
                id: recipeData.id,
                name: recipeData.name,
                image: recipeData.image,
                ingredients: JSON.parse(recipeData.ingredients),
                instructions: recipeData.instructions
            };

            const downloadedRecipesString = await AsyncStorage.getItem('downloadedRecipe');
            const downloadedRecipes = downloadedRecipesString ? JSON.parse(downloadedRecipesString) : [];
            const isRecipeDownloaded = downloadedRecipes.some(recipe => recipe.id === recipeToSave.id);

            if (isRecipeDownloaded) {
                // Recipe is already downloaded, show alert
                Alert.alert('Warning', 'This recipe is already downloaded. If you wish to download the latest recipe, Please delete it in downloaded page.');
            } else {
                // Recipe is not downloaded, add it to the downloaded recipes list
                downloadedRecipes.push(recipeToSave);
                await AsyncStorage.setItem('downloadedRecipe', JSON.stringify(downloadedRecipes));
                Alert.alert('Success', 'Recipe downloaded successfully!');
            }
        } catch (error) {
            console.error('Failed to download recipe:', error);
            Alert.alert('Error', 'Failed to download recipe. Please try again.');
        }
    };

    if (!recipeData) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView>
            <>
                <Image source={{ uri: recipeData.image }} style={styles.image} />
                <Text style={styles.recipeTitle}>{recipeData.name}</Text>
                <View style={styles.container}>


                    <View style={styles.box}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        <View style={styles.line}></View>
                        {JSON.parse(recipeData.ingredients).map((ingredient, index) => (
                            <Text key={index} style={styles.ingredients}>{index + 1}. {ingredient.name} {ingredient.measurement}</Text>
                        ))}
                    </View>

                    <View style={styles.box}>
                        <Text style={[styles.sectionTitle, { color: '#8B4513' }]}>Instructions</Text>
                        <View style={styles.line}></View>
                        <Text style={styles.instructions}>{recipeData.instructions}</Text>
                    </View>

                    <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(recipeData)}>
                        <Text style={styles.downloadText}>Download Recipe</Text>
                    </TouchableOpacity>
                </View>
            </>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    image: {
        width: '100%',
        height: 300,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    recipeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        left: 15,
        backgroundColor: '#F8F8FF',
        color: '#000000',
    },
    box: {
        flex: 1,
        padding: 5,
        margin: 10,
        border: 1,
        borderWidth: 1,
        borderRadius: 15,
    },
    sectionTitle: {
        color: '#997a00',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 100,
        marginBottom: 8,
    },

    ingredients: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 1,
        marginBottom: 1,
    },
    instructions: {
        fontSize: 20,
        marginTop: 10,
        marginHorizontal: 10,
        textAlign: 'justify',
    },
    downloadButton: {
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'gray',
        marginLeft: 10,
        marginBottom: 10,
    },
    downloadButton: {
        border: 2,
        borderRadius: 30,
        height: 35,
        backgroundColor: '#00FFFF',
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,

    },
    downloadText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 3,
    }
});

export default RecipeScreen;
