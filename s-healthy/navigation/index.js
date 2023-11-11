import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Entypo";
import HomeScreen from "../modules/home/HomeSceen";
import ProductScreen from "../modules/product/ProdcutScreen";
import NewScreen from "../modules/news/NewScreen";
import SettingScreen from "../modules/setting/SettingScreen";
import APP_IMAGE from "../assets/index";
import { Image, View } from "react-native";
const homeScreen = "Home";
const productScreen = "Product";
const newsScreen = "News";
const settingScreen = "Setting";

const Tab = createBottomTabNavigator();

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={APP_IMAGE.logo} style={styles.image} />
    </View>
  );
};

export default function LayoutContainer() {
  return (
    <NavigationContainer>
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
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 5, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name={homeScreen} component={HomeScreen} />

        <Tab.Screen name={productScreen} component={ProductScreen} />
        <Tab.Screen name={newsScreen} component={NewScreen} />
        <Tab.Screen name={settingScreen} component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
