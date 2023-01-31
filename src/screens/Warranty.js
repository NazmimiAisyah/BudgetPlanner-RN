import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, Modal, FlatList } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../Components/config';
import FooterWarranty from '../Components/FooterWarranty';



export default function Warranty({ navigation, GlobalState }) {
    const {
    warrantyList, setWarrantyList,
    warrantyTitle, setWarrantyTitle,
    warrantyExpiryDate, setWarrantyExpiryDate,
        showDatePicker, setShowDatePicker,
        warrantyImage, setWarrantyImage,
        warrantyModalVisible, setWarrantyModalVisible,
        currentItem, setCurrentItem,
    selectedWarrantyId, setSelectedWarrantyId
    } = GlobalState;
  
  useEffect(() => {
    getDocs(collection(db, "warrantyList")).then(docSnap => {
      let warrantyListDB = [];
      docSnap.forEach((doc)=> {
          warrantyListDB.push({ id: doc.id,
          title: doc.data().title,
          expiryDate: new Date(doc.data().expiryDate.toDate().toLocaleDateString()),
            image: doc.data().image,
            id: doc.id
          })
      });
        console.log("Document data:", warrantyListDB);
        setWarrantyList(warrantyListDB);
    });
  }, []);


    const addWarrantyCard = () => {
      console.log(warrantyExpiryDate + ' ' + warrantyTitle);
      let randomNo = Math.random().toString();
      setDoc(doc(db, "warrantyList", randomNo), {   
          id: randomNo,
          title: warrantyTitle,
          expiryDate: warrantyExpiryDate,
          image: warrantyImage,
      }).then(() => {
        // Data saved successfully!
        console.log('data submitted');  

      }).catch((error) => {
            // The write failed...
            console.log(error);
      });
        const newWarrantyCard = {
          id: randomNo,
          title: warrantyTitle,
          expiryDate: warrantyExpiryDate,
          image: warrantyImage,
        };
        setWarrantyList([...warrantyList, newWarrantyCard]);
        setWarrantyTitle('');
        setWarrantyExpiryDate(new Date());
        setWarrantyImage(null);
};
    
    const removeWarrantyCard = id => {
    setWarrantyList(warrantyList.filter(item => item.id !== id));
    };
    
    const editWarrantyCard = (id, updatedTitle, updatedExpiryDate) => {
        const updatedWarrantyList = warrantyList.map(item => {
            if (item.id === id) {
                return { ...item, title: updatedTitle, expiryDate: updatedExpiryDate };
            }
            return item;
        });
        setWarrantyList(updatedWarrantyList);
    };
  
  const deleteWarranty = () => {
    deleteDoc(doc(db, 'warrantyList', selectedWarrantyId));  
    setWarrantyList(warrantyList.filter(item => item.id !== selectedWarrantyId));
    setWarrantyModalVisible(false);
        setCurrentItem(null);
        setWarrantyExpiryDate(new Date());
        setWarrantyTitle('');
        setWarrantyImage(null);
        setSelectedWarrantyId(null);
  };
    
    

const onChangeDate = (event, date) => {
  date = date || warrantyExpiryDate;
  setWarrantyExpiryDate(date);
};

const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setWarrantyImage(result.assets[0].uri);
    }
  }

    const saveWarrantyChanges = async () => {
  const updatedWarranty = {
    id: selectedWarrantyId,
    title: warrantyTitle,
    expiryDate: warrantyExpiryDate,
    image: warrantyImage
  };
  const updatedWarrantyList = warrantyList.map(item => {
    if (item.id === selectedWarrantyId) {
      return updatedWarranty;
    }
    return item;
  });
  setWarrantyList(updatedWarrantyList);
  setSelectedWarrantyId(null);
  setWarrantyTitle('');
  setWarrantyExpiryDate(new Date());
  setWarrantyImage(null);
  setWarrantyModalVisible(false);
    };
    
    const handleWarrantyCardPress = (item) => {
        setWarrantyModalVisible(true);
        setCurrentItem(item);
        setWarrantyExpiryDate(item.expiryDate);
        setWarrantyTitle(item.title);
        setWarrantyImage(item.image);
        setSelectedWarrantyId(item.id);
    }
    
    const cancelWarrantyChanges = (item) => {
        setWarrantyModalVisible(false);
        setCurrentItem(null);
        setWarrantyExpiryDate(new Date());
        setWarrantyTitle('');
        setWarrantyImage(null);
        setSelectedWarrantyId(null);
  }


    return (
        
        <SafeAreaView style={styles.container}>
            <Modal animationType="slide" transparent={false} visible={warrantyModalVisible}>
                <SafeAreaView style={styles.modalContainer}>
                    <Image
                      style={styles.modalImage}
                      source={{ uri: warrantyImage }}
                    />
            <TextInput
              style={styles.textInput}
              placeholder="Warranty Title"
              value={warrantyTitle}
              onChangeText={text => setWarrantyTitle(text)}
            />
            <RNDateTimePicker
                    display='default'
          value={warrantyExpiryDate}
          onChange={onChangeDate}
        />
            <TouchableOpacity style={styles.modalButton} onPress={saveWarrantyChanges}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={cancelWarrantyChanges}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={deleteWarranty}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      <View style={styles.warrantyListContainer}>
        <FlatList
          data={warrantyList}
          renderItem={({ item }) => (
              
                  <TouchableOpacity style={styles.warrantyCardContainer} onPress={() => handleWarrantyCardPress(item)}>
                  <View style={styles.warrantyCardContainer}>
                  <Image
      style={styles.warrantyCardImage}
      source={{ uri: item.image }}
                      />
                      <View style={styles.warrantyCardTextContainer}>
                          <Text style={styles.warrantyCardTitle}>{item.title}</Text>
                  <Text style={styles.warrantyCardExpiry}>Expiry: {item.expiryDate.toLocaleDateString()}</Text>
                      </View>
                      </View>
                  </TouchableOpacity>
            
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.datePickerContainer}>
        <TextInput
          style={{flex:1, padding:10, borderWidth:1, borderColor:'gray', marginRight:10}}
          placeholder="Warranty Title"
                    onChangeText={text => setWarrantyTitle(text)}
                    value={warrantyTitle}
                />
                
        
            </View>
            <View style={styles.datePickerContainer}>
                <Button title="Add Warranty" onPress={addWarrantyCard} />
            </View>
            <View style={styles.datePickerContainer}>
                <Button title="Pick Image" onPress={pickImage} />
                {showDatePicker && (
                <RNDateTimePicker
                    display='default'
          value={warrantyExpiryDate}
          onChange={onChangeDate}
        />
      )}
            </View>
            <FooterWarranty navigation={navigation}  GlobalState={GlobalState}/>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  warrantyListContainer: {
    flex: 5.5,
    padding: 16,
  },
  warrantyCardContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: 'lightgray'
    },
  warrantyCardTextContainer: {
    flex: 1
  },
  warrantyCardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  warrantyCardExpiry: {
    color: 'gray',
    fontSize: 14,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4287f5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    },
  warrantyCardImage: {
    width: 100,
    height: 100,
    marginRight:10
    },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    },
  modalImage: {
    width: 300,
    height: 300
  },
  modalButton: {
    width: '80%',
    backgroundColor: 'blue',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  deleteButton: {
    width: '80%',
    backgroundColor: 'red',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
});

