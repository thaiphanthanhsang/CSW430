import 'react-native-gesture-handler';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Contacts from './src/Contact';
import Store from './src/Store';
import { Provider } from 'react-redux';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileContact from './src/ProfileContact';
import Favorites from './src/Favorites';
import Settings from './src/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createStackNavigator();

const DrawerMenuButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    style={{ marginLeft: 16 }}
  >
    <Icon name="menu" size={24} color="#000000" />
  </TouchableOpacity>
);

function ContactsScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={({ navigation }) => ({
          title: 'Contacts',
          headerLeft: () => <DrawerMenuButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile Contact' }}
      />
    </Stack.Navigator>
  );
}
function FavoriteScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          title: 'Favorites',
          headerLeft: () => <DrawerMenuButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile Contact' }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'blue' },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#EEEEEE',
        tabBarInactiveTintColor: '#B0BEC5',
      }}
    >
      <Tab.Screen
        name="Contacts"
        component={ContactsScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="star-check" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Drawer = createDrawerNavigator();
function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: '#663399',
          }}
        >
          <Drawer.Screen
            name="Main"
            component={TabNavigator}
            options={{
              title: 'Home',
              drawerIcon: ({ color, size }) => (
                <Icon name="view-dashboard" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: true,
              title: 'Settings',
              drawerIcon: ({ color, size }) => (
                <Icon name="cog" color={color} size={size} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
