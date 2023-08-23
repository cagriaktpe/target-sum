import React from 'react';
import PropTypes from 'prop-types';

import RandomNumber from './RandomNumber';

import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };

  state = {
    selectedIds: [],
  };

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

  // gameStatus: PLAYING, WON, LOST
  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce(
      (acc, curr) => acc + this.randomNumbers[curr],
      0,
    );
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
    const gameStatus = this.gameStatus();
    return (
      <SafeAreaView style>
        <View style={styles.container}>
          <Text style={styles.target}>{this.target}</Text>
          <View style={styles.randomContainer}>
            {this.randomNumbers.map((randomNumber, index) => (
              <RandomNumber
                key={index}
                id={index}
                number={randomNumber}
                isDisabled={this.isNumberSelected(index)}
                onPress={this.selectNumber}
              />
            ))}
          </View>
          <Text>{gameStatus}</Text>
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
    backgroundColor: '#aaa',
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
});

export default Game;
