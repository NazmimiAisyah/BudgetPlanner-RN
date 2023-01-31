import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../Components/config';
import FooterMain from '../Components/FooterMain';

export default function Main({ navigation, GlobalState }) {
    const {
      income, setIncome,
      expenses, setExpenses,
      incomeList, setIncomeList,
      expensesList, setExpensesList,
      balance, setBalance,
      isModalVisible, setIsModalVisible,
      isLabelModalVisible, setIsLabelModalVisible,
      selectedIndex, setSelectedIndex,
      selectedList, setSelectedList,
      editedValue, setEditedValue,
      label, setLabel,
      itemID, setItemId,
      listName, setListName
    } = GlobalState;

  
  useEffect(() => {
    getDocs(collection(db, "incomeList")).then(docSnap => {
      let incomeListDB = [];
      docSnap.forEach((doc)=> {
          incomeListDB.push({ ...doc.data(), id:doc.id })
      });
        console.log("Document data:", incomeListDB);
        setIncomeList(incomeListDB);
    });
    getDocs(collection(db, "expensesList")).then(docSnap => {
      let expensesListDB = [];
      docSnap.forEach((doc)=> {
          expensesListDB.push({ ...doc.data(), id:doc.id })
      });
        console.log("Document data:", expensesListDB);
        setExpensesList(expensesListDB);
    });
  }, []);


  
  const onAddIncomePress = (label) => {
    //newly added
    let randomNo = Math.random().toString();
    setDoc(doc(db, "incomeList", randomNo), {   
      id: randomNo,
      label: label,
      amount: income,
    }).then(() => { 
      // Data saved successfully!
      console.log('data submitted');  

    }).catch((error) => {
          // The write failed...
          console.log(error);
    });
    //newly added end
      setIncomeList([...incomeList, { id: randomNo, label: label, amount: income }]);
    setLabel('');
    setItemId('');
      setIncome(0);
  };

  const onAddExpensesPress = (label) => {
  let randomNo = Math.random().toString();
    setDoc(doc(db, "expensesList", randomNo), {   
      id: randomNo,
      label: label,
      amount: expenses,
    }).then(() => { 
      // Data saved successfully!
      console.log('data submitted');  

    }).catch((error) => {
          // The write failed...
          console.log(error);
    });
  setExpensesList([...expensesList, { id: randomNo, label: label, amount: expenses }]);
    setLabel('');
    setItemId('');
    setExpenses(0);
  };
  

    useEffect(() => {
      setBalance(
          incomeList.map(item => Number(item.amount)).reduce((a, b) => a + b, 0) -
          expensesList.map(item => Number(item.amount)).reduce((a, b) => a + b, 0)
      );
    }, [incomeList, expensesList]);


  const onSavePress = () => {
    updateDoc(doc(db, listName, itemID), {     
      id: itemID,
      label: editedValue.label,
      amount: editedValue.amount,
    }).then(() => { 
      // Data saved successfully!
      console.log('data updated');  

    }).catch((error) => {
          // The write failed...
          console.log(error);
    });
    if (selectedList === incomeList) {
        selectedList.splice(selectedIndex, 1, editedValue);
        setIncomeList([...selectedList]);
    } else if (selectedList === expensesList) {
        selectedList.splice(selectedIndex, 1, editedValue);
        setExpensesList([...selectedList]);
    }
    setIsModalVisible(false);
    setListName('');
  };

  const onDeletePress = () => {
    deleteDoc(doc(db, listName, itemID));  
    if(listName == 'incomeList')
      setIncomeList(incomeList.filter(item => item.id !== itemID));
    else if (listName == 'expensesList')
      setExpensesList(expensesList.filter(item => item.id !== itemID));
    setIsModalVisible(false);
    setListName('');
  };
  const onAddLabelPress = () => {
    setIsLabelModalVisible(true);
  };

  const onSaveLabelPress = () => {
    setIsLabelModalVisible(false);
    setLabel(label);
  };


    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{`Balance: ${balance}`}</Text>
      </View>
      <Modal
    animationType="slide"
    transparent={false}
    visible={isModalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}
  >
    <View style={styles.modalContainer}>
      <TextInput
        style={styles.input}
        value={editedValue.label}
        onChangeText={text => setEditedValue({...editedValue, label: text})}
        placeholder="Edit label"
      />
      <TextInput
        style={styles.input}
        value={editedValue.amount}
        onChangeText={text => setEditedValue({...editedValue, amount: text})}
        placeholder="Edit amount"
      />
            <Button title="Save" onPress={onSavePress} />
            <Button title="Delete" onPress={onDeletePress} />
    </View>
  </Modal>
        <Modal
    animationType="slide"
    transparent={false}
    visible={isLabelModalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}
  >
    <View style={styles.modalContainer}>
      <TextInput
        style={styles.input}
        value={label}
        onChangeText={text => setLabel(text)}
        placeholder="Enter label"
      />
      <Button title="Save" onPress={onSaveLabelPress} />
    </View>
  </Modal>
      <View style={styles.listContainer}>
          <View style={styles.leftListContainer}>
            <Text style={styles.listText}>Income</Text>
          <FlatList data={incomeList} renderItem={({ item, index })=> (
        <TouchableOpacity onPress={() => {
                console.log(item.id);
                setListName('incomeList');
                setItemId(item.id);
        setSelectedIndex(index);
        setSelectedList(incomeList);
        setEditedValue(item);
        setIsModalVisible(true);
        }}
        >
        <View style={styles.listItem}>
            <Text>{item.label}</Text>
            <Text>{item.amount}</Text>
        </View>
    </TouchableOpacity>
    )}
    keyExtractor={(item, index) => index.toString()}
    />
        </View>
          <View style={styles.rightListContainer}>
            <Text style={styles.listText}>Expenses</Text>
          <FlatList data={expensesList} renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                setItemId(item.id);
                setListName('expensesList');
        setSelectedIndex(index);
        setSelectedList(expensesList);
        setEditedValue(item);
        setIsModalVisible(true);
        }}
        >
        <View style={styles.listItem}>
            <Text>{item.label}</Text>
            <Text>{item.amount}</Text>
        </View>
    </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        </View>
        <View style={styles.bottomContainer}>
        <View style={styles.columnContainer}>
          <View style={styles.leftContainer}>
    <Input placeholder="Enter income" keyboardType='numeric' value={income} onChangeText={text=> setIncome(text)}
    containerStyle={styles.inputContainer}
    />
    <Button title="Add Income" onPress={()=> onAddIncomePress(label)} />
    <Button title="Add Label" onPress={onAddLabelPress} />
</View>
          <View style={styles.rightContainer}>
    <Input placeholder="Enter expenses" keyboardType='numeric' value={expenses} onChangeText={text=> setExpenses(text)}
    containerStyle={styles.inputContainer}
    />
    <Button title="Add Expenses" onPress={()=> onAddExpensesPress(label)} />
    <Button title="Add Label" onPress={onAddLabelPress} />
</View>
        </View>
        </View>
        <FooterMain navigation={navigation} GlobalState={GlobalState}/>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
    balanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '15%',
    backgroundColor: '#f5f5f5',
  },
  balanceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  bottomContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  columnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  leftContainer: {
    width: '50%',
    alignItems: 'center',
  },
  rightContainer: {
    width: '50%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop: 10,
  },
  listContainer: {
    flex: 5,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  leftListContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightListContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    },
  listItem: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
},

});
