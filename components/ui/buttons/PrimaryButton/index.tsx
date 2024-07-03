import { FC, ReactNode } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

interface IProps {
  children: ReactNode,
  onPress?: Function
}
const PrimaryButton: FC<IProps> = ({ children, onPress }) => {
  return (
      <View style={styles.outterContainer}>
        <Pressable 
            style={({pressed}) => {
              return {
                ...styles.innerContainer,
                ...(pressed ? styles.pressed : {})
              }
            }}
            onPress={() => onPress && onPress()}
            android_ripple={{
              color: "#91084d"
            }}
          >
          <Text style={styles.buttonText}>
            {children}
          </Text>
        </Pressable>
      </View>
  )
}

export default PrimaryButton;

const styles = StyleSheet.create({
  outterContainer: {
    backgroundColor: "#72063c",
    borderRadius: 20,
    elevation: 2,
    margin: 4,
    overflow: "hidden"
  },
  innerContainer: {
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
  pressed: {
    opacity: 0.75
  }
})
