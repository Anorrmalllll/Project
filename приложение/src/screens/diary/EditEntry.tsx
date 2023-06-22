import {
    Keyboard,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { SafeArea } from '../../components/safearea'
import { Button, Icon, Image, Text, useTheme } from '@rneui/themed'
import { SetStateAction, useEffect, useRef, useState } from 'react'
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
import SubHeader from '../../components/Header/SubHeader'
import { RootStackParamList } from '../../navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RNETheme } from '../../theme'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import AsyncStorage from '@react-native-async-storage/async-storage'

type EditEntryScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'editentry'
>

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

const EditEntry = ({
    route,
    navigation,
}: {
    route: any,
    navigation: EditEntryScreenNavigationProp
}) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('Отвезти кошку к ветеринару в 13:00')
    const [selectedEmoji, setSelectedEmoji] = useState(0)
    const [currentEntry, setCurrentEntry] = useState<any>()

    const { theme } = useTheme()
    const styles = makeStyles(theme)

    const richText = useRef()

    const [descHTML, setDescHTML] = useState('')
    const [showDescError, setShowDescError] = useState(false)

    const richTextHandle = (descriptionText: SetStateAction<string>) => {
        if (descriptionText) {
            setShowDescError(false)
            setDescHTML(descriptionText)
        } else {
            setShowDescError(true)
            setDescHTML('')
        }
    }

    const saveItem = (idx: number) => {
        setSelectedEmoji(idx)
        saveEditItem({
            id: currentEntry.id,
            date,
            title,
            text,
            emoji: emoji[selectedEmoji].name,
        })
    }

    const saveEditItem = async (item: any) => {
        const result: any = await AsyncStorage.getItem('entries')

        navigation.navigate('home')
        await AsyncStorage.setItem('entries', JSON.stringify(JSON.parse(result).map((el: any) => {
            if (el.id === item.id)
                el = item

            return el
        })))
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true) // or some other action
            }
        )
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false) // or some other action
            }
        )

        return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }
    }, [])

    useEffect(() => {
        getEntries()
    }, [route.params])

    const getEntries = async () => {
        // AsyncStorage.removeItem('entries')
        const result = JSON.parse(await AsyncStorage.getItem('entries') || '[]')
        console.log('route.params: ', route.params);
        console.log('result: ', result);
        console.log('---', result.find((el: any) => el.id === route.params));
        const entry = result.find((el: any) => el.id === route.params);
        setCurrentEntry(entry)
        setDate(entry.date)
        setTitle(entry.title)
        setText(entry.text)
        setSelectedEmoji(emoji.findIndex(el => el.name === entry.emoji))
    }
    return (
        <SafeArea style={styles.container}>
            <SubHeader title="Редактировать запись" navigation={navigation} />

            <View
                style={{
                    backgroundColor:
                        theme.mode === 'light' ? '#FFFFFF' : '#484848',
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                }}
            >
                <Text style={{ fontSize: 18 }}>{date} г.</Text>
                <TextInput
                    style={{ fontSize: 34 }}
                    onChangeText={(title) => setTitle(title)}
                    value={title}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    marginVertical: 20,
                }}
            >
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {/* <RichToolbar
                    editor={richText}
                    selectedIconTint="#873c1e"
                    iconTint="#312921"
                    actions={[
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.setBold,
                        actions.setItalic,
                        actions.setUnderline,
                        actions.setStrikethrough,
                        actions.indent,
                        actions.outdent,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.insertLink,
                    ]}
                    style={styles.richTextToolbarStyle}
                /> */}
                    {[
                        'align-left',
                        'align-center',
                        'align-right',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                    ].map((value, idx) => (
                        <Button
                            key={idx}
                            type="clear"
                            buttonStyle={{
                                paddingHorizontal: 0,
                                paddingVertical: 0,
                                marginLeft: idx === 0 ? 0 : 32,
                            }}
                            icon={
                                <Icon
                                    type="font-awesome-5"
                                    name={value}
                                    size={32}
                                    color={theme.colors.black}
                                />
                            }
                        />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.textContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* <RichEditor
                        ref={richText}
                        onChange={richTextHandle}
                        placeholder="Write your cool content here :)"
                        androidHardwareAccelerationDisabled={true}
                        style={styles.richTextEditorStyle}
                        initialHeight={250}
                    /> */}
                    <TextInput
                        multiline
                        onChangeText={(text) => setText(text)}
                        value={text}
                        style={{
                            height: '100%',
                            fontSize: 20,
                            color: theme.colors.black,
                        }}
                    />
                </ScrollView>
            </View>

            <View
                style={{
                    ...styles.mood,
                    display: keyboardVisible ? 'none' : 'flex',
                }}
            >
                <View
                    style={{
                        width: '30%',
                        justifyContent: 'center',
                    }}
                >
                    <Text h4 h4Style={{ fontSize: 20 }}>
                        Настроение:
                    </Text>
                </View>
                <View
                    style={{
                        width: '70%',
                        paddingVertical: 10,
                        flexDirection: 'row',
                    }}
                >
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            {emoji.map(({ image }, idx) => {
                                return (
                                    <Button
                                        key={idx}
                                        type="clear"
                                        TouchableComponent={
                                            TouchableWithoutFeedback
                                        }
                                        buttonStyle={
                                            idx === selectedEmoji
                                                ? styles.activeBtnStyle
                                                : styles.btnStyle
                                        }
                                        onPress={() => saveItem(idx)}
                                        icon={
                                            <Image
                                                style={{
                                                    width: idx === selectedEmoji ? 42 : 32,
                                                    height: idx === selectedEmoji ? 42 : 32,
                                                    resizeMode: 'contain',
                                                }}
                                                // source={emoji === 'sad' ? veryhappy : verysad}
                                                source={image}
                                            />
                                        }
                                    />
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeArea>
    )
}

export default EditEntry

const makeStyles = (theme: RNETheme) =>
    StyleSheet.create({
        container: {
            paddingRight: 0,
            paddingLeft: 0,
            backgroundColor: theme.colors['grey-100'],
        },
        btnStyle: {
            paddingHorizontal: 5,
            paddingVertical: 5,
            marginHorizontal: 5,
            borderWidth: 3,
            borderRadius: 50,
            borderColor: 'transparent',
        },
        activeBtnStyle: {
            paddingHorizontal: 5,
            paddingVertical: 5,
            marginHorizontal: 5,
            borderWidth: 3,
            borderRadius: 50,
            borderColor: '#EE3A46',
            backgroundColor: '#F69CA2',
        },
        richTextEditorStyle: {
            // borderBottomLeftRadius: 10,
            // borderBottomRightRadius: 10,
            // borderWidth: 1,
            // borderColor: '#ccaf9b',
            // shadowColor: '#000',
            // shadowOffset: {
            //     width: 0,
            //     height: 2,
            // },
            // shadowOpacity: 0.23,
            // shadowRadius: 2.62,
            elevation: 4,
            fontSize: 20,
        },
        richTextToolbarStyle: {
            width: '100%',
            // backgroundColor: '#c6c3b3',
            // padding: 0,
            // borderColor: '#c6c3b3',
            // borderTopLeftRadius: 10,
            // borderTopRightRadius: 10,
            // borderWidth: 1,
        },
        textContainer: {
            backgroundColor: theme.mode === 'light' ? '#FFFFFF' : '#484848',
            opacity: 1,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: 20,
            paddingTop: 16,
            flex: 1,
        },
        mood: {
            paddingHorizontal: 20,
            flexDirection: 'row',
        },
    })
