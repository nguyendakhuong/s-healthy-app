import { ScrollView, Text, View } from "react-native"
import BottomLayout from "../bottom-layout/BottomLayout"
import CardProduct from "../components/card-product/CardProduct"
const ProductScreen = (navigation) => {
    return (
        <ScrollView>
            <CardProduct />
            <BottomLayout />
        </ScrollView>
    )
}
export default ProductScreen