import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import AppStyles from '../styles/AppStyles';

import auth from '@react-native-firebase/auth';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import firestore from '@react-native-firebase/firestore';
import CommonButton from '../components/CommonButton';
import config from '../utils/config';

export default function ToDo({navigation}) {
  React.useEffect(() => {
    loadToDoList();
  }, []);

  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [toDos, setToDos] = React.useState([]);

  let loadToDoList = async () => {
    const q = firestore()
      .collection('todos')
      .where('userId', '==', auth().currentUser.uid);

    const querySnapshot = await q.get();
    let toDos = [];

    querySnapshot.forEach(doc => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });
    toDos.sort((a, b) => a.idNo - b.idNo);

    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadToDoList();
  }

  let checkToDoItem = (item, isChecked) => {
    const toDoRef = firestore().collection('todos').doc(item.id);
    toDoRef.set({completed: isChecked}, {merge: true});
  };

  let deleteToDo = async toDoId => {
    await firestore().collection('todos').doc(toDoId).delete();
    let updatedToDos = [...toDos].filter(item => item.id != toDoId);
    setToDos(updatedToDos);
  };

  let renderToDoItem = ({item}) => {
    return (
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightMargin,
          AppStyles.leftMargin,
        ]}>
        <View style={AppStyles.fillSpace}>
          <BouncyCheckbox
            isChecked={item.completed}
            size={25}
            fillColor="#258ea6"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{borderColor: '#258ea6'}}
            onPress={isChecked => {
              checkToDoItem(item, isChecked);
            }}
          />
        </View>
        {!item.completed && (
          <InlineTextButton
            text="Edit"
            color="#258ea6"
            onPress={() =>
              navigation.navigate('Edit Screen', {
                addtodo: addToDo,
                item: item,
              })
            }
          />
        )}
        <InlineTextButton
          text="Delete"
          color="#258ea6"
          onPress={() => deleteToDo(item.id)}
        />
      </View>
    );
  };

  let showToDoList = todolist => {
    return (
      <FlatList
        data={todolist}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        renderItem={renderToDoItem}
        keyExtractor={item => item.id}
      />
    );
  };

  let addToDo = async (todo, toDoId, type) => {
    if (type === 'add') {
      let lengthOfToDos = toDos.length + 1;
      let toDoToSave = {
        idNo: lengthOfToDos.toString(),
        text: todo,
        completed: false,
        userId: auth().currentUser.uid,
      };

      const docRef = await firestore().collection('todos').add(toDoToSave);

      toDoToSave.id = docRef.id;

      let updatedToDos = [...toDos];
      updatedToDos.push(toDoToSave);

      setToDos(updatedToDos);
    } else {
      await firestore()
        .collection('todos')
        .doc(toDoId)
        .set({text: todo}, {merge: true});

      loadToDoList();
    }
  };

  return (
    <SafeAreaView>
      <>
        <View
          style={[
            AppStyles.rowContainer,
            AppStyles.rightAligned,
            AppStyles.rightMargin,
            AppStyles.topMargin,
          ]}>
          <InlineTextButton
            text="Manage Account"
            color="#258ea6"
            onPress={() => navigation.navigate('ManageAccount')}
          />
        </View>
        <Text style={AppStyles.header}>ToDo</Text>
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList(toDos)}
        <View>
          <CommonButton
            title="Add ToDo"
            onPress={() =>
              navigation.navigate('Add Screen', {
                addtodo: addToDo,
              })
            }
            color={config.colors.primary}
          />
        </View>
      </>
    </SafeAreaView>
  );
}
