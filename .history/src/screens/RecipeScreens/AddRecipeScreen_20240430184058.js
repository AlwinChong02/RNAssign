import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import * as ImagePicker from 'react-native-image-picker';

const AddRecipeScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', measurement: '' }]);
    const [instructions, setInstructions] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [errors, setErrors] = useState({ name: false, instructions: false, ingredients: [] });

    // Initialize SQLite database
    const db = SQLite.openDatabase({
        name: 'recipes.db',
        // location: 'default',
        // createFromLocation: '~recipes.db',
    },
    () => { console.log('Database opened successfully'); },
    error => { console.error('Failed to open database:', error); }
    );

    const handleSave = () => {
        const newRecipe = {
            name: name,
            ingredients: JSON.stringify(ingredients),
            instructions: instructions,
            //image: imageUri,
        };
        const newErrors = { name: !name, instructions: !instructions, ingredients: [] };

        const ingredientErrors = ingredients.map(ingredient => !ingredient.name || !ingredient.measurement);
        newErrors.ingredients = ingredientErrors;

        setErrors(newErrors);

        if (!name || !instructions || ingredientErrors.includes(true)) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS recipes (' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'name TEXT,' +
                'ingredients TEXT,' +
                'instructions TEXT,' +
                'image TEXT)',
                [],
                () => {
                    tx.executeSql(
                        'INSERT INTO recipes (name, ingredients, instructions, image) VALUES (?, ?, ?, ?)',
                        [newRecipe.name, newRecipe.ingredients, newRecipe.instructions, newRecipe.image],
                        (_, result) => {
                            Alert.alert('Recipe Added', 'Recipe successfully added');
                            navigation.goBack();
                        },
                        error => {
                            console.error('Failed to save recipe:', error);
                            Alert.alert('Error', 'Failed to save the recipe.');
                        }
                    );
                },
                error => {
                    console.error('Failed to create table:', error);
                    Alert.alert('Error', 'Failed to create table.');
                }
            );
        });
    };

    const pickImage = () => {
        ImagePicker.launchImageLibrary({}, response => {
            if (response.assets) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const handleIngredientChange = (index, key, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][key] = value;
        setIngredients(newIngredients);
    };

    const addIngredientField = () => {
        setIngredients([...ingredients, { name: '', measurement: '' }]);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}> Create New Recipe </Text>

                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

                <View style={styles.titleContainer}>
                    <TextInput
                        style={[styles.input, styles.recipeNameInput]}
                        placeholder= {errors.name ? 'Please enter recipe name' : "Insert Recipe Name"}
                        onChangeText={setName}
                        value={name}
                    />
          
                    <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                        <Text style={styles.uploadWord}> Upload photo </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.box}>
                    <Text style={styles.ingredientTitle}>Ingredient</Text>
                    <View style={styles.line}></View>
                    {ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientContainer}>
                            <Text style={styles.ingredientNo}> {index + 1}. </Text>
                            <TextInput
                                style={[styles.input, styles.ingredientNameInput]}
                                placeholder={errors.ingredients[index] ? 'Please enter name' : 'Ingredient Name'}
                                onChangeText={value => handleIngredientChange(index, 'name', value)}
                                value={ingredient.name}
                            />
                           
                            <TextInput
                                style={[styles.input, styles.ingredientMeasurementInput]}
                                placeholder={errors.ingredients[index] ? 'Please enter value' : "Measurement/Size"}
                                onChangeText={value => handleIngredientChange(index, 'measurement', value)}
                                value={ingredient.measurement}
                            />
                         
                        </View>
                    ))}

                    <TouchableOpacity style={[styles.addIngredientButton]} onPress={addIngredientField}>
                        <Text style={styles.addIngredientButtonText}>Add More Ingredient</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={[styles.input, styles.instructionsInput]}
                    placeholder={errors.instructions ? 'Please enter instruction' : "Insert Instructions"}
                    onChangeText={setInstructions}
                    value= {instructions}
                    multiline
                />
     
                <TouchableOpacity style={styles.saveRecipe} onPress={handleSave}>
                    <Text style={styles.saveRecipeText}>Save Recipe</Text>
                </TouchableOpacity>
               
            </View>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        alignItems: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 250,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    
    instructionsInput: {
        height: 250,
        width: 350,
        borderRadius:15,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: 'black',
    },
    recipeNameInput: {
        marginRight: 10,
        borderRadius:15,
        marginTop:10,
        borderColor: 'black',
    },

    uploadButton: {
        backgroundColor: '#6495ED',
        borderRadius: 30,
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:10,
    },
    uploadWord:{
        color: "white",
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    ingredientTitle:{
        fontSize: 20,
        marginLeft: 130,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop:10,
    },

    addIngredientButton: {
        borderWidth: 1,
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        borderRadius: 30,
        paddingVertical: 10,
        marginBottom: 20,
        marginLeft:10,
        marginRight:20,
        alignItems: 'center',
    },
    addIngredientButtonText: {
        color: 'white',
        fontSize: 17,
    },
    ingredientContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
    },
    ingredientNameInput: {
        flex: 1,
        marginRight: 4,
        borderRadius:15,
    },
    ingredientMeasurementInput: {
        flex: 1,
        marginRight:10,
        borderRadius:15,
    },
    ingredientNo:
    {
        marginTop:10,
        fontSize: 15,
        marginRight: 8,
        marginLeft:4,
    },
    box: {
        border: 1,
        borderWidth: 1,
        borderRadius: 30,
        marginBottom:30,
        borderColor: 'black',
    },
    line:{
        flex: 1,
        height: 1,
        backgroundColor: 'gray',
        marginLeft: 10,
        marginBottom:10,
    },
    saveRecipe:{
        border:1,
  
        height:40,
        borderRadius:30,
        marginBottom:15,
        marginTop:15,
        backgroundColor: '#00FFFF',
    },
    saveRecipeText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        left: 120,
        top:6,
    },
});

export default AddRecipeScreen;

