import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "@rneui/themed";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import useStore from "../store";
import { splitName } from "../utils/commonUtils";

const BASE_URI = "../assets/do-it-bro-icon.png";
const image_width = 120;

export default function ProfileScreen() {
  const [fontLoaded, _error] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  const tabBarHeight = useBottomTabBarHeight();
  const user = useStore((state) => state.user);
  console.log(user);

  if (!fontLoaded) return null;

  return (
    <ScrollView style={[styles.container, { marginBottom: tabBarHeight }]}>
      <View style={styles.profileImgContainer}>
        <Image
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "contain",
          }}
          source={require(BASE_URI)}
          containerStyle={styles.profileImage}
          // PlaceholderContent={<ActivityIndicator />}
        />
        {/* <Text style={styles.name}>{splitName(user?.first_name)}</Text>
        <Text style={styles.email}>{user?.email}</Text> */}
        <Text style={styles.name}>Sushant Pandey</Text>
        <Text style={styles.email}>skp000002@gmail.com</Text>
        <Button title="Logout" onPress={() => alert("Logout")} />
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
    backgroundColor: "red",
    width: image_width,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: image_width / 2,
    borderColor: "black",
    borderWidth: 2,
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
