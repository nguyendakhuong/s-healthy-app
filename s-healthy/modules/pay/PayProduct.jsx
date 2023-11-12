import { Text, View, StyleSheet, Platform, ToastAndroid, Alert, ScrollView } from "react-native"
import InputCustom from "../components/input/InputCustom";
import { useState } from "react";
import { ParseValid } from '../../lib/validate/parseValid'
import { Validate } from '../../lib/validate/validate'
const PayProduct = () => {
    const [info, setInfo] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        district: '',
        address: '',
        note: '',
    })

    const [listError, setListError] = useState({
        name: null,
        phone: null,
        email: null,
        city: null,
        district: null,
        address: null,
        note: null,
    })
    const NotifyMessage = (msg, text) => {
        if (Platform.OS === "android") {
            ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            Alert.alert(msg, text, [{ text: "OK" }], { cancelable: 1000 });
        }
    };

    const handleChangeInput = (value, validate, name) => {

        const inputValue = value.trim()
        const validObject = ParseValid(validate)
        const error = Validate(name, inputValue, validObject)
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: inputValue,
        }));
        setListError({ ...listError, [name]: error })
    }
    return (
        <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
            <View style={styles.viewInfo}>
                <Text style={{ fontSize: 20 }}>Thông tin khách hàng</Text>
                <InputCustom
                    value={info.name}
                    label={'Họ và tên'}
                    name={'name'}
                    onChange={handleChangeInput}
                    err={listError.name}
                    validate={'required'}
                />
                <InputCustom
                    value={info.phone}
                    label={'Số điện thoại'}
                    name={'phone'}
                    onChange={handleChangeInput}
                    err={listError.phone}
                    validate={'required||checkNumber'}
                />
                <InputCustom
                    value={info.email}
                    label={'Email'}
                    name={'email'}
                    onChange={handleChangeInput}
                    err={listError.email}
                    validate={'required'}
                />
                <InputCustom
                    value={info.city}
                    label={'Thành Phó'}
                    name={'city'}
                    onChange={handleChangeInput}
                    err={listError.city}
                    validate={'required'}
                />
                <InputCustom
                    value={info.district}
                    label={'Quân Huyện'}
                    name={'district'}
                    onChange={handleChangeInput}
                    err={listError.district}
                    validate={'required'}
                />
                <InputCustom
                    value={info.address}
                    label={'Địa chỉ'}
                    name={'address'}
                    onChange={handleChangeInput}
                    err={listError.address}
                    validate={'required'}
                />
                <InputCustom
                    value={info.note}
                    label={'Ghi chú'}
                    name={'note'}
                    onChange={handleChangeInput}
                    err={listError.address}
                    validate={'required'}
                />
            </View>
            <View style={styles.viewProduct}>

            </View>
            <View style={styles.viewPay}>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewInfo: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 16,
        padding: 10
    }
})

export default PayProduct;