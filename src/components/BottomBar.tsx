import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View, Image, Keyboard, KeyboardEvent } from "react-native";
import { navigate, navigationRef } from "../navigation";
import Touchable from "./Touchable";
import { ICON_NAMES } from "../helpers/constants/icons";
import Text from "./Text";
import { colors } from "../helpers/constants/styles";
import { moderateScale } from "react-native-size-matters";

const BottomBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentRoute, setCurrentRoute] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {

    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener('state', () => {
      const route = navigationRef.current?.getCurrentRoute();
      setCurrentRoute(route?.name || '');
    });
  
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentRoute === "HomeScreen" && activeTab !== 0) setActiveTab(0);
    else if (currentRoute === "ReminderScreenScreen" && activeTab !== 1) setActiveTab(1);
    else if (currentRoute === "ReminderScreen" && activeTab !== 2) setActiveTab(2);
    else if (currentRoute === "ChatScreen" && activeTab !== 3) setActiveTab(3);
  }, [currentRoute]);

  const onTabChange = (index: number) => {
    const tabScreens = ["HomeScreen", "ReminderScreen", "ReminderScreen", "ChatScreen"];
    navigate(tabScreens[index]);
  };

  const tabDetails = [
    { icon: ICON_NAMES.bottomBar.icon1 },
    { icon: ICON_NAMES.bottomBar.icon2 },
    { icon: ICON_NAMES.bottomBar.icon3 },
    { icon: ICON_NAMES.bottomBar.icon4 },
  ];


  if (keyboardVisible) return null;

  if (
    currentRoute === "HomeScreen" ||
    currentRoute === "ReminderScreen" ||
    currentRoute === "ReminderScreen" ||
    currentRoute === "ChatScreen"
  ) {
    return (
      <View style={styles.bottomTabWrapper}>
        {tabDetails.map((tab, index) => (
          <Touchable
            style={[styles.tabsContainer, { paddingHorizontal: 15 }]}
            activeOpacity={activeTab === index ? 1 : 0.6}
            onPress={() => {
              setActiveTab(index);
              onTabChange(index);
            }}
            key={index}
          >
            <Image
              tintColor={activeTab === index ? colors.primary : colors.bottomGrey}
              source={tab?.icon}
              style={styles.copyIcon}
            />
          </Touchable>
        ))}
      </View>
    );
  }

  return null;
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomTabWrapper: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-evenly",
    width: "100%",
    bottom: 0,
    paddingVertical: moderateScale(17),
    backgroundColor: colors.bottomBarBackground,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15)
  },
  tabsContainer: { alignItems: "center", width: "20%" },
  copyIcon: { height: moderateScale(24), width: moderateScale(24), resizeMode: "contain" },
});
