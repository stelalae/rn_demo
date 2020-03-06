import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect } from 'react-redux';
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';

function HomeScreen(props) {
  const { navigation } = props;
  console.log(props);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Go to Profile' onPress={() => navigation.navigate('Profile', { a: 1 })} />
    </View>
  );
}

function ProfileScreen(props) {
  const { navigation } = props;
  console.log(props);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Go to Notifications' onPress={() => navigation.navigate('Notifications', { a: 1 })} />
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  );
}

function NotificationsScreen(props) {
  const { navigation } = props;
  console.log(props);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Go to Settings' onPress={() => navigation.navigate('Settings', { a: 1 })} />
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen(props) {
  const { navigation } = props;
  console.log(props);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  );
}

const AppNavigator = createStackNavigator();
function MyStack2() {
  return (
    <AppNavigator.Navigator>
      <AppNavigator.Screen name='Home' component={HomeScreen} />
      <AppNavigator.Screen name='Notifications' component={NotificationsScreen} />
      <AppNavigator.Screen name='Profile' component={ProfileScreen} />
      <AppNavigator.Screen name='Settings' component={SettingsScreen} />
    </AppNavigator.Navigator>
  );
}

// export const routerReducer = createNavigationReducer(AppNavigator);

// export const routerMiddleware = createReactNavigationReduxMiddleware((state: any) => state.router);

// const App = createReduxContainer(<MyStack2 />, 'root');

// const mapStateToProps = state => ({
//   state: state.nav,
// });
// const AppWithNavigationState = connect(mapStateToProps)(App);

class Root extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack2 />
      </NavigationContainer>
    );
  }
}

export default Root;
