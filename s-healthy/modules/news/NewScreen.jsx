import { Image, ScrollView, Text, View } from "react-native"
import APP_IMAGE from "../../assets/index"
const CardNews = ({ image, title, content }) => {
    return (
        <View style={{ padding: 10 }}>
            <Image style={{ width: "100%", height: 270, borderRadius: 10 }} source={image} />

            <Text style={{ fontSize: 20 }}>{title}</Text>
            <Text>{content}</Text>
        </View>
    )
}

const NewScreen = (navigation) => {
    const API = [
        {
            image: APP_IMAGE.image_product,
            title: "Có nên dùng dung dịch vệ sinh phụ nữ hàng ngày không?",
            content: "Dung dịch vệ sinh là sản phẩm chăm sóc vùng kín dành cho nữ giới, mặc dù được sử dụng phổ biến trong cuộc sống hàng ngày nhưng không phải ai cũng hiểu rõ về sản phẩm này. Tham...",
        },
        {
            image: APP_IMAGE.image_product,
            title: "Độ tuổi nào có thể sử dụng dung dịch vệ sinh phụ nữ?",
            content: "Dung dịch vệ sinh phụ nữ là một sản phẩm làm sạch vùng kín, ngăn ngừa viêm nhiễm phụ khoa cho các bạn nữ. Vậy độ tuổi nào sẽ thích hợp để sử dụng sản phẩm này? Các bước sử dụn....",
        },
        {
            image: APP_IMAGE.image_product,
            title: "Mang thai có được dùng dung dịch vệ sinh không? Loại nào tốt...",
            content: "Việc vệ sinh vùng kín là rất quan trọng đối với chị em phụ nữ, đặc biệt là với mẹ bầu. Tuy nhiên, khi mang thai có được dùng dung dịch vệ sinh hay không là câu hỏi luôn nhận đ...",
        },
        {
            image: APP_IMAGE.image_product,
            title: "Vùng kín bị thâm đen lý do?",
            content: "Vùng kín bị thâm thường khiến chị em phụ nữ không còn hài lòng với cơ thể mình, tự ti trong chuyện gối chăn. Tuy nhiên, thâm vùng kín lại là kết quả tự nhiên không thể tránh k...",
        }
    ]
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            {
                API.map((value, index) => (
                    <View key={index}>
                        <CardNews image={value.image} title={value.title} content={value.content} />
                    </View>
                ))
            }
        </ScrollView>
    )
}
export default NewScreen