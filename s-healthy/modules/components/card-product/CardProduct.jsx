import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native"

const CardProduct = ({ image, name, slogan, mainUse, handlerOnPressDetail }) => {
    return (
        <View style={styles.viewContainer}>
            <View style={styles.viewImage}>
                <Image style={styles.image} source={{ uri: image }} />
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