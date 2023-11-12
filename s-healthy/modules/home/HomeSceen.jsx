import { Text, View, StyleSheet, ScrollView, Image, Animated } from "react-native"
import BottomLayout from "../bottom-layout/BottomLayout"
import APP_IMAGE from "../../assets/index"
import { useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../lib/context/user.context";

const HomeScreen = () => {

    const { updateUser, updateToken } = useContext(UserContext)
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
    return (
        <ScrollView>
            <View style={styles.container}>

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
    image: {
        width: 200,
        height: 200,
    },
});
export default HomeScreen