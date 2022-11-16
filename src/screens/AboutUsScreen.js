import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import ContactUsFormScreen from './ContactUsScreen'

const AboutUsScreen = ({ navigation }) => {
    return (
        <View style={{ padding: 10 }}>
            <View style={{ width: '25%', marginTop: 10 }}>
                <Button onPress={() => navigation.goBack()} title="Back" />
            </View>
            <View style={{ height: 200, marginTop: 30 }}>
                <Text>
                    {"West Campus Map is a navigation system geared as an website. Primary users of this system are students. In addition, faculties, parents, guests, etc. can also use this app to navigate around campus \n\nThe application will enable users to look for important locations available on the West Campus."}
                </Text>
            </View>
        </View>
    )
}

export const ContactUsScreen = ({ navigation }) => {
    return (
        <View style={{ padding: 10 }}>
            <View style={{ width: '25%', marginTop: 10, borderRadius: 10 }}>
                <Button onPress={() => navigation.goBack()} title="Back" />
            </View>
            <ContactUsFormScreen />
            <View>
                <Text style={{ height: 200, marginTop: 30 }}>
                    Contact us: mc2varma @gmail.com
                </Text>
            </View>
        </View>
    )
}

export default AboutUsScreen

export const AboutAndContactText = ({ navigation }) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'flex-end',
            marginTop: 10,
        }}>
            <TouchableOpacity onPress={() => navigation.navigate('About')}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', }}>About us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Contact us</Text>
            </TouchableOpacity>
        </View>
    )
}