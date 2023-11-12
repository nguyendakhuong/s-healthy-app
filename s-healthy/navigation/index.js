import * as React from "react";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Ionicons from "react-native-vector-icons/Entypo";
import HomeScreen from "../modules/home/HomeSceen";
import ProductScreen from "../modules/product/ProdcutScreen";
import NewScreen from "../modules/news/NewScreen";
import SettingScreen from "../modules/setting/SettingScreen";
import Login from "../modules/auth/Login";
import Register from "../modules/auth/Register";
import DetailProduct from "../modules/product/DetailProduct";
import { Text, TouchableOpacity } from "react-native";
import CartProduct from "../modules/cart/CartProduct";
import PayProduct from "../modules/pay/PayProduct";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../lib/context/user.context";
const homeScreen = "Home";
const productScreen = "Product";
const newsScreen = "News";
const settingScreen = "Setting";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function LayoutContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductStack"
          component={Product}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function Product() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DetailProduct" component={DetailProduct} />
      <Stack.Screen name="CartProduct" component={CartProduct} />
      <Stack.Screen name="PayProduct" component={PayProduct} />
    </Stack.Navigator>
  );
}

function MainStack() {
  const navigation = useNavigation();
  const [itemCount, setItemCount] = React.useState(0);

  AsyncStorage.getItem("Products").then((value) => {
    console.log(value);
    if (value !== null) {
      const data = JSON.parse(value);
      const count = Object.keys(data).length;
      setItemCount(count);
    }
  });

  return (
    <Tab.Navigator
      initialRouteName={homeScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeScreen) {
            iconName = focused ? "home" : "home";
          }
          if (rn === productScreen) {
            iconName = focused ? "shopping-cart" : "shopping-cart";
          }
          if (rn === newsScreen) {
            iconName = focused ? "news" : "text-document-inverted";
          }
          if (rn === settingScreen) {
            iconName = focused ? "list" : "list";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerRight:
          route.name === productScreen
            ? () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductStack", {
                      screen: "CartProduct",
                    });
                  }}
                >
                  <Ionicons
                    name="shopping-cart"
                    size={24}
                    color={"black"}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      top: -5,
                      right: 5,
                      backgroundColor: "red",
                      color: "white",
                      paddingHorizontal: 4,
                      borderRadius: 10,
                    }}
                  >
                    {itemCount}
                  </Text>
                </TouchableOpacity>
              )
            : undefined,
      })}
      // tabBarOptions={{
      //   activeTintColor: "tomato",
      //   inactiveTintColor: "grey",
      //   labelStyle: { paddingBottom: 5, fontSize: 10 },
      //   style: { padding: 10, height: 70 },
      // }}
    >
      <Tab.Screen name={homeScreen} component={HomeScreen} />
      <Tab.Screen name={productScreen} component={ProductScreen} />
      <Tab.Screen name={newsScreen} component={NewScreen} />
      <Tab.Screen name={settingScreen} component={SettingScreen} />
    </Tab.Navigator>
  );
}
