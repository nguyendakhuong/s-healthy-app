import { Text, View, StyleSheet, ScrollView, Image, Animated, Dimensions } from "react-native"
import BottomLayout from "../bottom-layout/BottomLayout"
import APP_IMAGE from "../../assets/index"
import { useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../lib/context/user.context";
import { WebView } from 'react-native-webview';
import Ionicons from "react-native-vector-icons/Entypo";
const image = [
    APP_IMAGE.image_product,
    APP_IMAGE.image_product,
    APP_IMAGE.image_product,
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const HomeScreen = () => {

    const { updateUser, updateToken } = useContext(UserContext)
    const scrollViewRef = useRef(null);
    const [scrollX] = useState(new Animated.Value(0));
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const autoLogin = async () => {
            try {
                const username = await AsyncStorage.getItem('username');
                const password = await AsyncStorage.getItem('password');
                if (username && password) {
                    handleLogin(username, password);
                }
            } catch (e) {
                console.log(e);
            }
        };

        autoLogin();
    }, []);

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch("http://54.196.170.115:9001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.statusCode === 200) {
                const userData = data.data.user._id;
                const userToken = data.data.token
                updateUser(userData);
                updateToken(userToken);
            } else {
                NotifyMessage(
                    data.message,
                    "Vui lòng kiểm tra lại tài khoản, mật khẩu"
                );
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollViewRef.current) {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= image.length) {
                    nextSlide = 0;
                }
                scrollViewRef.current.scrollTo({
                    x: nextSlide * WIDTH,
                    animated: true
                });
                setCurrentSlide(nextSlide);
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [currentSlide]);

    const onChange = (event) => {
        const slideWidth = event.nativeEvent.layoutMeasurement.width;
        const contentOffsetX = event.nativeEvent.contentOffset.x;

        if (contentOffsetX >= slideWidth * (image.length - 1)) {
            // Reach the last slide
            setCurrentSlide(0);
        }
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.wrap}>
                    <ScrollView
                        ref={scrollViewRef}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal
                        style={styles.wrap}
                        onMomentumScrollEnd={(event) => {
                            const contentOffsetX = event.nativeEvent.contentOffset.x;
                            const slideIndex = Math.floor(contentOffsetX / WIDTH);
                            setCurrentSlide(slideIndex);
                        }}
                    >
                        {image.map((value, index) => (
                            <View key={index} style={styles.slide}>
                                <Image
                                    resizeMode="stretch"
                                    style={styles.image}
                                    source={value}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#c89595', marginTop: 20, fontSize: 32 }} >JilGyungYi</Text>
                        <View style={{ width: 250, alignItems: 'center', marginVertical: 20 }}>
                            <Text>Mỗi ngày, JilGyungYi - một thói quen </Text>
                            <Text>trong cuộc sống của bạn. </Text>
                        </View>
                        <Image style={{ width: 140, height: 100 }} source={APP_IMAGE.image2} />
                        <Text style={{ color: '#c89595', marginVertical: 10, fontSize: 24 }} >Khởi nguồn</Text>
                    </View>
                    <Text style={{ padding: 10 }}>
                        Câu chuyện bắt đầu từ tình yêu và sự tinh tế của người chồng trước những khó khăn
                        thầm kín mà vợ mình phải chịu đựng. Bằng năng lực tuyệt vời của một
                        chuyên gia hóa học hữu cơ sinh học, trong 3 năm ông
                        đã cho ra một sản phẩm signature trong việc chăm sóc
                        vùng kín cho phụ nữ. Bắt đầu từ đấy, Jilgyungyi không những là
                        giải pháp tuyệt vời để chăm sóc và làm đẹp vùng kín hằng ngày
                        cho phụ nữ mà còn là một sự thăng hoa của tình yêu.
                    </Text>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ width: 140, height: 100 }} source={APP_IMAGE.image2} />
                        <Text style={{ color: '#c89595', marginVertical: 10, fontSize: 24 }}>Cam Kết</Text>
                    </View>
                    <Text style={{ padding: 10 }}>
                        Chúng tôi cam kết sử dụng nguyên liệu tự nhiên tối đa. Luôn nỗ lực
                        nghiên cứu và tạo ra sản phẩm hiệu quả nhất không sử
                        dụng Paraben, không có hương liệu nhân tạo, không chất tạo bọt.
                    </Text>
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <Image style={{ width: 200, height: 400 }} source={APP_IMAGE.image3} />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ width: 140, height: 100 }} source={APP_IMAGE.image2} />
                        <Text style={{ color: '#c89595', marginVertical: 10, fontSize: 24 }}>Nhận diện thương hiệu</Text>
                    </View>
                    <Text style={{ padding: 10 }}>
                        JilGyungYi tin rằng vẻ đẹp đích thực đến từ hạnh phúc khi phụ
                        nữ cảm thấy thoải mái và tự tin. Đối với sức khỏe của tất cả phụ nữ,
                        JilGyungYi tự sản xuất để mang đến chất lượng tốt nhất.
                    </Text>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ width: 140, height: 100 }} source={APP_IMAGE.image2} />
                        <Text style={{ color: '#c89595', marginVertical: 10, fontSize: 24 }}>Về chúng tôi</Text>
                    </View>
                    <Text style={{ padding: 10 }}>
                        JilGungyi trở thành một thói quen mỗi ngày của bạn.Chúng tôi tự tin
                        sẽ mang đến những sản phẩm chất
                        lượng nhất và nâng cao sức khỏe vùng kín của tất cả phụ nữ hiện đại.
                    </Text>
                    {/* <WebView
                        source={{ uri: "https://www.youtube.com/watch?v=t1CEUtP7FE4" }}
                        style={{ width: '100%', height: 300 }} /> */}
                </View>
                <Text style={{ padding: 10 }}>
                    Chất tẩy rửa đã và đang cống hiến niềm đam mê của mình để đạt
                    được mục tiêu bằng việc cung cấp Jilgyngyi.
                </Text>
                <Text style={{ padding: 10 }}>
                    Công ty đã và đang nỗ lực trở thành người bạn của phụ
                    nữ trên toàn thế giới dựa trên công nghệ nổi bật của chúng tôi đã được
                    công nhận trong và ngoài nước.
                </Text>
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <Image style={{ width: 200, height: 400 }} source={APP_IMAGE.image3} />

                </View>
                <View style={{ backgroundColor: '#FFC0CB', borderRadius: 18, padding: 10, margin: 10 }}>
                    <Text style={{ marginVertical: 10, fontSize: 18 }}>Về với chúng tôi</Text>
                    <Text>"Vùng kín là bộ phận nhạy cảm nhất trên cơ thể và không nên cảm thấy xấu
                        hổ hay giấu giếm khi sử dụng các sản phẩm chăm sóc cô bé. JilGungyi sẽ liên tục dẫn đầu
                        chiến dịch thay đổi nhận thức về việc chăm sóc vùng kín.
                        Chúng tôi luôn nỗ lực để trở thành bạn của của các bạn."</Text>
                    <Text>Chúng tôi đồng hành cùng bạn</Text>
                    <View>
                        <View style={{
                            width: 100,
                            borderBottomColor: "#c89595",
                            borderBottomWidth: 10,
                            width: "37%",
                            marginTop: 10,
                            marginBottom: 10,
                            borderRadius: 10
                        }} >
                        </View>
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
                </View>
            </View>
            <BottomLayout />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
    },
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.25,
    },
    slide: {
        width: WIDTH,
        height: HEIGHT * 0.25,
    },
    image: {
        width: WIDTH,
        height: HEIGHT * 0.25,
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
});
export default HomeScreen