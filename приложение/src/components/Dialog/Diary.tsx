import { Dialog, Icon, useTheme } from '@rneui/themed'
import { Dialog as DialogType } from '../../screens/diary/Home'
import { TouchableWithoutFeedback } from 'react-native'
import { RootStackParamList } from '../../navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type DiaryDialogNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'home'
>

const DiaryDialog = ({
    setDialog,
    removeItem,
    navigation,
    id,
}: {
    setDialog: (data: DialogType) => void
    removeItem: (id: string) => void
    navigation: DiaryDialogNavigationProp
    id: string
}) => {
    const { theme } = useTheme()

    const handleRemoveItem = () => {
        removeItem(id)
        setDialog({ show: false, index: null })
    }

    return (
        <Dialog
            isVisible={true}
            onBackdropPress={() => setDialog({ show: false, index: null })}
            overlayStyle={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: 20,
                borderRadius: 25,
                backgroundColor: theme.mode === 'light' ? '#FFFFFF' : '#242424',
            }}
        >
            <Dialog.Button
                title="Просмотр"
                TouchableComponent={TouchableWithoutFeedback}
                onPress={() => {
                    setDialog({ show: false, index: null })
                    navigation.navigate('viewentry', id)
                }}
                icon={
                    <Icon
                        name="eye"
                        type="font-awesome-5"
                        color={theme.colors.black}
                        style={{ marginRight: 18 }}
                    />
                }
                titleStyle={{
                    color: theme.colors.black,
                }}
                containerStyle={{
                    alignItems: 'flex-start',
                }}
                buttonStyle={{
                    padding: 0,
                }}
            />
            <Dialog.Button
                title="Редактировать"
                TouchableComponent={TouchableWithoutFeedback}
                onPress={() => {
                    setDialog({ show: false, index: null })
                    navigation.navigate('editentry', id)
                }}
                icon={
                    <Icon
                        name="pen"
                        type="font-awesome-5"
                        color={theme.colors.black}
                        style={{ marginRight: 18 }}
                    />
                }
                titleStyle={{
                    color: theme.colors.black,
                }}
                containerStyle={{
                    alignItems: 'flex-start',
                    marginTop: 15,
                }}
                buttonStyle={{
                    padding: 0,
                }}
            />
            <Dialog.Button
                title="Удалить"
                TouchableComponent={TouchableWithoutFeedback}
                onPress={() => handleRemoveItem()}
                icon={
                    <Icon
                        name="trash"
                        type="font-awesome-5"
                        color="#EE3A46"
                        style={{ marginRight: 18 }}
                    />
                }
                titleStyle={{
                    color: '#EE3A46',
                }}
                containerStyle={{
                    alignItems: 'flex-start',
                    marginTop: 15,
                }}
                buttonStyle={{
                    padding: 0,
                }}
            />
        </Dialog>
    )
}

export default DiaryDialog
