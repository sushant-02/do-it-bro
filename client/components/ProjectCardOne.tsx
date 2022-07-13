import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

import ProgressBar from "./ProgressBar";

interface ProjectCardProps {
  title: string;
  totalTasks: number;
  completedTasks: number;
  addButton?: boolean;
  width: string | number;
}

function IconEntypo(props: {
  name: React.ComponentProps<typeof Entypo>["name"];
  size: number;
  color: string;
}) {
  return <Entypo {...props} />;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  totalTasks,
  completedTasks,
  addButton,
  width,
}) => {
  return (
    <>
      {addButton && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.container, styles.buttonContainer, { width }]}
        >
          <View style={styles.addButton}>
            <IconEntypo name="plus" size={30} color="black" />
          </View>
        </TouchableOpacity>
      )}
      {!addButton && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.container, { width }]}
        >
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
              step={completedTasks}
              steps={totalTasks}
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
