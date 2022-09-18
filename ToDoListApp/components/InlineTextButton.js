import {Text, Pressable} from 'react-native';
import styles from '../styles/componentStyles';

export default function InlineTextButton(props) {
  let style = {};
  if (props.color) {
    style.color = props.color;
  }
  return (
    <Pressable onPress={props.onPress} style={{margin: 5}}>
      {({pressed}) => (
        <Text
          style={[
            pressed ? styles.pressedInlineTextButton : styles.inlineTextButton,
            style,
          ]}>
          {props.text}
        </Text>
      )}
    </Pressable>
  );
}
