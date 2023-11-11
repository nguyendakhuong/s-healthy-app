import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import APP_IMAGE from "../../../assets/index"

const CardProduct = () => {

    const arrayContent = [
        'Duy trì độ PH cân bằng, dưỡng ẩm, giảm tình trạng khô hạn',
        'Se khít vùng kín cho phụ nữ mãn kinh, phụ nữ sau sinh',
        'Giảm viêm nhiễm, khí hư, nấm ngứa, làm sáng vùng da sậm màu.',
        'Giảm viêm nhiễm, khí hư, nấm ngứa, làm sáng vùng da sậm màu.',
        'Giảm viêm nhiễm, khí hư, nấm ngứa, làm sáng vùng da sậm màu.',
        'Giảm viêm nhiễm, khí hư, nấm ngứa, làm sáng vùng da sậm màu.'
    ]


    const handlerOnPressDetail = () => {

    }
    const renderContent = () => {
        if (arrayContent.length <= 3) {
            return arrayContent.map((content, index) => (
                <Text key={index} style={styles.textContent}>{content}</Text>
            ));
        } else {
            const truncatedContent = arrayContent.slice(0, 3);
            truncatedContent.push('...');
            return truncatedContent.map((content, index) => (
                <Text key={index} style={styles.textContent}>{content}</Text>
            ));
        }
    };
    return (
        <View style={styles.viewContainer}>
            <View style={styles.viewImage}>
                <Image style={styles.image} source={APP_IMAGE.image_product} />
            </View>
            <View>
                <Text style={{ color: '#c89595', fontSize: 26, marginVertical: 25 }}>JilGyungYi Pro 6ea</Text>
                <Text style={{ fontSize: 18, marginBottom: 20 }}>Chăm sóc “cô bé” chỉ với 2 viên mỗi tuần!</Text>
                <View style={styles.ViewLine} />
                <View style={styles.viewContent}>
                    {renderContent()}
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
export default CardProduct