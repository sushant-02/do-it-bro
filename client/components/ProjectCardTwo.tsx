import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Donut from "./Donut";

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
  const [color, setColor] = useState("#A5AEF6");
  const assignColor = (current: number, total: number) => {
    let percent = (100 * current) / total;

    if (percent >= 75) {
      return "#59C2C4";
    } else if (percent >= 50) {
      return "#FCCA79";
    }

    return "#ff4a4a";
  };

  useEffect(() => {
    setColor(assignColor(completedTasks, totalTasks));
  }, [color, completedTasks, totalTasks]);

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container, { width }]}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.taskIcon}
            source={require("../assets/note.png")}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.totalTasks}>
          {completedTasks} of {totalTasks} Tasks
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <Donut
          completed={completedTasks}
          radius={40}
          strokeWidth={7}
          duration={500}
          color={color}
          textColor="#000"
          max={totalTasks}
          fontWeight="500"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginRight: 15,
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 5,
    marginBottom: 7,
  },
  taskIcon: {
    width: 45,
    height: 45,
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
