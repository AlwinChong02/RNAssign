import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Type'; 
import { ScrollView } from 'react-native-gesture-handler';

export type Props = StackScreenProps<RootStackParamList, 'FoodScreen'>;

const FoodScreen = ({ route,navigation}:any) => { // Ensure Props type is used for route
    const { id, name, ingredients, instructions, notes, image } = route.params; 

  return (
    <ScrollView style ={{margin:20}}>
      <View style ={styles.border}>
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.recipeImage} />
          <Text style={styles.recipeName}>{name}</Text>
        </View>
        <View>
          <Text style={styles.recipeTitle}>Ingredients: </Text>
          <Text style={styles.recipeDescription}>{ingredients}</Text>
          <Text style={styles.recipeTitle}>Instructions: </Text>
          <Text style={styles.recipeDescription}>{instructions}</Text>
          <Text style={styles.recipeTitle}>Notes: </Text>
          <Text style={styles.recipeDescription}>{notes}</Text>
        </View>
       </View>
      <View style={{top: 20, height: 110}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeImage: {
    marginTop: 10,
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  recipeName: {
    fontSize: 25,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  recipeDescription: {
    marginBottom: 20,
    fontSize: 16,
    color: 'black',
  },
  recipeTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  border:{
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
  }
});

export default FoodScreen;
