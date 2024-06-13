import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//PagesScreen
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CustomRecipeScreen from './src/screens/CustomRecipeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import ViewFeedbackScreen from './src/screens/ViewFeedbackScreen';


//Sqlite
import SQLite from 'react-native-sqlite-storage';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SettingsStackScreen = () => { 
  return (
    <Stack.Navigator
      // screenOptions={{
      //   headerStyle: { backgroundColor: '#FFAA33' },
      //   headerTintColor: 'black',
      //   headerTitleStyle: { fontSize: 24 },
      // }}
    >
      {/* <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          title: 'About Us',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'User Profile',
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          title: 'Feedback',
        }}/>
      <Stack.Screen
        name="ViewFeedback"
        component={ViewFeedbackScreen}
        options={{
          title: 'View Feedback',
        }}/>
    </Stack.Navigator>
  );
}


// SQlite Database 
const openCallback = () => {
  console.log('database open success');
}
const errorCallback = (err: any) => {
  console.log('Error in opening the database: ' + err);
}


const App = ({ route, navigation }: any) => {

  //let db = SQLite.openDatabase({name: 'test.db', createFromLocation: 1}, openCallback, errorCallback);


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerBackgroundContainerStyle: { backgroundColor: 'orange' },
          headerStyle: { backgroundColor: 'orange', height: 70, },
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,

          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string | undefined;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Setting') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'CustomRecipe') {
              iconName = focused ? 'add-circle-outline' : 'add-circle';
              color = '#fe2c49';
              size = 70;
            } else if (route.name === 'AboutUs') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }
            return <Ionicons name={iconName || ''} size={size} color={color} />;
          },
          flexDirection: 'row',
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'white',
            borderTopWidth: 0,
            height: 70,
            bottom: 30,
            left: 15,
            right: 15,
            flexDirection: 'row',
            borderRadius: 28,
          },


        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="CustomRecipe" component={CustomRecipeScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
        {/* <Tab.Screen name="ViewFeedback" component={ViewFeedbackScreen} />
        <Tab.Screen name="AboutUs" component={AboutUsScreen} /> */}
        {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
        {/* <Tab.Screen name="Feedback" component={FeedbackScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
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
