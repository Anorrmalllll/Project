import { Button, useTheme } from '@rneui/themed'
import { Text } from '@rneui/themed'
import { SafeArea } from '../../components/safearea'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { useEffect, useState } from 'react'
import { screen1, screen2, screen3 } from '../../../assets/onboarding'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation'
import { RNETheme } from '../../theme'
import AsyncStorage from '@react-native-async-storage/async-storage';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'onboarding'
>

const Onboarding = ({
    navigation,
}: {
    navigation: OnboardingScreenNavigationProp
}) => {
    const { theme } = useTheme()
    const styles = makeStyles(theme)
    const [screen, setScreen] = useState(0)
    const [welcome, setWelcome] = useState(false)

    useEffect(() => {
        getWelcome();
    }, [])

    useEffect(() => {
        if (welcome)
            navigation.navigate('welcome')
    }, [welcome])

    const screensData = [
        {
            image: screen1,
            title: 'Делай записи',
            text: 'Резервное копирование и синхронизация записей дневника на всех ваших устройствах',
        },
        {
            image: screen2,
            title: 'Никогда не теряйте свои записи',
            text: 'Резервное копирование и синхронизация записей дневника на всех ваших устройствах',
        },
        {
            image: screen3,
            title: 'Защитите свою конфиденциальность',
            text: 'Установите PIN-код в своем дневнике, чтобы скрыть ваши записи от посторонних глаз.',
        },
    ]

    const getWelcome = async () => {
        setWelcome(await AsyncStorage.getItem('welcome') === '1')
    }

    const handleNextScreen = () => {
        if (screen <= 1) {
            setScreen((screen) => screen + 1)
        }
    }

    const toWelcomePage = async () => {
        await AsyncStorage.setItem('welcome', '1')
        setWelcome(true)
    };

    return (
        <SafeArea
            style={{
                justifyContent: 'flex-end',
                backgroundColor: theme.colors['grey-100'],
            }}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={screensData[screen].image}
                />
            </View>

            <View style={styles.indicatorContainer}>
                {[0, 1, 2].map((idx) => (
                    <View
                        key={idx}
                        style={
                            screen === idx
                                ? styles.activeIndicator
                                : styles.indicator
                        }
                    ></View>
                ))}
            </View>

            <View>
                <Text h1>{screensData[screen].title}</Text>
                <Text>{screensData[screen].text}</Text>
            </View>

            <View style={styles.buttonContainer}>
                {screen !== 2 ? (
                    <>
                        <Button
                            type="clear"
                            TouchableComponent={TouchableWithoutFeedback}
                            titleStyle={{ color: theme.colors['red-75'] }}
                            onPress={() => toWelcomePage()}
                        >
                            Пропустить
                        </Button>
                        <Button
                            title="Далее"
                            containerStyle={{
                                width: 120,
                                borderRadius: 10,
                            }}
                            buttonStyle={{
                                backgroundColor: theme.colors['red-100'],
                            }}
                            onPress={handleNextScreen}
                        />
                    </>
                ) : (
                    <Button
                        title="Начать!"
                        containerStyle={{
                            width: '80%',
                            borderRadius: 10,
                            marginRight: 'auto',
                            marginLeft: 'auto',
                        }}
                        buttonStyle={{
                            backgroundColor: theme.colors['red-100'],
                        }}
                        titleStyle={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}
                        onPress={() => toWelcomePage()}
                    />
                )}
            </View>
        </SafeArea>
    )
}

export default Onboarding

const makeStyles = (theme: RNETheme) =>
    StyleSheet.create({
        imageContainer: {
            width: '100%',
            // height: '50%',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        image: {
            width: '100%',
            resizeMode: 'contain',
        },
        indicatorContainer: {
            flexDirection: 'row',
            marginBottom: 5,
        },
        indicator: {
            marginTop: 40,
            marginRight: 3,
            width: 66,
            height: 3,
            backgroundColor: '#C4C4C4',
        },
        activeIndicator: {
            marginTop: 40,
            marginRight: 3,
            width: 66,
            height: 3,
            backgroundColor: theme.colors['red-75'],
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 40,
            marginBottom: 60,
        },
    })
