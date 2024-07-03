import { FC, ReactNode } from "react";
import { Text, StyleSheet } from "react-native";
import { Colors } from "../../../../constants";

interface IProps {
  children: ReactNode;
}

const InstructionText: FC<IProps> = ({ children })=> {
  return <Text style={styles.instrictionText}>{children}</Text>
}

export default InstructionText;

const styles = StyleSheet.create({
  instrictionText: {
    fontFamily: "open-sans-bold",
    color: Colors.accent500,
    fontSize: 16,
    marginBottom: 10
  }
});
