import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  FoodScreen: {
    recipe_id: number;
    name: string;
    ingredients: string;
    instructions: string;
    notes: string;
    image: string;
  };
};

type FoodScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FoodScreen'>;

const Stack = createStackNavigator<RootStackParamList>();
