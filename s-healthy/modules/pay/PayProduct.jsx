import { Text, View, StyleSheet, Platform, ToastAndroid, Alert, ScrollView, Image, TouchableOpacity } from "react-native"
import InputCustom from "../components/input/InputCustom";
import { useEffect, useState } from "react";
import { ParseValid } from '../../lib/validate/parseValid'
import { Validate } from '../../lib/validate/validate'
import BottomLayout from '../bottom-layout/BottomLayout'
import APP_IMAGE from '../../assets/index'
const Product = ({ image, name, quantity, total, price }) => {
    return (
        <View style={{ marginVertical: 5, flexDirection: 'row' }}>
            <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri: image }} />
            <View style={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, color: '#c89595' }}>{name}</Text>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text>Số lượng: {quantity} - - - </Text>
                    <Text>{total} đ</Text>
                </View>
                <Text>Giá: {price}đ</Text>
            </View>
        </View>
    )
}
const Pay = ({ length, price, total }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Tổng số tiền ({length} sản phẩm)</Text>
                <Text>{price} đ</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <Text>Giảm giá</Text>
                <Text>0 đ</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Cần thanh toán</Text>
                <Text>{total} đ</Text>
            </View>
        </View>
    )
}

const PayProduct = ({ route }) => {
    const { selectedItems } = route.params;
    const [dataCart, setDataCart] = useState([])

    const numberOfItems = dataCart.length;
    const totalValue = dataCart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.value.total;
    }, 0);
    useEffect(() => {
        setDataCart(selectedItems)
    }, [])

    console.log("haha:", JSON.stringify(selectedItems, null, 2));
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
        <ScrollView style={{ paddingHorizontal: 20, backgroundColor: 'white' }}>
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
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Sản phẩm</Text>
                {dataCart.map((value, index) => (
                    <View key={index}>
                        <Product
                            image={value.value.image}
                            name={value.value.name}
                            price={value.value.price}
                            quantity={value.value.quantity}
                            total={value.value.total}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.viewPay}>
                <Pay
                    length={numberOfItems}
                    price={totalValue}
                    total={totalValue} />
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ width: '50%', backgroundColor: '#c89595', height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomLayout />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewInfo: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 16,
        padding: 10
    },
    viewProduct: {
        marginVertical: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 16,
        padding: 10
    },
    viewPay: {
        marginVertical: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 16,
        padding: 10
    }
})

export default PayProduct;