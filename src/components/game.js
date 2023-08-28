import React from 'react';
import PropTypes from 'prop-types';

import RandomNumber from './RandomNumber';

import {View, Text, SafeAreaView, StyleSheet, Button} from 'react-native';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };

  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
    gameStatus: 'PLAYING',
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        prevState => {
          return {remainingSeconds: prevState.remainingSeconds - 1};
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.intervalId);
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  // if a component will be updated this method should be called and it should change the gameStatus
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedIds !== this.state.selectedIds ||
      prevState.remainingSeconds !== this.state.remainingSeconds
    ) {
      this.setState({gameStatus: this.calcGameStatus()});
      if (this.state.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }

  isNumberSelected = numberIndex => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectNumber = numberIndex => {
    this.setState(prevState => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };

  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  // shuffle the randomNumbers array
  shuffledRandomNumbers = this.randomNumbers
    .map(a => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);

  // gameStatus: PLAYING, WON, LOST
  calcGameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce(
      (acc, curr) => acc + this.randomNumbers[curr],
      0,
    );
    if (this.state.remainingSeconds === 0) {
      return 'LOST';
    }
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  };

  render() {
    const gameStatus = this.state.gameStatus;
    return (
      <SafeAreaView style>
        <View style={styles.container}>
          <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
            {this.target}
          </Text>
          <View style={styles.randomContainer}>
            {this.randomNumbers.map((randomNumber, index) => (
              <RandomNumber
                key={index}
                id={index}
                number={randomNumber}
                isDisabled={
                  this.isNumberSelected(index) || gameStatus !== 'PLAYING'
                }
                onPress={this.selectNumber}
              />
            ))}
          </View>
          <Text>{this.state.remainingSeconds}</Text>
          {this.state.gameStatus !== 'PLAYING' && (
            <Button
              title="Play Again"
              onPress={this.props.onPlayAgain}
              style={styles.button}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '100%',
  },
  target: {
    fontSize: 40,
    marginHorizontal: 50,
    textAlign: 'center',
    marginTop: 30,
    width: '80%',
  },
  // randomContainer must show 2 items in every row
  randomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 50,
  },
  // a button to play again when the game is over (won or lost) and the gameStatus is not PLAYING and button should be in the bottom
  button: {
    position: 'absolute',
    bottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '80%',
    backgroundColor: 'lightblue',
  },
  STATUS_PLAYING: {
    backgroundColor: '#aaa',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});

export default Game;
