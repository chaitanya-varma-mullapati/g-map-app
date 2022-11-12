import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
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
    const [data, setData] = useState({
        username: '',
        password: '',
        secureTextEntry: true,
    });
    const [clicked, setIsClicked] = useState(false)
    const { colors } = useTheme();

    const { signIn } = useContext(AuthContext);

    const textInputChange = (val) => {
        setData({
            ...data,
            username: val,
        });
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
            isValidPassword: true
        });
    }


    const loginHandle = (email, password) => {
        const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!email.length && !password.length) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }
        if (email.length && password.length) {
            if (validEmailRegex.test(email)) {
                setIsClicked(true)
                auth()
                    .signInWithEmailAndPassword(email, password)
                    .then((u) => {
                        signIn(u.user.email, u.user.uid)
                        setIsClicked(false)
                    })
                    .catch(error => {
                        setIsClicked(false)
                        if (error.code === 'auth/invalid-email') {
                            Alert.alert('Email', 'Your email address is invalid!', [
                                { text: 'Ok' }
                            ]);
                        } else {
                            if (error.code === 'auth/wrong-password') {
                                Alert.alert('Password!', 'Your password is wrong! please enter correct password.', [
                                    { text: 'Ok' }
                                ]);
                            } else {
                                if (error.code === 'auth/user-not-found') {
                                    Alert.alert('Invalid user!', "user doesn't exist.", [
                                        { text: 'Ok' }
                                    ]);
                                } else {
                                    Alert.alert('Error!', 'Oops! something went wrong, please try again!', [
                                        { text: 'Ok' }
                                    ]);
                                }
                            }
                        }
                        console.log(error)
                    });
                return
            } else {
                Alert.alert('Email', 'Please Enter Valid email', [
                    { text: 'Ok' }
                ]);
                return;
            }
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

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Email</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                </View>
                <Text style={[styles.text_footer, {
                    color: colors.text,
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
                {/* <TouchableOpacity>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity> */}
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {
                            !clicked ? loginHandle(data.username, data.password) : null
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
                                {clicked ? <Activity /> : 'Sign In'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
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
        flex: 3,
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
    }
});
