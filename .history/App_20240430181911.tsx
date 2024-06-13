import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//Main Screens
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CustomRecipeScreen from './src/screens/CustomRecipeScreen';
import Profile from './src/screens/userProfile';
import AboutUsScreen from './src/screens/AboutUsScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import ViewFeedbackScreen from './src/screens/ViewFeedbackScreen';

//test
import HomeScreenV from './src/screens/HomeScreenV';

//Login and SignUp
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';


//type
// Define the types for your navigation stack
export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  //userProfile: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SettingsStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackgroundContainerStyle: { backgroundColor: 'orange' },
        headerStyle: { backgroundColor: 'orange', height: 70, },
        headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
      }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="ViewFeedback" component={ViewFeedbackScreen} />
    </Stack.Navigator>
  );
}


// Tab Navigation
const MainMenuScreen = () => {
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerBackgroundContainerStyle: { backgroundColor: 'orange' },
        headerStyle: { backgroundColor: 'orange', height: 70, },
        headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
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
      <Tab.Screen name="Home" component={HomeScreenV} />
      
      <Tab.Screen name="CustomRecipe" component={CustomRecipeScreen} />
      <Tab.Screen name="Setting" component={SettingsStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// main app starting point
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
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
