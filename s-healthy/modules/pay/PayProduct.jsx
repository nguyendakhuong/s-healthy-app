import { Text, View, StyleSheet, Platform, ToastAndroid, Alert, ScrollView, Image, TouchableOpacity } from "react-native"
import InputCustom from "../components/input/InputCustom";
import { useContext, useEffect, useState } from "react";
import { ParseValid } from '../../lib/validate/parseValid'
import { Validate } from '../../lib/validate/validate'
import BottomLayout from '../bottom-layout/BottomLayout'
import APP_IMAGE from '../../assets/index'
import { UserContext } from "../../lib/context/user.context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    const { selectedItems, product } = route.params;
    const [dataCart, setDataCart] = useState([])
    const [status, setStatus] = useState('')
    const numberOfItems = dataCart.length;
    const [totalValueProduct, setTotalValueProduct] = useState(0)
    const { user } = useContext(UserContext);
    const navigation = useNavigation()

    useEffect(() => {
        if (selectedItems) {
            setDataCart(selectedItems);

            const totalValue = selectedItems.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.value.total;
            }, 0);
            setTotalValueProduct(totalValue);
        }
    }, [selectedItems]);


    useEffect(() => {
        if (product) {
            setDataCart(product)
            setTotalValueProduct(product.price)
        }
    }, [])

    // console.log("haha:", JSON.stringify(selectedItems, null, 2));
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
    let newDataCart;
    if (Array.isArray(dataCart)) {
        newDataCart = dataCart.map(item => item.value);
    } else {
        newDataCart = [dataCart]; // Chuyển đối tượng thành một mảng để tiện xử lý
    }

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
    const deleteDataByIds = async (ids) => {
        try {
            // Lấy dữ liệu từ AsyncStorage
            const data = await AsyncStorage.getItem('Products');
            let parsedData = JSON.parse(data);

            // Kiểm tra xem dữ liệu đã tồn tại hay chưa
            if (parsedData !== null) {
                // Lọc và xóa các mục dựa trên mảng id
                parsedData = parsedData.filter((item) => !ids.includes(item.id));

                // Cập nhật dữ liệu trong AsyncStorage
                await AsyncStorage.setItem('Products', JSON.stringify(parsedData));
                console.log("Xóa thành công")
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleOnPressPay = async () => {
        console.log("vao1")
        if (!user) {
            NotifyMessage("Vui lòng đăng nhập trước khi thanh toán")
            return;
        }
        if (!info.name && !info.phone && !info.email && !info.note && !info.city && !info.district && !info.address) {
            NotifyMessage("Vui lòng nhập đầy đủ thông tin trước khi thanh toán")
            return;
        }
        if (user) {
            setStatus('lock')
        }
        console.log("vao2")
        const orderProducts = newDataCart.map(item => {
            return {
                product: item.id,
                price: item.price,
                amount: item.quantity
            };
        });
        console.log("vao3")
        const phone = parseInt(info.phone);

        const order = {
            status: status,
            user: user,
            nameReceiver: info.name,
            email: info.email,
            totalPrice: totalValueProduct,
            phoneReceiver: phone,
            notifyReceiver: info.note,
            paymentCode: "COD",
            province: info.city,
            district: info.district,
            address: info.address,
            promotionCode: "",
            orderProducts: orderProducts
        }
        console.log("vao4")
        try {
            const response = await fetch("http://54.196.170.115:9001/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });
            console.log("vao5")
            const data = await response.json();
            if (data.statusCode === 201) {
                console.log("vao6")
                NotifyMessage("Đặt hàng thành công");
                const productIds = newDataCart.map(item => item.id);
                console.log("vao7")
                deleteDataByIds(productIds)
                console.log("vao8")
                navigation.goBack();
            }
        } catch (e) {
            console.log(e)
        }

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
                    validate={'required|regEmail'}
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
                    err={listError.note}
                    validate={'required'}
                />
            </View>
            <View style={styles.viewProduct}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Sản phẩm</Text>
                {Array.isArray(newDataCart) && newDataCart.length > 0 ? (
                    newDataCart.map((value, index) => (
                        <View key={index}>
                            <Product
                                image={value.image}
                                name={value.name}
                                price={value.price}
                                quantity={value.quantity}
                                total={value.total}
                            />
                        </View>
                    ))
                ) : (
                    <Product
                        image={newDataCart.image}
                        name={newDataCart.name}
                        price={newDataCart.price}
                        quantity={newDataCart.quantity}
                        total={newDataCart.price} />
                )}
            </View>
            <View style={styles.viewPay}>
                <Pay
                    length={numberOfItems}
                    price={totalValueProduct}
                    total={totalValueProduct} />
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{
                            width: '50%',
                            backgroundColor: '#c89595',
                            height: 30,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={handleOnPressPay}>
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