import Home from './screens/Home';
import Customer from './screens/Customer';
import Transaction from './screens/Transaction';
import Setting from './screens/Setting';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#E8577E"
      inactiveColor="#777"
      barStyle={{
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#777',
        height: 70,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({ color }) => (
            <Ionicons name="cash" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={Customer}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
