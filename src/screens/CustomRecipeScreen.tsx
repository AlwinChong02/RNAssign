import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {} from '@react-navigation/native';
let config = require('../../config.js');

export default function CustomRecipeScreen({route, navigation}: any) {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [notes, setNotes] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleAddRecipe = ( ) => {
    let url = config.settings.serverRecipePath + '/api/recipes' ;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: recipeName,
          ingredients: ingredients,
          instructions: instructions,
          notes: notes,
          image: imageURL
      }),
        }).then((response) => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error: ' + response.status);
        }
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.affected > 0) {
          setRecipeName('');
          setIngredients('');
          setInstructions('');
          setNotes('');
          setImageURL('');
          // Navigate back to the Home screen
          navigation.navigate('Home');
        } else {
          console.log('respond');
          console.log(responseJson.affected);
          Alert.alert('Error saving record');
        }
      })
      .catch(error => {
        console.error(error);
      });
    };

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textName}>Image URL(link): </Text>
          <TextInput
            style={styles.textInputContainer}
            onChangeText={(input) =>
              setImageURL(input)
            }
            value={imageURL}
            placeholder = 'example: https://rb.gy/fqsrfq'/>
        </View>

        <View style={styles.container}>
          <Text style={styles.textName}>Recipe Name: </Text>
          <TextInput
            underlineColorAndroid="transparent"
            onChangeText={(input) =>
              setRecipeName(input)
            }
            style={styles.textInputContainer}
            value={recipeName}
            placeholder = 'example: Pandan Leaf Chicken'>
          </TextInput>
        </View>
        
        <View style={styles.container}>
          <Text style={styles.textBigContainer}>Ingredients: </Text>
          <TextInput
            style={styles.textInputBigContainer}
            onChangeText={(input) =>
              setIngredients(input)
            }
            value={ingredients}
            placeholder = 'example: Chicken, Pandan Leaf'
            multiline={true}
          >
          </TextInput>
        </View>
        
        <View style={styles.container}>
        <View style={{top: 20, height: 10}}></View>
          <Text style={styles.textBigContainer}>Instructions: </Text>
          <TextInput
            style={styles.textInputBigContainer}
            onChangeText={(input) =>
              setInstructions(input)
            }
            value={instructions}
            placeholder = 'example: 1. Marinate the chicken. 2. ....'
            multiline={true}
          >
          </TextInput>
        </View>

        <View style={styles.container}>
        <View style={{top: 20, height:10}}></View>
          <Text style={styles.textBigContainer}>Notes: </Text>
          <TextInput
            style={styles.textInputBigContainer}
            onChangeText={(input) =>
              setNotes(input)
            }
            value={notes}
            placeholder = 'example: Serve with sauce.'
            multiline={true}
          >
          </TextInput>
        </View>
        
        <View style={{top: 20, height: 60}}></View>
        <TouchableHighlight
          onPress={() => {
            console.log("Recipe Name:", recipeName);
            handleAddRecipe();
          }}
          style={{
            backgroundColor: 'orange',
            borderRadius: 10,
            width: 200,
            height: 50,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Add Recipe</Text>
        </TouchableHighlight>
        <View style={{top: 20, height: 110}}></View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    left: 10,
  },
  textBigContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    top: 5,
    left: 10,
    bottom: 10,
  },
  textInputContainer: {
    fontSize: 20,
    fontStyle: 'italic',
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 10,
    width: 360,
    left: 10,
    top: 5,
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
    width: 360,
    left: 10,
    top: 8,
    bottom: 20,
  },
});