import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";

import ProjectCardTwo from "../components/ProjectCardTwo";
import { ProjectsItemType } from "../types";
import { projects } from "../constants/projects";

function IconEntypo(props: {
  name: React.ComponentProps<typeof Entypo>["name"];
  size: number;
  color: string;
}) {
  return <Entypo {...props} />;
}

export default function ProjectsScreen() {
  const tabBarHeight = useBottomTabBarHeight();

  const renderProjects = (item: ProjectsItemType, index: number) => {
    return (
      <View style={{ marginVertical: 8 }}>
        <ProjectCardTwo
          title={item.title}
          totalTasks={item.totalTasks}
          completedTasks={item.completedTasks}
          addButton={item.addButton}
          width="100%"
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={projects}
        renderItem={({ item, index }) => renderProjects(item, index)}
      />
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.addButton}>
          <IconEntypo name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  todayDate: {
    fontSize: 16,
    color: "#636363",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#5872EB",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
    elevation: 5,
  },
});
