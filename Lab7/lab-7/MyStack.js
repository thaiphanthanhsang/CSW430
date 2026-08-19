import Login from './screens/Login';
import MainTabs from './MainTabs';
import AddPage from './screens/Home/AddPage';
import ServiceDetail from './screens/Home/ServiceDetail';
import EditService from './screens/Home/EditService';
import AddCustomer from './screens/Customer/AddCustomer';
import Customer from './screens/Customer/Customer';
import CustomerDetail from './screens/Customer/CustomerDetail';
import EditCustomer from './screens/Customer/EditCustomer';
import Transaction from './screens/Transaction/Transaction';
import AddTransaction from './screens/Transaction/AddTransaction';
import TransactionDetail from './screens/Transaction/TransactionDetail';
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
        name="CustomerDetail"
        component={CustomerDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditCustomer"
        component={EditCustomer}
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
        name="AddTransaction"
        component={AddTransaction}
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
