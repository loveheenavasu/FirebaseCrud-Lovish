import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Platform } from 'react-native'
import React, { useState } from 'react'
import CustomizedButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';




export const LoginScreen = () => {
    const [email, setEmail] = useState<string>(''); // Specify string type
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<any>(null)
    const [spinner, setSpinner] = useState<boolean>(false)


    const navigation = useNavigation<any>();

    const handleEmailChange = (text: string) => {
        setError(null)
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setError(null)
    };

    const validateEmail = (email: string) => {
        // Regular expression for basic email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        return emailPattern.test(email);
    };

    const handleLogin = () => {
        // Perform your login logic here using the email and password state values
        if (!email) {
            setError('Please enter an email address.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!password) {
            setError('Please enter a password.');
            return;
        }
        console.log('Email:', email);
        console.log('Password:', password);
        setSpinner(true)
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account signed in!');
                navigation.navigate('Home')
                setSpinner(false)
                if (Platform.OS === 'android') {

                    ToastAndroid.showWithGravityAndOffset(
                        'Logged in successfully!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                }

            })
            .catch((error: any) => {
                if (error.code === 'auth/email-already-in-use') {
                    setError('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    setError('That email address is invalid!');
                }
                if (error.code === 'auth/user-not-found') {
                    setError('That email address does not exist!');
                }
                if (error.code === 'auth/wrong-password') {
                    setError('Wrong password!');
                }
                setSpinner(false)


                console.log(error);
            });
    };
    return (
        <View style={styles.container}>
            <Spinner
                visible={spinner}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginLeft: 'auto', paddingVertical: 10 }}>
                <Text style={{ fontSize: 20, color: 'orange' }}>Register</Text>
            </TouchableOpacity>
            <View style={styles.wrapper}>
                <Text style={styles.orangeHeading}>LoginScreen</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="white"
                    placeholder="Email"
                    value={email}
                    keyboardType='email-address'
                    onChangeText={handleEmailChange}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={handlePasswordChange}
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
                <CustomizedButton title="Login" onPress={handleLogin} backgroundColor='orange' />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 35,

    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        padding: 40
    },
    orangeHeading: {
        color: 'orange',
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 50
    },
    inputContainer: {
        width: '80%',
        flex: 1

    },
    input: {
        height: 40,
        marginVertical: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white'
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center'
    }
})
