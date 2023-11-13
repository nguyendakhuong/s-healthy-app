import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../lib/context/user.context";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const NotLogin = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Bạn chưa đăng nhập</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}>
                <Text style={styles.buttonText}>Chuyển đến trang đăng nhập</Text>
            </TouchableOpacity>
        </View>
    )
}
export const Logged = () => {
    const { updateUser, updateToken } = useContext(UserContext);
    const navigation = useNavigation();
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('username');
            await AsyncStorage.removeItem('password');
            updateUser(null);
            updateToken('')
            navigation.navigate('AuthStack', { screen: 'Login' });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <Text>Đã đăng nhập</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}

const SettingScreen = () => {

    const { user } = useContext(UserContext);
    if (user) {
        return <Logged />;
    } else {
        return <NotLogin />;
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#1e90ff",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#1e90ff",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    }
});

export default SettingScreen;