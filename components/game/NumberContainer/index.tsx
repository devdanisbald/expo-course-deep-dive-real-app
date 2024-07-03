import { FC, ReactNode } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../constants';  

interface IProps {
  children: ReactNode;
}
const windowWidth = Dimensions.get('window').width;

const NumberContainer: FC<IProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: windowWidth < 380 ? 12 : 24,
    margin: windowWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: Colors.accent500,
    fontSize: windowWidth < 380 ? 28 : 36,
    fontWeight: 'bold',
  },
});
