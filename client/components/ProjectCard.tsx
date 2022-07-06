import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextStyle,
  Image,
} from "react-native";

import ProgressBar from "./ProgressBar";

interface ProjectCardProps {
  title: string;
  totalTasks: number;
  completedTasks: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  totalTasks,
  completedTasks,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.taskIcon} source={require("../assets/note.png")} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: 160,
    marginVertical: 8,
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
});

export default ProjectCard;
