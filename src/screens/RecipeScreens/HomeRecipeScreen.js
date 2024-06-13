import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

import SQLite from 'react-native-sqlite-storage';


const HomeScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // To manage loading state

    useEffect(() => {
        const db = SQLite.openDatabase(
            {
                name: 'recipes.db',
                // location: 'default',
                createFromLocation: '~recipes.db',
            },
            () => {
                console.log('Database opened successfully');
                // Fetch recipes from the database
                db.transaction(tx => {
                    tx.executeSql(
                        'SELECT * FROM recipes',
                        [],
                        (tx, results) => {
                            const len = results.rows.length;
                            const tempRecipes = [];
                            for (let i = 0; i < len; i++) {
                                const row = results.rows.item(i);
                                tempRecipes.push(row);
                            }
                            setRecipes(tempRecipes);
                            setIsLoading(false);
                        },
                        error => {
                            console.error('Failed to fetch recipes:', error);
                            setIsLoading(false);
                        }
                    );
                });
            },
            error => {
                console.error('Failed to open database:', error);
                setIsLoading(false);
            }
        );

      
    }, []);


    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!isLoading && recipes.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No recipes found. Try adding some!</Text>
                <Button title="Add Recipe" onPress={() => navigation.navigate('AddRecipeScreen')} />
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('RecipeScreen', { recipeId: item.id })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button title="Add Recipe" onPress={() => navigation.navigate('AddRecipeScreen')} />
            <FlatList
                data={recipes}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
             <Button title="Modify Recipe" onPress={() => navigation.navigate('ModifyRecipeScreen')} />
        
            <Button title="Downloaded recipe" onPress={() => navigation.navigate('DownloadedRecipeScreen')} />
       
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    summary: {
        fontSize: 14
    }
});

export default HomeScreen;
