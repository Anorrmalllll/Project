import { Button, Input, Text, useTheme } from '@rneui/themed'
import { SafeArea } from '../../components/safearea'
import { Image, StyleSheet, View, ToastAndroid } from 'react-native'
import { RootStackParamList } from '../../navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { icon } from '../../../assets'
import { RNETheme } from '../../theme'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

type SignUpScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'signup'
>

const SignUp = ({ navigation }: { navigation: SignUpScreenNavigationProp }) => {
    const { theme } = useTheme()
    const styles = makeStyles(theme)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const ValidateEmail = () => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email.trim().match(validRegex))
          return true;
        else
          return false;
      }      

    const fieldsValidation = () => {
        if (!name.length || !email.length || !password.length) {
            ToastAndroid.showWithGravity(
                'Заполните все поля',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            return false;
        }
        if (password.length < 8) {
            ToastAndroid.showWithGravity(
                'Слишком коротки пароль',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            return false;
        }
        if (!ValidateEmail()) {
            ToastAndroid.showWithGravity(
                'Не валидный E-mail',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            return false;
        }
        return true;
    }

    const signup = async () => {
        if (!fieldsValidation()) return;

        const result = await AsyncStorage.getItem('users')
        console.log('result: ', result)

        if (!result)
            await AsyncStorage.setItem('users', JSON.stringify([{ id: uuid.v4(), name, email: email.trim(), password }]))
        else
            await AsyncStorage.setItem('users', JSON.stringify([...result, { id: uuid.v4(), name, email: email.trim(), password }]))

        navigation.navigate('signupconfirmed')
    }

    return (
        <SafeArea style={{ backgroundColor: theme.colors['grey-100'] }}>
            <View style={styles.screenContainer}>
                <Image style={styles.logo} source={icon} />

                <View style={{ paddingBottom: 20 }}>
                    <Text h3 style={{ textAlign: 'center', marginBottom: 24 }}>
                        Создание аккаунта
                    </Text>

                    <Text style={styles.label}>Имя</Text>
                    <Input
                        containerStyle={styles.inputContainerStyle}
                        value={name}
                        onChangeText={(val) => setName(val)}
                    />

                    <Text style={styles.label}>E-mail</Text>
                    <Input
                        containerStyle={styles.inputContainerStyle}
                        value={email}
                        onChangeText={(val) => setEmail(val)}
                    />

                    <Text style={styles.label}>Пароль</Text>
                    <Input
                        containerStyle={styles.inputContainerStyle}
                        value={password}
                        onChangeText={(val) => setPassword(val)}
                    />
                </View>

                <Button
                    title="Войти"
                    containerStyle={styles.btnContainerStyle}
                    buttonStyle={{
                        backgroundColor: theme.colors['red-100'],
                    }}
                    titleStyle={styles.btnTitleStyle}
                    onPress={() => signup()}
                />
            </View>
        </SafeArea>
    )
}

export default SignUp

const makeStyles = (theme: RNETheme) =>
    StyleSheet.create({
        screenContainer: {
            flex: 1,
            paddingVertical: 50,
            justifyContent: 'space-between',
        },
        logo: {
            width: 160,
            marginRight: 'auto',
            marginLeft: 'auto',
            maxHeight: '25%',
            resizeMode: 'contain',
        },
        btnContainerStyle: {
            width: '80%',
            borderRadius: 10,
            marginRight: 'auto',
            marginLeft: 'auto',
        },
        btnTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        label: {
            marginTop: 12,
        },
        inputContainerStyle: {
            backgroundColor: theme.colors['grey-75'],
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 5,
        },
    })
