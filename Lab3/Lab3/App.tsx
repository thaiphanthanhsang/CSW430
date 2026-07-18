import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import ProductList from './src/pages/ProductList';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddPage from './src/pages/AddPage';
import SearchProduct from './src/pages/SearchProduct';
import ProductDetail from './src/pages/ProductDetail';

export type RootTabParamList = {
  Products: undefined;
  Add: undefined;
  Search: undefined;
  Detail: { productId: number } | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<string, string> = {
  Products: '💣',
  Add: '💣',
  Search: '❓',
  Detail: '🆕',
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#9333ea',
            tabBarInactiveTintColor: '#6b7280',
            tabBarIcon: () => (
              <Text className="text-xl">{tabIcons[route.name]}</Text>
            ),
          })}
        >
          <Tab.Screen name="Products" component={ProductList} />
          <Tab.Screen name="Add" component={AddPage} />
          <Tab.Screen name="Search" component={SearchProduct} />
          <Tab.Screen name="Detail" component={ProductDetail} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
