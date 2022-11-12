import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../components/context';
import Activity from '../components/Activity';

const SignInScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { signUp } = useContext(AuthContext)
    const [data, setData] = useState({
        email: '',
        password: '',
        secureTextEntry: true,
    });
    const [clicked, setIsClicked] = useState(false)


    const textInputChange = (val) => {
        setData({
            ...data,
            email: val,
        });
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    const handleSignUp = (email, password) => {
        const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (email.length && password.length) {
            if (validEmailRegex.test(email)) {
                setIsClicked(true)
                auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((u) => {
                        signUp(u.user.email, u.user.uid)
                        setIsClicked(false)
                        console.log('User account created & signed in!');
                    })
                    .catch(error => {
                        setIsClicked(false)
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                            Alert.alert('Email ', 'That email address is already in use!', [
                                { text: 'Ok' }
                            ]);
                        }
                        if (error.code === 'auth/invalid-email') {
                            Alert.alert('Email', 'Your email address is invalid!', [
                                { text: 'Ok' }
                            ]);
                            console.log('That email address is invalid!');
                        }
                        console.error(error);
                        Alert.alert('Error!', 'Oops! something went wrong, please try again!', [
                            { text: 'Ok' }
                        ]);
                    });
                return
            } else {
                Alert.alert('Email', 'Please Enter valid email', [
                    { text: 'Ok' }
                ]);
                return;
            }
        } else {
            if (!email.length && !password.length) {
                console.log('errrr')
                Alert.alert('Email & Password', 'Please Enter email & password', [
                    { text: 'Ok' }
                ]);
                return;
            }
            if (!email.length) {
                Alert.alert('Email', 'Please Enter email', [
                    { text: 'Ok' }
                ]);
                return;
            }
            if (!password.length) {
                Alert.alert('Password', 'Please Enter password', [
                    { text: 'Ok' }
                ]);
                return;
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Your Email"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                    </View>
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => {
                                !clicked ? handleSignUp(data.email, data.password) : null
                            }}
                            disabled={clicked}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>
                                    {!clicked ? 'Sign Up' : <Activity />}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});
