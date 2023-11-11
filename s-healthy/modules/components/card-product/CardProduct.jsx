import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import APP_IMAGE from "../../../assets/index"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../lib/context/user.context"

const CardProduct = ({ image, name, slogan, mainUse }) => {
    return (
        <View style={styles.viewContainer}>
            <View style={styles.viewImage}>
                <Image style={styles.image} source={image} />
            </View>
            <View>
                <Text style={{ color: '#c89595', fontSize: 26, marginVertical: 25 }}>{name}</Text>
                <Text style={{ fontSize: 18, marginBottom: 20 }}>{slogan}</Text>
                <View style={styles.ViewLine} />
                <View style={styles.viewContent}>
                    <Text>{mainUse}</Text>
                </View>
                <View style={styles.viewOpacityDetail}>
                    <TouchableOpacity style={styles.OpacityDetail} onPress={handlerOnPressDetail}>
                        <Text>Xem chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const CardProductList = () => {
    const [products, setProducts] = useState([]);
    const getDataProduct = async () => {
        const { token } = useContext(UserContext);
        try {
            const response = await fetch("http://54.196.170.115:9001/api/product", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response==============================>", response)
            const data = await response.json();
            console.log("response==============================>", data)
            if (response.status === 200) {
                const data = await response.json();
                setProducts(data);
            }
        }
        catch (e) { }
    }

    useEffect(() => {
        getDataProduct();
    }, []);

    return (
        <View>
            {Array.isArray(products) && products.length > 0 ? (
                products.map((value, index) => (
                    <View key={value._id}>
                        <CardProduct image={value.imgUrls[0]} name={value.name} slogan={value.slogan} mainUse={value.mainUse} />
                    </View>
                ))

            ) : (
                <Text>no</Text>
            )}

        </View>
    )

}
const styles = StyleSheet.create({
    viewContainer: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
    },
    viewImage: {
        shadowColor: "#c89595",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 12,
    },
    image: {
        width: 350,
        height: 300,
        borderRadius: 16,
    },
    ViewLine: {
        width: '30%',
        height: 5,
        borderRadius: 16,
        backgroundColor: '#c89595',
    },
    viewContent: {
        margin: 20,
    },
    textContent: {

    },
    viewOpacityDetail: {
        padding: 10,
    },
    OpacityDetail: {
        backgroundColor: '#c89595',
        width: '100%',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        borderRadius: 10,
    }
})
export default CardProductList