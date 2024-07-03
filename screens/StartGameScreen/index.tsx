import { useState, FC } from "react";
import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import { PrimaryButton, DefaultCard, InstrictionText } from "../../components";
import Title from "../../components/ui/texts/Title";
import { Colors } from "../../constants";

interface IProps {
  handleUserPickNumber: (newValue: number) => void;
}

const StartGameScreen: FC<IProps> = ({
  handleUserPickNumber
}) => {
  const [enteredValue, setEnteredValue] = useState<string>("");

  const {height, width} = useWindowDimensions();

  const textInputHandler = (entered: string) => {
    setEnteredValue(entered);

  }

  const confirmHandler = () => {
    const chosenNumber = parseInt(enteredValue) 

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Numero invalido', 'Debe ingresar un numero entre 1 y 99', [{
        text: "Ok",
        style: "destructive",
        onPress: resetHandler
      }])
      return;
    }
    
    handleUserPickNumber(chosenNumber);
  }

  const resetHandler = () => {
    setEnteredValue("");
  }

  const marginTopDistance = height < 200 ? 10 : 100;

  return (
    <ScrollView>
    <KeyboardAvoidingView style={styles.screen} behavior="position">
    <View style={[{marginTop: marginTopDistance}, styles.rootScreen]}>
      <Title>Guess my number</Title>
      <DefaultCard>
        <InstrictionText>Enter a number</InstrictionText>
        <TextInput 
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredValue}
          onChangeText={textInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={resetHandler}
            >
              Reset
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={confirmHandler}
            >
              Confirm
            </PrimaryButton>
          </View>
          
        </View>
      </DefaultCard>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    /* height: "100%" */
    flex: 1
  },
  rootScreen: {
    padding: 24,
    height: "100%",
    flexDirection: "column"
  },
  instrictionText: {
    color: Colors.accent500,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600"
  },
  numberInput: {
    height: 50,
    width: 70,
    paddingHorizontal: 10,
    fontSize: 32,
    borderColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1
  }
})
