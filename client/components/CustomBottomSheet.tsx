import { useMemo } from "react";
import { Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

interface CustomBottomSheetProps {
  children: React.ReactNode;
  bottomSheetRef: React.RefObject<BottomSheet>;
  title: string;
}

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  bottomSheetRef,
  title,
  children,
}) => {
  const snapPoints = useMemo(() => ["50%", "100%"], []);

  // const handleSheetChange = useCallback((index) => {
  //   console.log("handleSheetChange", index);
  // }, []);

  // const handleSnapPress = useCallback((index) => {
  //   bottomSheetRef.current?.snapToIndex(index);
  // }, []);

  // const handleClosePress = useCallback(() => {
  //   bottomSheetRef.current?.close();
  // }, []);

  return (
    <>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        // onChange={handleSheetChange}
        // onClose={}
        enableOverDrag={false}
        enablePanDownToClose
        detached
      >
        <BottomSheetScrollView>
          <Text style={styles.sheetTitle}>{title}</Text>
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  sheetTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default CustomBottomSheet;
