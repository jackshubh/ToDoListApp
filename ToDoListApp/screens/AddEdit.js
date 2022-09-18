import {View, Text, TextInput} from 'react-native';
import React from 'react';
import AppStyles from '../styles/AppStyles';
import CommonButton from '../components/CommonButton';

export default function AddEdit(props) {
  let [todo, setTodo] = React.useState(
    props.route.params.item ? props.route.params.item.text : '',
  );

  const {navigation} = props;
  const {addtodo} = props.route.params;

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add ToDo</Text>
      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="ToDo"
        value={todo}
        onChangeText={setTodo}
        autoFocus
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'space-between',
          alignItems: 'stretch',
        }}>
        <CommonButton
          title="OK"
          onPress={() => {
            if (!props.route.params.item) {
              addtodo(todo, '', 'add');
            } else {
              addtodo(todo, props.route.params.item.id, 'edit');
            }
            setTodo('');
            navigation.goBack();
          }}
          buttonStyles={AppStyles.buttonStyles}
          textStyles={AppStyles.buttonTextStyles}
        />
        <CommonButton
          title="Cancel"
          onPress={() => navigation.goBack()}
          buttonStyles={AppStyles.buttonStyles}
          textStyles={AppStyles.buttonTextStyles}
        />
      </View>
    </View>
  );
}
