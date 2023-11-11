import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import InputCustom from "../components/input/InputCustom"
import APP_IMAGES from "../../assets/index"

import { ParseValid } from '../../lib/validate/parseValid'
import { Validate } from '../../lib/validate/validate'
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"


const Register = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')


    const [listError, setListError] = useState({
        password: null,
        email: null,
        name: null,
    })
    const [formValue, setFormValue] = useState({
        password: null,
        email: null,
        name: null,
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
        if (name === "name") setName(value)

        const inputValue = value.trim()
        const validObject = ParseValid(validate)
        const error = Validate(name, inputValue, validObject, password)
        setListError({ ...listError, [name]: error })
        setFormValue({ ...formValue, [name]: inputValue })
    }

    const handlePressRegister = async () => {
        if (!email || !password || !name) {
            return NotifyMessage("Error: Vui long nhap day du thong tin");
        }

        try {
            const response = await fetch("http://54.196.170.115:9001/api/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name }),
            });
            const data = await response.json();
            if (response.status === 201) {
                navigation.navigate('AuthStack', { screen: 'Login' })
                NotifyMessage("Đăng ký thành công vui lòng kiểm tra gmail trước khi đăng nhập");
                setEmail("");
                setPassword("");
                setName("");
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
                    Đăng ký
                </Text>
            </View>
            <View style={styles.inputView}>

                <InputCustom
                    value={name}
                    label={'Họ và tên'}
                    icon={APP_IMAGES.user}
                    name={'name'}
                    onChange={handleChangeInput}
                    err={listError.name}
                    validate={'required'}
                    styleErr={listError.name}
                />

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
                <TouchableOpacity style={styles.buttonLogin} onPress={handlePressRegister}>
                    <Text style={styles.buttonText}>Đăng ký</Text>
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
        fontSize: 32,
        color: '#c89595'
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
export default Register