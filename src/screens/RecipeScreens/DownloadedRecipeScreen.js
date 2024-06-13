import React, { useEffect, useState } from 'react';
import { TouchableOpacity,Alert,View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DownloadedRecipesScreen = () => {
    const [downloadedRecipe, setDownloadedRecipe] = useState([]);

    useEffect(() => {
        const fetchDownloadedRecipes = async () => {
            try {
                const downloadedRecipesString = await AsyncStorage.getItem('downloadedRecipe');
                const recipes = downloadedRecipesString ? JSON.parse(downloadedRecipesString) : [];
                setDownloadedRecipe(recipes);
            } catch (error) {
                console.error('Failed to load downloaded recipes:', error);
                Alert.alert('Error', 'Failed to load downloaded recipes.');
            }
        };

        fetchDownloadedRecipes();
    }, []);
    const deleteRecipe = async (id) => {
        const newRecipes = downloadedRecipe.filter(recipe => recipe.id !== id);
        await AsyncStorage.setItem('downloadedRecipe', JSON.stringify(newRecipes));
        setDownloadedRecipe(newRecipes);
        Alert.alert('Success', 'Recipe deleted successfully');
    };
    const clearDownloadedRecipes = async () => {
        try {
            await AsyncStorage.removeItem('downloadedRecipe');
            setDownloadedRecipe([]);
            Alert.alert('Success', 'All downloaded recipes have been cleared.');
        } catch (error) {
            console.error('Failed to clear downloaded recipes:', error);
            Alert.alert('Error', 'Failed to clear downloaded recipes.');
        }
    };
    if (downloadedRecipe.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No downloaded recipes found.</Text>
            </View>
        );
    }
    
 

    return (
        <ScrollView style={styles.container}>
            {downloadedRecipe.map((recipe, index) => (
                
                <View key={index} style={styles.recipeContainer}>
                    <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                    <Text style={styles.recipeTitle}>{recipe.name}</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.sectionHeader}>Ingredients</Text>
                    {recipe.ingredients.map((ingredient, idx) => (
                        <Text key={idx} style={styles.ingredientText}>
                            {idx+1}. {ingredient.name} - {ingredient.measurement}
                        </Text>
                    ))}
                     <View style={styles.line}></View>
                    <Text style={styles.sectionHeader}>Instructions</Text>
                    <Text style={styles.instructionsText}>{recipe.instructions}</Text>
                    <TouchableOpacity style={styles.deleteButton} onPress={deleteRecipe}>
                        <Text style={styles.deleteText}>Delete Recipe</Text>
                    </TouchableOpacity>
               </View>
              
            ))}
              
            <TouchableOpacity style={styles.clearAllButton} onPress={clearDownloadedRecipes}>
                <Text style={styles.clearAllText}>Clear All </Text>
            </TouchableOpacity>
    
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    downloadRecipeContainer:{
        border:1,
        borderWidth:2,

    },
    recipeContainer: {
        marginBottom: 20,
        border:1,
        borderWidth:2,
        borderRadius:30,
    },
    recipeImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
        marginLeft:80,
    },
    recipeTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        marginLeft: 20,
    },
    ingredientText: {
        fontSize: 16,
        marginBottom: 1,
        marginLeft:5,
    },
    instructionsText: {
        fontSize: 16,
        marginBottom:20,
        marginLeft:5,
    },
    sectionHeader:{
        fontSize:17,
        marginBottom:10,
        marginLeft:10,
        fontWeight: 'bold',
    },
    line:{
        flex: 1,
        height: 1,
        backgroundColor: 'gray',
        marginLeft: 1,
        marginBottom:10,
    },
    deleteButton:{
        display: 'flex',
        alignItems: "center",
        alignContent: 'center',
        marginBottom: 20,
        margin:20,
        height:40,
        marginTop: 20,
        border: 2,
        borderWidth:2,
        borderRadius:30,
        backgroundColor: '#A52A2A',
    },
    deleteText:{
        fontSize:20,
        color: 'white',
        top: 3,
    },
    clearAllButton:{
        display: 'flex',
        alignItems: "center",
        alignContent: 'center',
        marginBottom: 70,
        height:40,
        marginTop: 20,
        border: 2,
        borderWidth:2,
        borderRadius:30,
        backgroundColor: '#F0F8FF',
    },  
    clearAllText:{
        fontSize:25,
    }
});

export default DownloadedRecipesScreen;
