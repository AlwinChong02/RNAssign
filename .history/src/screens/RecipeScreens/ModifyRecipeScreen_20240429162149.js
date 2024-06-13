import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const ModifyRecipeScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const db = SQLite.openDatabase(
            { name: 'recipes.db', location: 'default', createFromLocation: '~recipes.db' },
            () => { console.log('Database opened successfully'); },
            error => { console.error('Failed to open database:', error); }
        );

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM recipes',
                [],
                (_, { rows }) => {
                    const loadedRecipes = [];
                    for (let i = 0; i < rows.length; i++) {
                        loadedRecipes.push(rows.item(i));
                    }
                    setRecipes(loadedRecipes);
                },
                error => {
                    console.error('Failed to load recipes:', error);
                    Alert.alert('Error', 'Failed to load recipes.');
                }
            );
        });
    }, []);
  

   

    const deleteRecipe = async (id) => {
        const db = SQLite.openDatabase(
            { name: 'recipes.db', location: 'default', createFromLocation: '~recipes.db' },
            () => { console.log('Database opened successfully'); },
            error => { console.error('Failed to open database:', error); }
        );

        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM recipes WHERE id = ?',
                [id],
                () => {
                    const filteredRecipes = recipes.filter(recipe => recipe.id !== id);
                    setRecipes(filteredRecipes);
                    Alert.alert('Success', 'Recipe deleted successfully');
                },
                error => {
                    console.error('Failed to delete recipe:', error);
                    Alert.alert('Error', 'Failed to delete recipe.');
                }
            );
        });
    };

    const editRecipe = (recipe) => {
        navigation.navigate('EditRecipeScreen', { recipe });
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => editRecipe(item)}>
                    <Text style={styles.editWord}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecipe(item.id)}>
                    <Text style={styles.deleteWord}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
 
        <View style={styles.container}>
            <Text style={styles.mainTitle}> Recipes Available </Text>
            <FlatList
                data={recipes}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text>No recipes found. Try adding some!</Text>}
            />
        </View>
    
    );
};

const styles = StyleSheet.create({
    container:{
        borderColor: 'black',
        marginBottom:40,
    },
    itemContainer: {
        padding: 20,
        margin: 5,
        borderRadius:30,
        border:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 2,
       
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    mainTitle:{
        fontSize: 30,
        left: 75,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    editButton:{
        borderRadius: 30,
        width: 50,
        height:40,
        alignContent: 'center',
        left:2,
        backgroundColor: '#00BFFF',
        marginRight: 8,
    },
    editWord:{
        fontSize: 20,
        left: 8,
        top: 5,
        color: 'white',
    },
    deleteButton:{
        backgroundColor: "#ff6347",
        borderRadius: 30,
        width: 80,
        height:40,
        left:5,
        marginRight: 4,
    },
    deleteWord:{
        fontSize: 20,
        left: 11,
        top: 5,
        color: 'black',
    },
});

export default ModifyRecipeScreen;
