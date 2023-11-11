import { Text, View, StyleSheet, TouchableOpacity, Platform, Alert, ToastAndroid } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import InputCustom from "../components/input/InputCustom"
import APP_IMAGES from "../../assets/index"
import { ParseValid } from '../../lib/validate/parseValid'
import { Validate } from '../../lib/validate/validate'
import { useContext, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { UserContext } from "../../lib/context/user.context"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { updateUser } = useContext(UserContext)

    const [listError, setListError] = useState({
        password: null,
        email: null,
    })
    const [formValue, setFormValue] = useState({
        password: null,
        email: null,
    })
    const NotifyMessage = (msg, text) => {
        if (Platform.OS === "android") {
            ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            Alert.alert(msg, text, [{ text: "OK" }], { cancelable: 1000 });
        }
    };


    const handleChangeInput = (value, validate, name) => {
        if (name === 'password') setPassword(value)
        if (name === 'email') setEmail(value)

        const inputValue = value.trim()
        const validObject = ParseValid(validate)
        const error = Validate(name, inputValue, validObject, password)
        setListError({ ...listError, [name]: error })
        setFormValue({ ...formValue, [name]: inputValue })
    }

    const handlePressLogin = async () => {
        if (!email || !password) {
            return NotifyMessage("Error: Vui long nhap day du thong tin");
        }

        try {
            const response = await fetch("http://54.196.170.115:9001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.status === 200) {
                const userData = { email: email, password: password };
                updateUser(userData);
                navigation.navigate('MainStack', { screen: 'Home' })
                NotifyMessage("Đăng nhập thành công");
                await AsyncStorage.setItem('username', email);
                await AsyncStorage.setItem('password', password);
            } else {
                NotifyMessage(
                    data.message,
                    "Vui long kiem tra lai tai khoan, mat khau"
                );
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={styles.viewTextLogin}>
                <Text style={styles.textLogin}>
                    Đăng nhập
                </Text>
            </View>
            <View style={styles.inputView}>
                <InputCustom
                    value={email}
                    label={'Email'}
                    icon={APP_IMAGES.email}
                    name={'email'}
                    onChange={handleChangeInput}
                    err={listError.email}
                    validate={'required|regEmail'}
                    styleErr={listError.email}
                />

                <InputCustom
                    value={password}
                    label={'Password'}
                    icon={APP_IMAGES.pass}
                    name={'password'}
                    iconErr={APP_IMAGES.hide_eye}
                    secureTextEntry={true}
                    onChange={handleChangeInput}
                    err={listError.password}
                    validate={'required'}
                    styleErr={listError.password}
                    iconUnhidePass={APP_IMAGES.unHide_eye}
                />
            </View>
            <View style={styles.viewButtonLogin}>
                <TouchableOpacity style={styles.buttonLogin} onPress={handlePressLogin}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewTextRegister}>
                <Text>Bạn chưa có tài khoản?</Text>
                <TouchableOpacity style={styles.textRegister}
                    onPress={() => navigation.navigate('AuthStack', { screen: 'Register' })}>
                    <Text style={{ color: '#c89595' }}>Đăng ký ngay</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    viewTextLogin: {
        alignItems: "center",
    },
    textLogin: {
        fontSize: 24,
    },
    inputView: {
        alignItems: "center",
    },
    viewButtonLogin: {
        marginTop: 20,
        alignItems: 'center'
    },
    buttonLogin: {
        backgroundColor: '#c89595',
        width: 250,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    viewTextRegister: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    textRegister: {
        marginLeft: 5,
    }
})

export default Login