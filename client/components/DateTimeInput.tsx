import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { formatDateTime } from "../utils/commonUtils";

const { width: windowWidth } = Dimensions.get("window");

interface DateTimeInputProps {
  title: string;
  curDate: Date;
  setCurDate: any;
  curTime: Date;
  setCurTime: any;
  disabled?: boolean;
}

function TabBarIconIonicons(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={24} {...props} />;
}

function TabBarIconMaterialIcons(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={24} {...props} />;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  title,
  curDate,
  setCurDate,
  curTime,
  setCurTime,
  disabled,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date: Date) => {
    setCurDate(date);
    hideDatePicker();
  };

  const handleTimeConfirm = (date: Date) => {
    setCurTime(date);
    hideTimePicker();
  };

  const widthStyle = {
    width: (windowWidth - 2 * 20 - 15) / 2,
  };

  return (
    <>
      <Text style={styles.label}>{title}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {!disabled && (
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.dateTimeContainer, styles.marginRight]}
            onPress={showDatePicker}
          >
            <Text style={{ fontSize: 15 }}>
              {formatDateTime(curDate, "DD/MM/YYYY")}
            </Text>
            <TabBarIconIonicons name="calendar" color="#636363" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.dateTimeContainer, !disabled ? styles.marginLeft : {}]}
          onPress={showTimePicker}
        >
          <Text style={{ fontSize: 15 }}>
            {formatDateTime(curTime, "hh:mm A")}
          </Text>
          <TabBarIconIonicons name="time" color="#636363" />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date()}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        date={curDate}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        minimumDate={new Date()}
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        date={curTime}
      />
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
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    flex: 1,
  },
  marginRight: {
    marginRight: 7.5,
  },
  marginLeft: {
    marginLeft: 7.5,
  },
  disabledInput: {
    backgroundColor: "#e5e5e5",
  },
  label: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 8,
  },
});

export default DateTimeInput;
