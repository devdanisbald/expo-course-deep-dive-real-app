import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StartGameScreen, GameScreen, GameOverScreen } from './screens';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  const [userNumber, setUserNumber] = useState<number>();
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);
  const [guessRounds, setGuessRounds] = useState<number>(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const handleUserPickNumber = (enteredNumber: number) => {
    setUserNumber(enteredNumber);
    setGameIsOver(false);
  }

  const gameOverHandler = (rounds: number) => {
    setGameIsOver(true);
    setGuessRounds(rounds);
  }

  const newGameHandler = () => {
    setUserNumber(undefined);
    setGuessRounds(0);
    setGameIsOver(false);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient colors={[
      "#4e0329",
      "#ddb52f"
    ]} style={styles.rootScreen}>
      <ImageBackground 
        source={require("./assets/images/background.png")} 
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView>
          {userNumber === undefined && <StartGameScreen handleUserPickNumber={handleUserPickNumber} />}
          {userNumber !== undefined && gameIsOver === false && <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />}
          {userNumber !== undefined && gameIsOver === true && <GameOverScreen onStartNewGame={newGameHandler} userNumber={userNumber} roundsNumber={guessRounds} />}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  },
});
