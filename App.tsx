import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import Profile from './src/screens/userProfile';
import AboutUsScreen from './src/screens/AboutUsScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import ViewFeedbackScreen from './src/screens/ViewFeedbackScreen';
import CustomRecipeScreen from './src/screens/CustomRecipeScreen';
import FoodScreen from './src/screens/FoodScreen';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';


export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
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

const RecipeScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackgroundContainerStyle: { backgroundColor: 'orange' },
        headerStyle: { backgroundColor: 'orange', height: 70, },
        headerTitleStyle: { fontSize: 24, fontWeight: 'bold',fontFamily: 'font1'},
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FoodScreen" component={FoodScreen} />
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
          } else if (route.name === 'CustomRecipe') {
            iconName = focused ? 'add-circle-outline' : 'add-circle';
            color = '#fe2c49';
            size = 70;
          }
          return <Ionicons name={iconName || ''} size={size} color={color} />;
        },
        flexDirection: 'row',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: 70,
          bottom: 18,
          left: 15,
          right: 15,
          flexDirection: 'row',
          borderRadius: 28,
        },
      })}
    >
      <Tab.Screen name="Home" component={RecipeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="CustomRecipe" component={CustomRecipeScreen} />
      <Tab.Screen name="Setting" component={SettingsStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// main app starting point
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{
        headerBackgroundContainerStyle: { backgroundColor: 'orange' },
        headerStyle: { backgroundColor: 'orange', height: 70, },
        headerTitleStyle: { fontSize: 24, fontWeight: 'bold' }}}
      >
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
