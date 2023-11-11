import { Image, Text, View, StyleSheet } from "react-native"
import APP_IMAGES from '../../assets/index'
import Ionicons from "react-native-vector-icons/Entypo";

const BottomLayout = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={APP_IMAGES.logo} style={styles.image} />
            </View>
            <View style={styles.viewInfo}>
                <Text style={{ width: 250 }}>Jilgyngyi, với mục đích bảo vệ sức khỏe và sắc đẹp phụ nữ.</Text>

                <View style={styles.viewDis}>
                    <Ionicons name="location-pin" size={18} color={'#fff'} />
                    <Text style={styles.textViewDis}>
                        số 37 ngõ 20 Nguyễn Chánh, Trung Hòa, Cầu Giấy, Hà Nội
                    </Text>
                </View>
                <View style={styles.viewDis}>
                    <Ionicons name="phone" size={18} color={'#fff'} />
                    <Text style={styles.textViewDis}>1900 633 296</Text>
                </View>
                <View style={styles.viewDis}>
                    <Ionicons name="email" size={18} color={'#fff'} />
                    <Text style={styles.textViewDis}>s.healthyvn@gmail.com</Text>
                </View>
            </View>
            <Text style={{ marginTop: 20, marginBottom: 15 }}>
                Về chúng tôi
            </Text>
            <Text>Điều khoản sử dụng</Text>
            <Text>Chính sách bảo mật</Text>

            <Text style={{ marginTop: 20, marginBottom: 15 }}>
                Dịch vụ khách hàng
            </Text>
            <Text>Mua hàng online: 1900 633 296</Text>
            <Text>Góp ý khiếu nại: 1900 633 296</Text>

            <Text style={{ marginTop: 20, marginBottom: 15 }}>
                Hỗ trợ khách hàng
            </Text>
            <Text>Chính sách đổi/trả</Text>
            <Text>Chính sách bảo hành</Text>

            <Text style={{ marginTop: 20 }}>Kết nối với chúng tôi</Text>
            <View style={styles.viewDis}>
                <Ionicons name="facebook" size={24} color={'#fff'} />
                <Ionicons name="instagram" size={24} color={'#fff'} />
            </View>
            <View style={styles.horizontalLine} />
            <Text style={{ fontSize: 10 }}>Copyright @ 2023</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#c89595",
        padding: 10,
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
    },
    viewInfo: {
    },
    viewDis: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    textViewDis: {
        width: 250,
        marginLeft: 10,
    },
    horizontalLine: {
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        width: "100%",
        marginTop: 10,
        marginBottom: 10,
    }
});

export default BottomLayout