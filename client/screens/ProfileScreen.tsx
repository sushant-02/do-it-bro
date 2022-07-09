import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "@rneui/themed";

import useStore from "../store";
const BASE_URI = "../assets/do-it-bro-icon.png";
const image_width = 120;

export default function ProfileScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const user = useStore((state) => state.user);
  console.log(user);

  return (
    <ScrollView style={[styles.container, { marginBottom: tabBarHeight }]}>
      <View style={styles.profileImgContainer}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={require(BASE_URI)}
          containerStyle={styles.profileImage}
          resizeMode="cover"
          // PlaceholderContent={<ActivityIndicator />}
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
    backgroundColor: "pink",
    alignItems: "center",
  },
  profileImage: {
    width: image_width,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: image_width / 2,
  },
});
