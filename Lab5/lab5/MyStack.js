import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';
import AddPage from './screens/AddPage';
import ServiceDetail from './screens/ServiceDetail';
import EditService from './screens/EditService';
const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPage"
        component={AddPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditService"
        component={EditService}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
