import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Warranty from './src/screens/Warranty';
import Main from './src/screens/Main';


const Stack = createNativeStackNavigator();

export default function App() {

  // globalstate management
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedList, setSelectedList] = useState([]);
  const [editedValue, setEditedValue] = useState('');
  const [label, setLabel] = useState('');
  const [warrantyList, setWarrantyList] = useState([]);
  const [warrantyTitle, setWarrantyTitle] = useState('');
  const [warrantyExpiryDate, setWarrantyExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [warrantyImage, setWarrantyImage] = useState(null);
  const [warrantyModalVisible, setWarrantyModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedWarrantyId, setSelectedWarrantyId] = useState(null);
  const [itemID, setItemId] = useState('');
  const [listName, setListName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const GlobalState = {
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
    warrantyList, setWarrantyList,
    warrantyTitle, setWarrantyTitle,
    warrantyExpiryDate, setWarrantyExpiryDate,
    showDatePicker, setShowDatePicker,
    warrantyImage, setWarrantyImage,
    warrantyModalVisible, setWarrantyModalVisible,
    currentItem, setCurrentItem,
    selectedWarrantyId, setSelectedWarrantyId,
    itemID, setItemId,
    listName, setListName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    errorMessage, setErrorMessage
  }

  // navigation
  return (
    <NavigationContainer>
      <Stack.Navigator>


        
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {props => <Login {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="SignUp" options={{ headerShown: false }}>
          {props => <SignUp {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {props => <Main {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Warranty" options={{ headerShown: false }}>
          {props => <Warranty {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        


      </Stack.Navigator>
    </NavigationContainer>
  );
}