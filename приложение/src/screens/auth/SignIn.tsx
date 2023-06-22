import { Button, Icon, Input, Text, useTheme } from '@rneui/themed'
import { SafeArea } from '../../components/safearea'
import {
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    View,
} from 'react-native'
import { icon } from '../../../assets'
import { RootStackParamList } from '../../navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RNETheme } from '../../theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

type SignInScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'signin'
>

const SignIn = ({ navigation }: { navigation: SignInScreenNavigationProp }) => {
    const { theme } = useTheme()
    const styles = makeStyles(theme)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        checkAuthentication()
    }, [])

    const checkAuthentication = async () => {
        const result = await AsyncStorage.getItem('isAuth')
        if (result) navigation.navigate('home')
    }

    const signin = async () => {
        const result = await AsyncStorage.getItem('users')

        console.log('result: ', result)

        if (!result?.length) {
            ToastAndroid.showWithGravity(
                'Неверный логин или пароль',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        if (result?.length) {
            const currentUser = JSON.parse(result).find((el: any) => el.email === email.trim() && el.password === password);
            console.log(currentUser)

            if (!currentUser)
                ToastAndroid.showWithGravity(
                    'Неверный логин или пароль',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            else {
                await AsyncStorage.setItem('isAuth', '1')
                navigation.navigate('home')
            }
        }
    }

    return (
        <SafeArea style={{ backgroundColor: theme.colors['grey-100'] }}>
            <View style={styles.screenContainer}>
                <Image style={styles.logo} source={icon} />

                <View style={{ paddingVertical: 20 }}>
                    <Text h3 style={{ textAlign: 'center', marginBottom: 24 }}>
                        Авторизация
                    </Text>

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
                    onPress={() => signin()}
                />
            </View>
        </SafeArea>
    )
}

export default SignIn

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
