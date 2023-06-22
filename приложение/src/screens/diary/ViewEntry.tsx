import { Colors, FAB, Icon, Text, Theme, useTheme } from '@rneui/themed'
import { SafeArea } from '../../components/safearea'
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { veryhappy } from '../../../assets/emoji'
import SubHeader from '../../components/Header/SubHeader'
import { RootStackParamList } from '../../navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RNETheme } from '../../theme'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ViewEntryScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'viewentry'
>

const ViewEntry = ({
    route,
    navigation,
}: {
    route: any,
    navigation: ViewEntryScreenNavigationProp
}) => {
    const { theme } = useTheme()
    const styles = makeStyles(theme)
    const [currentEntry, setCurrentEntry] = useState<any>()

    useEffect(() => {
        getEntries()
    }, [route.params])

    const getEntries = async () => {
        // AsyncStorage.removeItem('entries')
        const result = JSON.parse(await AsyncStorage.getItem('entries') || '[]')
        console.log('route.params: ', route.params);
        console.log('result: ', result);
        console.log('---', result.find((el: any) => el.id === route.params));
        setCurrentEntry(result.find((el: any) => el.id === route.params))
    }

    return (
        <SafeArea style={styles.container}>
            <SubHeader title="Просмотр" navigation={navigation} />

            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 32,
                    marginTop: 15,
                    marginBottom: 30,
                }}
            >
                <View style={{ width: '65%' }}>
                    <Text h2 h2Style={{ fontSize: 32 }}>
                        {currentEntry?.title}
                    </Text>
                    <Text style={{ fontSize: 18 }}>{currentEntry?.date} г.</Text>
                </View>
                <View
                    style={{
                        width: '35%',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        style={{
                            width: '100%',
                            resizeMode: 'contain',
                        }}
                        source={veryhappy}
                    />
                </View>
            </View>

            <View style={styles.textContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ fontSize: 20 }}>
                        {currentEntry?.text}
                    </Text>
                </ScrollView>

                <FAB
                    // loading
                    color="#EE3A46"
                    visible={true}
                    placement="right"
                    icon={{
                        name: 'pen',
                        type: 'font-awesome-5',
                        color: 'white',
                    }}
                    onPress={() => navigation.navigate('editentry')}
                />
            </View>
        </SafeArea>
    )
}

export default ViewEntry

const makeStyles = (theme: RNETheme) =>
    StyleSheet.create({
        container: {
            paddingRight: 0,
            paddingLeft: 0,
            backgroundColor: theme.colors['grey-100'],
        },
        textContainer: {
            backgroundColor: theme.mode === 'light' ? '#FFFFFF' : '#484848',
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            paddingHorizontal: 32,
            paddingVertical: 16,
            flex: 1,
        },
    })
