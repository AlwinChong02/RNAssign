import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import {
  NavigationContainer,

} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from './src/customNavigator/BottomTab';
let SQLite = require('react-native-sqlite-storage');


// SQlite Database 
const openCallback = () => {
  console.log('database open success');
}
const errorCallback = (err: any) => {
  console.log('Error in opening the database: ' + err);
}



const Tab = createBottomTabNavigator();

const App = ({ route, navigation }: any) => {

  //let db = SQLite.openDatabase({name: 'test.db', createFromLocation: 1}, openCallback, errorCallback);




  return (
    //<SafeAreaView>
      <NavigationContainer>

        <BottomTab />
      </NavigationContainer>
    //</SafeAreaView>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default App;
