import { FC, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { NumberContainer, PrimaryButton, DefaultCard, InstrictionText, GuessLogItem } from "../../components";
import Title from "../../components/ui/texts/Title";

const generateRandomBetween = (min:number, max: number, exclude:number): number => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

interface IProps {
  userNumber: number;
  onGameOver: (rounds: number) => void;
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen: FC<IProps> = ({
  userNumber,
  onGameOver
}) => {
  const initialGuess = useRef<number>(generateRandomBetween(1, 100, userNumber));
  const [currentGuess, setCurrentGuess] = useState(initialGuess.current);
  const [guessRounds, setGuessRounds] = useState<number[]>([]);

  const {height, width} = useWindowDimensions();

  const nextGuessHandler = (direction: 'lower' | 'greater') => {
    // direction => 'lower', 'greater'
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevState) => {
      return [
        ...prevState,
        newRndNumber
      ]
    })
  }

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver && onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const marginTopDistance = height < 380 ? 30 : 100;

  const Content = () => {
    if (width > 500) {
      return (
        <>
          <View style={styles.buttonsContainerWide}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </>
      )
    } else {
      return (
        <>
          <NumberContainer>{currentGuess}</NumberContainer>
          <InstrictionText>
            Higher or lower?
          </InstrictionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </>
      )
    }
  }

  return (
    <View style={[styles.screen,  {marginTop: marginTopDistance}]}>
      <Title>Opponent's Guess</Title>
      <Content />
      {/* <DefaultCard>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View>
          <InstrictionText>Higher or lower?</InstrictionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>

            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name="md-remove" size={24} color="white" />  
              </PrimaryButton>  
            </View>
            
          </View>
        </View>
      </DefaultCard> */}
      <View style={styles.listContainer}>
        <FlatList 
          data={guessRounds}
          renderItem={(itemData) => <GuessLogItem 
            roundNumber={guessRounds.length - itemData.index}
            guess={itemData.item}
          />}
          keyExtractor={item => item.toString()}
        />
      </View>
    </View>
  )
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    /* marginTop: 50, */
    padding: 24
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 5,
  },
  buttonContainer: {
    flex: 1,
    width: "100%"
  },
  listContainer: {
    height: 280,
    padding: 16,
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
