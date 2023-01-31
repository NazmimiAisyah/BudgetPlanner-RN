import { StyleSheet, View, Text } from "react-native";

//import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import {
  signOut,
} from "firebase/auth";
import { auth } from "../Components/config";


export default function FooterWarranty({ navigation, GlobalState }) {
    const {
        email, setEmail,
        password, setPassword,
    } = GlobalState;

    const handleLogOut = () => {
        signOut(auth)
      .then(() => {
        // Sign-out successful.
          setPassword('');
          alert("Sign-out successful.");
          navigation.navigate('Login');
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
    };
    
    return (
        <View style={styles.footer}>    
        <View style={styles.icon}>      
            <Icon 
                name="money"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('Main')}
            />
                <Text>Budget</Text>
                </View>
            <View style={styles.icon}>  
                <IconMat
                    name="logout"
                    size={30}
                    color="#141414"
                    onPress={handleLogOut}
                />
                <Text>Log Out</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        zIndex: 5,
        borderTopWidth: 1,
        borderTopColor: '#14141410'
    },
    text: {
        fontSize: 18,
        fontWeight: '900'
    },
    icon: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    }
})