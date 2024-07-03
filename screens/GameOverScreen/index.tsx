import { FC } from "react";
import { Text, View, Image, StyleSheet, Dimensions, useWindowDimensions, ScrollView } from 'react-native';
import { DefaultCard, PrimaryButton } from "../../components";
import Title from "../../components/ui/texts/Title";
import { Colors } from "../../constants";

const deviceWidth = Dimensions.get("window").width;

interface IProps {
  onStartNewGame: () => void;
  roundsNumber: number;
  userNumber: number;

}
const GameOverScreen: FC<IProps> = ({ roundsNumber, userNumber, onStartNewGame }) => {
  const { width, height } = useWindowDimensions();

  let imageSize = 200;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 300) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={[styles.rootContainer, {marginTop: height < 500 ? 50 : 100}]}>
        <Title>Game is over!</Title>
        <DefaultCard>
          <View style={[styles.imageContainer, imageStyle]}>
            <Image style={styles.image} source={require("../../assets/images/success.png")} />
          </View>

          <Text style={styles.summaryText}>
            Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to
            guess the number <Text style={styles.highlight}>{userNumber}</Text>.
          </Text>
        </DefaultCard>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
    
  )
}

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    height: "100%"
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',/* 
    margin: 36, */
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
    color: "#fff"
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.accent500,

  },
})

