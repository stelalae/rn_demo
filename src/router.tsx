import React from 'react';
import { BackHandler, Button, View, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

import Navigator from './utils/navigator';

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

export const AppNavigator = Navigator.createStackNavigator(
  {
    Main: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    Notifications: { screen: NotificationsScreen },
    Setting: { screen: SettingsScreen },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  },
);

const { App } = Navigator;
const AppContainer = App(AppNavigator);

@connect(({ app, router }) => ({ app, router }))
class Root extends React.Component {
  UNSAFE_componentWillMount() {
    console.log(this.props);
    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
  }

  backHandle = () => {
    const currentScreen = Navigator.getActiveRouteName(this.props.router);
    if (currentScreen === 'Login') {
      return true;
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(Navigator.back());
      return true;
    }
    return false;
  };

  render() {
    const { app, dispatch, router } = this.props;
    if (app.loading) return null;
    return <AppContainer dispatch={dispatch} state={router} />;
  }
}

export default Root;
