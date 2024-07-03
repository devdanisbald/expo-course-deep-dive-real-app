import { FC, ReactNode } from "react";
import { View, StyleSheet,Dimensions } from "react-native";
import { Colors } from "../../../../constants";


const windowWidth = Dimensions.get('window').width;

interface IProps {
  children: ReactNode;
}
const DefaultCard: FC<IProps> = ({ children }) => {
  return (<View style={styles.container}>
    {children}
  </View>)
}

export default DefaultCard;

const styles = StyleSheet.create({
  container: {
    /* flex: 1, */
    
    backgroundColor: Colors.primary700,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: "5%",
    elevation: 10, // Background shadow for android,
    shadowColor: "black", // shadow for iOS
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    marginTop: windowWidth < 380 ? 18 : 36,
  }
})
