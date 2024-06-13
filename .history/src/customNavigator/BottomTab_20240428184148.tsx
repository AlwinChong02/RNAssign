import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//PagesScreen
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CustomRecipeScreen from '../screens/CustomRecipeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import ViewFeedbackScreen from '../screens/ViewFeedbackScreen';


//type
import { RootStackParamList } from '../../Type';


const Tab = createBottomTabNavigator();


const BottomTab = ({route, navigation}: any) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerBackgroundContainerStyle: {backgroundColor: 'orange'}, 
                headerStyle: {backgroundColor: 'orange', height: 70, },
                headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
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
                        iconName = focused ? 'add-circle-outline' :'add-circle' ;
                        color = '#fe2c49';
                        size = 70;
                    } else if (route.name === 'AboutUs') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    }
                    return <Ionicons name={iconName || ''} size={size} color={color} />;
                } ,
                flexDirection: 'row',
                tabBarStyle:{
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
            <Tab.Screen name="Setting" component={SettingsScreen} />

               <Tab.Screen name="ViewFeedback" component={ViewFeedbackScreen} />
            {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
            <Tab.Screen name="AboutUs" component={AboutUsScreen} />
            <Tab.Screen name="Feedback" component={FeedbackScreen} />
        </Tab.Navigator>
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


export default BottomTab;