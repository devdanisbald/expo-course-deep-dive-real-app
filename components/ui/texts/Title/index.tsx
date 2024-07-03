import { FC, ReactNode } from "react";
import { Text, StyleSheet } from "react-native";
import { Colors } from "../../../../constants";

interface IProps {
  children: ReactNode;
}
const Title: FC<IProps> = ({ children })=> {
  return <Text style={styles.title}>{children}</Text>
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    textAlign: "center",
    borderWidth: 0,
    padding: 12,
    color: Colors.accent500,
    borderColor: Colors.accent500,
    maxWidth: "80%",
    alignSelf: "center",
    width: 300
  }
});
