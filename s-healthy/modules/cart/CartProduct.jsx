import { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native"
import { UserContext } from "../../lib/context/user.context";
import APP_IMAGES from "../../assets/index"
import Checkbox from "../components/checkbox/CheckBoxCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CardCartProduct = ({ id, image, name, price, total, onPressReduce, onPressIncreasing, quantity, handleCheckboxChange, onPressDeleteItem }) => {

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }

        const truncatedText = text.substring(0, text.length - maxLength) + '...';
        return truncatedText;
    };
    return (
        <View style={styles.container}>
            {/* Header */}


            {/* Item 1 */}
            <View style={styles.rowContainer}>
                <Checkbox onChange={handleCheckboxChange} />
                <View style={styles.productContainer}>
                    <Image
                        source={{ uri: image }}
                        style={styles.productImage}
                    />
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={styles.productName}>{truncateText(name, 15)}</Text>
                        <Text style={styles.priceText}>{price}đ</Text>
                    </View>
                </View>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={onPressReduce}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={onPressIncreasing}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.totalText}>{total}đ</Text>
                <TouchableOpacity style={styles.deleteContainer} onPress={onPressDeleteItem}>
                    <Text style={styles.deleteText}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const CartProduct = () => {
    const navigation = useNavigation()
    const { updateLengthItem } = useContext(UserContext)

    const [getDataAsyncStorage, setGetDataAsyncStorage] = useState([])
    const [isCheck, setIsCheck] = useState(false)
    const [selectedItems, setSelectedItems] = useState([]);


    const isButtonDisabled = selectedItems.length === 0;
    updateLengthItem(selectedItems.length + 1)

    const getCartProducts = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Products');
            if (jsonValue !== null) {
                const cartProducts = JSON.parse(jsonValue);

                const updatedCartProducts = cartProducts.map((product) => ({
                    ...product,
                    quantity: 1,
                    total: product.price,
                }));

                return updatedCartProducts;
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
        }
    };
    useEffect(() => {
        const fetchProductData = async () => {
            const fetchedCartProducts = await getCartProducts();
            setGetDataAsyncStorage(fetchedCartProducts);
        };
        fetchProductData();
    }, []);


    const onPressReduce = (id) => {
        const updatedCartProducts = getDataAsyncStorage.map((product) => {
            if (product.id === id && product.quantity > 1) {
                return {
                    ...product,
                    quantity: product.quantity - 1,
                    total: product.price * (product.quantity - 1),
                };
            }
            return product;
        });

        setGetDataAsyncStorage(updatedCartProducts);
    };

    const onPressIncreasing = (id) => {
        const updatedCartProducts = getDataAsyncStorage.map((product) => {
            if (product.id === id) {
                return {
                    ...product,
                    quantity: product.quantity + 1,
                    total: product.price * (product.quantity + 1),
                };
            }
            return product;
        });

        setGetDataAsyncStorage(updatedCartProducts);
    };


    const removeItemAsyncStorage = async (id) => {
        try {
            const jsonValue = await AsyncStorage.getItem('Products');
            if (jsonValue !== null) {
                const cartProducts = JSON.parse(jsonValue);

                const updatedCartProducts = cartProducts.filter((product) => product.id !== id);

                await AsyncStorage.setItem('Products', JSON.stringify(updatedCartProducts));
                setGetDataAsyncStorage(updatedCartProducts);
            }
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu từ AsyncStorage:', error);
        }
    };

    const onPressDeleteItem = (id) => {
        removeItemAsyncStorage(id);
    }
    const handleCheckboxChange = (value, item) => {
        setIsCheck(value);
        if (value === true) {
            const isItemSelected = selectedItems.some(({ value }) => value.id == item.value.id);

            if (!isItemSelected) {
                const updatedSelectedItems = [...selectedItems, item];
                setSelectedItems(updatedSelectedItems);
            }
        } else {
            const updatedSelectedItems = selectedItems.filter(({ value }) => {
                return value.id !== item.value.id;
            });

            setSelectedItems(updatedSelectedItems);

        }

    };
    const handleOnPressPay = () => {
        navigation.navigate('ProductStack', { screen: 'PayProduct', params: { selectedItems: selectedItems } });
    }
    // console.log("Item data:", JSON.stringify(selectedItems, null, 2));

    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={styles.rowContainer}>
                <Text style={styles.headerText && styles.headerTextProduct}>Sản phẩm</Text>
                <Text style={styles.headerText}>Số lượng</Text>
                <Text style={styles.headerText}>Tổng</Text>
                <Text style={styles.headerText}>Xóa</Text>
            </View>
            {Array.isArray(getDataAsyncStorage) && getDataAsyncStorage.length > 0 ? (
                getDataAsyncStorage.map((value, index) => (
                    <View key={value._id}>
                        <CardCartProduct
                            id={value.id}
                            image={value.image}
                            name={value.name}
                            price={value.price}
                            quantity={value.quantity}
                            total={value.total}
                            onPressReduce={() => onPressReduce(value.id)}
                            onPressIncreasing={() => onPressIncreasing(value.id)}
                            handleCheckboxChange={(isCheck) => handleCheckboxChange(isCheck, { value })}
                            onPressDeleteItem={() => onPressDeleteItem(value.id)} />
                    </View>
                ))
            ) : (
                <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Chưa có sản phẩm nào</Text>
                </View>
            )}
            <View style={{ alignItems: 'flex-end', marginRight: 30 }}>
                <TouchableOpacity style={styles.OpacityPay} onPress={handleOnPressPay} disabled={isButtonDisabled}>
                    <Text style={{ color: 'white' }} >Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
    },

    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        backgroundColor: 'white',
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
    },
    headerTextProduct: {
        marginLeft: 10,
        width: "50%"
    },
    checkboxContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productContainer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 5,
        borderRadius: 10
    },
    productName: {
        marginTop: 5,
        fontSize: 13,
    },
    priceText: {
        flex: 1,
        textAlign: 'center',
    },
    quantityContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButton: {
        width: 15,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    quantityButtonText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    quantityText: {
        marginHorizontal: 5,
        fontSize: 10,
    },
    totalText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
    },
    deleteContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteText: {
        color: 'red',
        fontSize: 14,
    },
    OpacityPay: {
        width: '50%',
        height: 40,
        backgroundColor: '#c89595',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default CartProduct