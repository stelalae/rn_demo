import * as React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';

interface IProps {
  label: string;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  enable: boolean;
}

interface Styles {
  button: ViewStyle;
  icon: ImageStyle;
  label: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  button: {
    flexDirection: 'row',
    backgroundColor: '#336699',
  },

  icon: {
    width: 16,
    height: 16,
  },

  label: {
    color: '#F8F8F8',
    textAlign: 'center',
  },
});

const styleCondition = {
  backgroundColor: (enable: boolean): ViewStyle => {
    return { backgroundColor: enable ? 'red' : 'green' };
  },
};

const Button: React.SFC<IProps> = (props): JSX.Element => (
  <TouchableHighlight>
    <View style={[styles.button, styleCondition.backgroundColor(props.enable), props.buttonStyle]}>
      <Image style={styles.icon} source={require('./assets/someCoolIcon.png')} />
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </View>
  </TouchableHighlight>
);

export default Button;
