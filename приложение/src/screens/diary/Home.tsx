import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { FAB, Input, useTheme } from '@rneui/themed'
import { SafeArea } from '../../components/safearea'
import DiaryCard, { Data } from '../../components/Card/Diary'
import DiaryDialog from '../../components/Dialog/Diary'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { RootStackParamList } from '../../navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useFocusEffect } from '@react-navigation/native'
import { RNETheme } from '../../theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    angry,
    depressed,
    happy,
    indifferent,
    laugh,
    sad,
    veryhappy,
    verysad,
} from '../../../assets/emoji'

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'home'
>

export type Dialog = {
    show: boolean
    index: null | string
}

const emoji = [
    {
        name: 'veryhappy',
        image: veryhappy,
    },
    {
        name: 'happy',
        image: happy,
    },
    {
        name: 'indifferent',
        image: indifferent,
    },
    {
        name: 'sad',
        image: sad,
    },
    {
        name: 'verysad',
        image: verysad,
    },
    {
        name: 'depressed',
        image: depressed,
    },
    {
        name: 'laugh',
        image: laugh,
    },
    {
        name: 'angry',
        image: angry,
    },
]

const HomeScreen = ({
    navigation,
}: {
    navigation: HomeScreenNavigationProp
}) => {
    const { theme } = useTheme()
    const styles = makeStyles(theme)
    const [dialog, setDialog] = useState<Dialog>({ show: false, index: null })
    const [search, setSearch] = useState('')

    const [CardData, setCardData] = useState<any>([])
    const [filteredCardData, setFilteredCardData] = useState<any>([])

    useEffect(() => {
        navigation.addListener('focus', () => {
            getEntries()
        });
        getEntries()
    }, [])

    useEffect(() => {
        setFilteredCardData(CardData.filter((item: any) =>
            item.title.toLowerCase().includes(search.toLowerCase())
        ))
    }, [search])

    const getEntries = async () => {
        const result = await AsyncStorage.getItem('entries')
        setCardData(JSON.parse(result || '[]'))
        setFilteredCardData(JSON.parse(result || '[]'))
    }

    const removeItem = async (id: string) => {
        const result: any = await AsyncStorage.getItem('entries')
        await AsyncStorage.setItem('entries', JSON.stringify(JSON.parse(result).filter((el: any) => el.id !== id)))
        getEntries()
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <SafeArea style={{ paddingTop: 0, backgroundColor: 'transparent' }}>
                <Input
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={{
                        fontSize: 12,
                        color: theme.mode === 'light' ? '#C9C9DC' : '#B9B9B9',
                    }}
                    placeholderTextColor={
                        theme.mode === 'light' ? '#C9C9DC' : '#B9B9B9'
                    }
                    placeholder="Поиск записей"
                    rightIcon={{
                        type: 'font-awesome',
                        name: 'search',
                        color: theme.mode === 'light' ? '#C9C9DC' : '#B9B9B9',
                    }}
                    onChangeText={(val) => setSearch(val)}
                    value={search}
                />

                {filteredCardData.length ?
                    <FlatList
                        style={{ marginTop: 15 }}
                        showsVerticalScrollIndicator={false}
                        data={filteredCardData}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() =>
                                    setDialog({ show: true, index: item.id })
                                }
                            >
                                <DiaryCard data={item} theme={theme} />
                            </TouchableOpacity>
                        )}
                    /> : <>
                        <Text
                            style={{
                                color: '#101010',
                                fontSize: 12,
                                paddingTop: 24
                            }}
                        >Ничего не найдено</Text>
                    </>}
            </SafeArea>

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
                onPress={() => navigation.navigate('makeentry')}
            />

            {dialog.show && (
                <DiaryDialog
                    setDialog={setDialog}
                    removeItem={removeItem}
                    id={dialog.index || ''}
                    navigation={navigation}
                />
            )}
        </View>
    )
}

export default HomeScreen

const makeStyles = (theme: RNETheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors['grey-100'],
        },
        inputContainerStyle: {
            backgroundColor: theme.mode === 'light' ? 'white' : '#484848',
            paddingHorizontal: 17,
            paddingVertical: 15,
            borderRadius: 15,
        },
    })
