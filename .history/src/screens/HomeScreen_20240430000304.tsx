import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RecipeScreen from './RecipeScreens/RecipeScreen';
import AddRecipeScreen from './RecipeScreens/AddRecipeScreen';
import ModifyRecipeScreen from './RecipeScreens/ModifyRecipeScreen';
import DownloadedRecipesScreen from './RecipeScreens/DownloadedRecipeScreen';
import EditRecipeScreen from './RecipeScreens/EditRecipeScreen';
const Stack = createStackNavigator();

const HomeScreen = () => {
    return (
            <Stack.Navigator initialRouteName="HomeScreen">
                {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Recipes' }} /> */}
                <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
                <Stack.Screen name="AddRecipeScreen" component={AddRecipeScreen} options={{ title: 'Add Recipe' }} />
                <Stack.Screen name="ModifyRecipeScreen" component={ModifyRecipeScreen} options={{ title: 'Modify Recipes' }} />
                <Stack.Screen name="DownloadedRecipeScreen" component={DownloadedRecipesScreen} options={{ title: 'downloaded recipe' }} />
                <Stack.Screen name="EditRecipeScreen" component={EditRecipeScreen} options={{ title: 'edit recipe' }} />
            </Stack.Navigator>
 
    );
};

export default HomeScreen;
