import { ScrollView, Text, View } from "react-native"
import BottomLayout from "../bottom-layout/BottomLayout"
import CardProductList from "../components/card-product/CardProduct"
const ProductScreen = (navigation) => {
    return (
        <ScrollView>
            <CardProductList />
            <BottomLayout />
        </ScrollView>
    )
}
export default ProductScreen