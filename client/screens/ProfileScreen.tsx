import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Image, Button } from "@rneui/themed";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import handleLogout from "../utils/handleLogout";

import useStore from "../store";
import { splitName } from "../utils/commonUtils";

const FALLBACK_IMAGE_URI =
  "https://avatars.dicebear.com/api/bottts/pandeu.png?scale=97&colors[]=blue";
const image_width = 120;

export default function ProfileScreen() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = useStore((state) => state.user);

  const [fontLoaded, _error] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const tabBarHeight = useBottomTabBarHeight();

  const navigation = useNavigation();

  console.log(user);

  useEffect(() => {
    return () => {
      setIsLoggingOut(false);
    };
  }, []);

  const logout = () => {
    setIsLoggingOut(true);

    handleLogout(() => {
      navigation.navigate("LogIn");
    });
  };

  if (!fontLoaded) return null;

  return (
    <ScrollView style={[styles.container, { marginBottom: tabBarHeight }]}>
      <View style={styles.profileImgContainer}>
        <Image
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "center",
          }}
          source={{
            uri: user?.image_url || FALLBACK_IMAGE_URI,
          }}
          containerStyle={styles.profileImage}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.name}>{splitName(user?.first_name)}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {/* <Text style={styles.name}>Sushant Pandey</Text>
        <Text style={styles.email}>skp000002@gmail.com</Text> */}
        <Button
          title={isLoggingOut ? "Logging Out" : "Logout"}
          onPress={logout}
          disabled={isLoggingOut}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImgContainer: {
    // backgroundColor: "pink",
    alignItems: "center",
  },
  profileImage: {
    backgroundColor: "#fff",
    width: image_width,
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: image_width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
  },
  email: {
    fontSize: 16,
    color: "#636363",
  },
});
