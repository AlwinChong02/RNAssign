import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-storage';

const EditRecipeScreen = ({ route, navigation }) => {
    const { recipe } = route.params.recipe;
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [errors, setErrors] = useState({ name: false, instructions: false, ingredients: [] });

    const db = SQLite.openDatabase(
        { name: 'recipes.db', 
        // location: 'default',  // the location field is 
        createFromLocation: '~recipes.db' 
    },
        () => { console.log('Database opened successfully'); },
        error => { console.error('Failed to open database:', error); }
    );

    useEffect(() => {
        setName(recipe.name);
        setIngredients(JSON.parse(recipe.ingredients || '[]'));  // Ensure ingredients are parsed correctly
        setInstructions(recipe.instructions);
        setImageUri(recipe.image);
    }, [recipe]);

    const handleIngredientChange = (index, key, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][key] = value;
        setIngredients(updatedIngredients);
    };

    const pickImage = () => {
        ImagePicker.launchImageLibrary({}, response => {
            if (response.assets) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const saveChanges = () => {
        const newErrors = { name: !name, instructions: !instructions, ingredients: [] };

        const ingredientErrors = ingredients.map(ingredient => !ingredient.name || !ingredient.measurement);
        newErrors.ingredients = ingredientErrors;

        setErrors(newErrors);

        if (!name || !instructions || ingredientErrors.includes(true)) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        db.transaction(
            tx => {
                tx.executeSql(
                    'UPDATE recipes SET name = ?, ingredients = ?, instructions = ?, image = ? WHERE id = ?',
                    [name, JSON.stringify(ingredients), instructions, imageUri, recipe.id],
                    (_, result) => {
                        if (result.rowsAffected > 0) {
                            Alert.alert('Success', 'Recipe updated successfully', [{ text: 'OK', onPress: () => navigation.goBack() }]);
                        } else {
                            Alert.alert('Error', 'No rows were updated, please check the recipe exists.');
                        }
                    },
                    (txError) => {
                        console.error('Transaction Error:', txError);
                        Alert.alert('Transaction Error', txError.message);
                    }
                );
            },
            (error) => {
                console.error('Transaction Error:', error);
                Alert.alert('Database Error', `Failed to save changes: ${error.message}. Please try again.`);
            },
            () => {
                console.log('Update transaction successful');
            }
        );
    };
    

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}> Edit Recipe </Text>

             {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                   
            <View style={styles.titleContainer}>
                <TextInput
                    style={[styles.input, styles.recipeNameInput]}
                    placeholder= {errors.name ? 'Please enter recipe name' :"Insert Recipe Name"}
                    onChangeText={setName}
                    value={name}
                />
            
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadWord}>Upload photo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.box}>
                <Text style={styles.ingredientTitle}>Ingredients</Text>
                <View style={styles.line}></View>
                    {ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientsContainer}>
                            <Text style={styles.ingredientNo}> {index + 1}. </Text>
                            <TextInput
                                style={[styles.input, styles.ingredientNameInput]}
                                placeholder={errors.ingredients[index] ? 'Please enter name' : 'Ingredient Name'}
                                onChangeText={(value) => handleIngredientChange(index, 'name', value)}
                                value={ingredient.name}
                            />
                            <TextInput
                                style={[styles.input, styles.ingredientMeasurementInput]}
                                placeholder={errors.ingredients[index] ? 'Please enter value' : "Measurement/Size"}
                                onChangeText={(value) => handleIngredientChange(index, 'measurement', value)}
                                value={ingredient.measurement}
                            />
                        </View>
                    ))}
                

                </View>
                    <Text style={styles.instructionContainer}>Instructions</Text>
                    <TextInput
                        style={[styles.input, styles.instructionsInput]}
                        placeholder={errors.instructions ? 'Please enter instruction' : "Insert Instructions"}
                        onChangeText={setInstructions}
                        value={instructions}
                        multiline
                    />
               
               <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                    <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>        
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    ingredientsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
    },
    ingredientsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ingredientContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 30,
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
    instructionContainer:{
        fontSize: 20,
        marginLeft: 130,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop:10,
    },
    saveButton:{
        border:2,
        borderRadius: 30,
        height:35,
        backgroundColor:'#00FFFF',
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        
    },
    saveText:{
        fontSize:20,
        color: 'black',
        fontWeight: 'bold',
        marginTop:3,
    }
});

export default EditRecipeScreen;

