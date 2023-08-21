import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.target}>{this.target}</Text>
          <View style={styles.randomContainer}>
            {this.randomNumbers.map((randomNumber, index) => (
              <Text style={styles.randomNumber} key={index}>
                {randomNumber}
              </Text>
            ))}
          </View>
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

  randomNumber: {
    backgroundColor: '#999',
    width: '40%',
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
});

export default Game;
