import { ScrollView, Text, View } from "react-native";
import BottomLayout from "../bottom-layout/BottomLayout";
import CardProduct from "../components/card-product/CardProduct";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../lib/context/user.context";
import { useNavigation } from "@react-navigation/native";

const CardProductList = () => {
    const { token } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const getDataProduct = async () => {
            try {
                const response = await fetch("http://54.196.170.115:9001/api/product", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                });

                const data = await response.json();
                if (data.statusCode === 200) {
                    setProducts(data.data.data);
                }
            } catch (e) {
                console.log("Error:", e);
            }
        };

        getDataProduct();
    }, [token]);

    return (
        <View>
            {Array.isArray(products) && products.length > 0 ? (
                products.map((value, index) => (
                    <View key={value._id}>
                        <CardProduct
                            image={value.imgUrls[0]}
                            name={value.name}
                            slogan={value.slogan}
                            mainUse={value.mainUse}
                            handlerOnPressDetail={() => navigation.navigate('ProductStack', { screen: 'DetailProduct', params: { productId: value._id } })} />
                    </View>
                ))
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const ProductScreen = () => {
    return (
        <ScrollView>
            <CardProductList />
            <BottomLayout />
        </ScrollView>
    );
};

export default ProductScreen;