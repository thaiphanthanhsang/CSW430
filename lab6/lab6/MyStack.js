import Login from './screens/Login';
import MainTabs from './MainTabs';
import AddPage from './screens/AddPage';
import ServiceDetail from './screens/ServiceDetail';
import EditService from './screens/EditService';
import AddCustomer from './screens/AddCustomer';
import Customer from './screens/Customer';
import Transaction from './screens/Transaction';
import TransactionDetail from './screens/TransactionDetail';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={MainTabs}
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
      <Stack.Screen
        name="Customer"
        component={Customer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transaction"
        component={Transaction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
