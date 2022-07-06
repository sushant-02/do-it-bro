import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import ProgressBar from "./ProgressBar";

interface ProjectCardProps {
  title: string;
  totalTasks: number;
  completedTasks: number;
  addButton?: boolean;
}

function IconEntypo(props: {
  name: React.ComponentProps<typeof Entypo>["name"];
  size: number;
  color: string;
}) {
  return <Entypo {...props} />;
}

const { width: windowWidth } = Dimensions.get("window");

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  totalTasks,
  completedTasks,
  addButton,
}) => {
  return (
    <>
      {addButton && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.container, styles.buttonContainer]}
        >
          <View style={styles.addButton}>
            <IconEntypo name="plus" size={30} color="black" />
          </View>
        </TouchableOpacity>
      )}
      {!addButton && (
        <TouchableOpacity activeOpacity={0.7} style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.taskIcon}
              source={require("../assets/note.png")}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.totalTasks}>{totalTasks} Tasks</Text>
          <View style={styles.progressContainer}>
            <ProgressBar
              step={3}
              steps={13}
              height={7}
              barColor="#DFF5F1"
              progressColor="#59C2C4"
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: (windowWidth - 2 * 20 - 15) / 2,
    marginRight: 15,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 15,
  },
  imageContainer: {
    marginTop: 5,
    marginBottom: 7,
  },
  taskIcon: {
    width: 37,
    height: 37,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 5,
  },
  totalTasks: {
    fontSize: 14,
    color: "#636363",
  },
  progressContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "dashed",
    opacity: 0.7,
  },
});

export default ProjectCard;
