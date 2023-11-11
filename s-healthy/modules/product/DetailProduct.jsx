import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import APP_IMAGE from "../../assets/index"
import { ScrollView } from "react-native-gesture-handler"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../lib/context/user.context"
import BottomLayout from "../bottom-layout/BottomLayout"
const CardDetailProduct = ({
    image,
    image1,
    image2,
    image3,
    image4,
    name,
    code,
    price,
    onPressBuyNow,
    onPressToCard }) => {
    return (

        <View style={styles.viewContainer}>
            <View style={styles.viewImage}>
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.viewImageItem}>
                <Image style={styles.imageItem} source={{ uri: image1 }} />
                <Image style={styles.imageItem} source={{ uri: image2 }} />
            </View>
            <View style={styles.viewImageItem}>
                <Image style={styles.imageItem} source={{ uri: image3 }} />
                <Image style={styles.imageItem} source={{ uri: image4 }} />
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textName}>{name}</Text>
            <View style={styles.viewReview}>
                <Text>{code}</Text>
                <Image style={styles.imageStart} source={APP_IMAGE.start} />
                <Image style={styles.imageStart} source={APP_IMAGE.start} />
                <Image style={styles.imageStart} source={APP_IMAGE.start} />
                <Image style={styles.imageStart} source={APP_IMAGE.start} />
                <Image style={styles.imageStart} source={APP_IMAGE.start} />
                <Text>(review)</Text>
            </View>
            <Text style={styles.price}>{price}</Text>
            <View style={styles.viewOpacity}>
                <TouchableOpacity style={styles.buy} onPress={onPressBuyNow}>
                    <Text>Mua ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toCard} onPress={onPressToCard}>
                    <Text>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const DetailProduct = ({ route }) => {
    const { productId } = route.params;
    const [productData, setProductData] = useState();
    console.log("productData==========>", productData)
    const { token } = useContext(UserContext);

    useEffect(() => {
        const getDataProduct = async () => {
            try {
                const response = await fetch(`http://54.196.170.115:9001/api/product/detail?_id=${productId}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                });

                const data = await response.json();
                if (data.statusCode === 200) {
                    setProductData(data.data);
                }
            } catch (e) {
                console.log("Error:", e);
            }
        };

        getDataProduct();
    }, []);

    return (
        <ScrollView>
            {productData ? (
                <View>
                    <CardDetailProduct
                        image={productData.imgUrls[0]}
                        image1={productData.imgUrls[1]}
                        image2={productData.imgUrls[2]}
                        image3={productData.imgUrls[3]}
                        image4={productData.imgUrls[4]}
                        name={productData.name}
                        code={productData.categoryCode}
                        price={productData.price}
                        onPressBuyNow={() => { }}
                        onPressToCard={() => { }}
                    />
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
            <BottomLayout />
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
    },
    viewImage: {

    },
    image: {
        width: 370,
        height: 300,
        borderRadius: 16,
    },
    viewImageItem: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    imageItem: {
        width: 150,
        height: 130,
        borderRadius: 15
    },
    textName: {
        fontSize: 26,
        color: '#c89595',
        marginVertical: 20,
    },
    viewReview: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStart: {
        width: 17,
        height: 17,
    },
    price: {
        color: '#c89595',
        fontSize: 26,
        marginVertical: 20,
    },
    viewOpacity: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    buy: {
        width: '35%',
        height: 40,
        borderWidth: 1,
        borderColor: '#c89595',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toCard: {
        backgroundColor: '#c89595',
        width: '60%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default DetailProduct