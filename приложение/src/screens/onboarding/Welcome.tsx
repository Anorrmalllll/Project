import { Button, Text, useTheme } from '@rneui/themed'
import { SafeArea } from '../../components/safearea'
import { Image, StyleSheet, View } from 'react-native'
import { icon } from '../../../assets'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'welcome'
>

const Welcome = ({
    navigation,
}: {
    navigation: WelcomeScreenNavigationProp
}) => {
    const { theme } = useTheme()

    useEffect(() => {
        checkAuthentication()
    }, [])

    const checkAuthentication = async () => {
        const result = await AsyncStorage.getItem('isAuth')
        if (result) navigation.navigate('home')
    }

    return (
        <SafeArea style={{ backgroundColor: theme.colors['grey-100'] }}>
            <View style={styles.screenContainer}>
                <Image style={styles.logo} source={icon} />

                <View>
                    <Text h1 style={{ textAlign: 'center' }}>
                        Добро пожаловать!
                    </Text>
                    <Text style={{ textAlign: 'center' }}>
                        Войдите, чтобы включить резервное копирование и синхронизацию для всего вашего дневника
                    </Text>
                </View>

                <View style={styles.btnContainer}>
                    <Button
                        title="Создать аккаунт"
                        containerStyle={styles.btnContainerStyle}
                        buttonStyle={{
                            backgroundColor: theme.colors['red-100'],
                        }}
                        titleStyle={styles.btnTitleStyle}
                        onPress={() => navigation.navigate('signup')}
                    />

                    <Button
                        title="Войти"
                        containerStyle={styles.btnContainerStyle}
                        buttonStyle={{
                            backgroundColor: theme.colors['red-100'],
                        }}
                        titleStyle={styles.btnTitleStyle}
                        onPress={() => navigation.navigate('signin')}
                    />
                </View>
            </View>
        </SafeArea>
    )
}

export default Welcome

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: 160,
        maxHeight: '30%',
        resizeMode: 'contain',
    },
    btnContainer: {
        width: '100%',
    },
    btnContainerStyle: {
        width: '90%',
        borderRadius: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 14,
    },
    btnTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})
