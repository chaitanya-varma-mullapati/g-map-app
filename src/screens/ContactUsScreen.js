import { View, StyleSheet, TextInput, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Activity from '../components/Activity';

const ContactUsFormScreen = () => {
    const initialData = {
        username: "",
        email: "",
        message: ""
    }
    const [isClicked, setIsClicked] = useState(false)
    const [data, setData] = useState(initialData)

    const { colors } = useTheme();

    const userNameChange = (val) => {
        setData({
            ...data,
            username: val,
        });
    }

    const emailChange = (val) => {
        setData({
            ...data,
            email: val,
        });
    }

    const messageChange = (val) => {
        setData({
            ...data,
            message: val,
        });
    }

    const handleSubmit = (username, email, message = "") => {
        const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!email.length) {
            Alert.alert('Email!', 'email can not be empty', [
                { text: 'Ok' }
            ]);
            return;
        }
        if (!username.length) {
            Alert.alert('Username!', 'username can not be empty', [
                { text: 'Ok' }
            ]);
            return;
        }
        if (email.length && !validEmailRegex.test(email)) {
            Alert.alert('Email!', 'Please enter valid email', [
                { text: 'Ok' }
            ]);
            return;
        }

        if (email.length && validEmailRegex.test(email)) {
            setIsClicked(true)
            firestore()
                .collection('users')
                .doc(`${username}`)
                .set({
                    username: username,
                    email: email,
                    message: message
                })
                .then(() => {
                    console.log('User added!');
                    setData(initialData)
                    Alert.alert('Done!', 'Message sent', [
                        { text: 'Ok' }
                    ]);
                    setIsClicked(false)
                }).catch((e) => {
                    setIsClicked(false)
                });
        }
    }

    return (
        <View style={styles.container}>
            {isClicked ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Activity /></View> : null}
            <TextInput
                placeholder="Username"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                value={data.username}
                autoCapitalize="none"
                onChangeText={(val) => userNameChange(val)}
            />
            <TextInput
                placeholder="Email"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: colors.text
                }]}
                value={data.email}
                autoCapitalize="none"
                onChangeText={(val) => emailChange(val)}
            />
            <TextInput
                style={styles.input}
                onChangeText={(val) => messageChange(val)}
                placeholder="Message"
                autoCapitalize="none"
                multiline
                numberOfLines={8}
                value={data.message}
            />
            <View style={{ width: '25%', marginTop: 20, alignSelf: 'center' }}>
                <Button onPress={() => handleSubmit(data.username, data.email, data.message)} title="Submit" disabled={isClicked} />
            </View>
        </View>
    )
}

export default ContactUsFormScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#009387',
        width: '100%',
        marginTop: 50
    },
    textInput: {
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center"
    },
    btn: {
        color: '#000'
    }
});
