import {StyleSheet} from 'react-native';
import config from '../utils/config';

export default StyleSheet.create({
  inlineTextButton: {
    color: '#87F1FF',
  },
  pressedInlineTextButton: {
    color: '#87F1FF',
    opacity: 0.6,
  },
  container: {
    left: 10,
  },
  innerText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  innerTextWhiteButton: {
    color: config.colors.darkgrey,
  },
  button: {
    backgroundColor: config.colors.primary,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    marginTop: 20,
    textAlign: 'center',
    marginHorizontal: 30,
  },
});
