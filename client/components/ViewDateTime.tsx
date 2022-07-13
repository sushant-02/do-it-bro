import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { formatDateTime } from "../utils/commonUtils";
import { statusColors } from "../constants/statusColor";
import { TaskItemType } from "../types";

interface ViewDateTimeProps {
  task: TaskItemType;
  title: string;
  curDate: Date;
  curTime: Date;
  disabled: boolean;
}

function TabBarIconIonicons(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={24} {...props} />;
}

const ViewDateTime: React.FC<ViewDateTimeProps> = ({
  task,
  title,
  curDate,
  curTime,
  disabled,
}) => {
  return (
    <>
      {task && (
        <>
          <Text style={styles.label}>
            {title} {disabled ? "Time" : "Date - Time"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {!disabled && (
              <View
                style={[
                  styles.dateTimeContainer,
                  styles.marginRight,
                  statusColors[task?.status],
                ]}
              >
                <Text style={styles.font15}>
                  {formatDateTime(curDate, "DD/MM/YYYY")}
                </Text>
                <TabBarIconIonicons name="calendar" color="#636363" />
              </View>
            )}
            <View
              style={[
                styles.dateTimeContainer,
                !disabled ? styles.marginLeft : {},
                statusColors[task?.status],
              ]}
            >
              <Text style={styles.font15}>
                {formatDateTime(curTime, "hh:mm A")}
              </Text>
              <TabBarIconIonicons name="time" color="#636363" />
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 5,
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 7,
    color: "#636363",
  },
  marginRight: {
    marginRight: 7.5,
  },
  marginLeft: {
    marginLeft: 7.5,
  },
  font15: {
    fontSize: 15,
  },
});

export default ViewDateTime;
