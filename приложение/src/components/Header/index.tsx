import { Button, Header as RNEHeader, Icon, useTheme } from '@rneui/themed'
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { blackLogo } from '../../../assets'
import { RootStackParamList } from '../../navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Svg, { Path } from 'react-native-svg'

type HeaderNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'home'
>

const Header = ({ navigation }: { navigation: HeaderNavigationProp }) => {
    const { theme, updateTheme } = useTheme()
    return (
        <RNEHeader
            statusBarProps={{
                backgroundColor: 'transparent',
            }}
            containerStyle={styles.containerStyle}
            leftContainerStyle={{
                justifyContent: 'flex-end',
            }}
            rightContainerStyle={{
                justifyContent: 'flex-end',
            }}
            leftComponent={
                <Button
                    type="clear"
                    buttonStyle={styles.buttonStyle}
                    TouchableComponent={TouchableWithoutFeedback}
                    onPress={() => console.log('editentry')}
                    icon={
                        <Icon
                            type="font-awesome-5"
                            name="pen"
                            size={32}
                            color={theme.colors.black}
                        />
                    }
                />
            }
            rightComponent={
                <Button
                    type="clear"
                    buttonStyle={styles.buttonStyle}
                    TouchableComponent={TouchableWithoutFeedback}
                    onPress={() => navigation.navigate('setting')}
                    icon={
                        <Icon
                            type="font-awesome-5"
                            name="cog"
                            size={32}
                            color={theme.colors.black}
                        />
                    }
                />
            }
        />
    )
}

export default Header

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#efeef3s',
        borderBottomWidth: 0,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    logo: {
        height: 49,
        resizeMode: 'contain',
    },
    buttonStyle: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
})
