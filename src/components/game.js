import React from 'react';

import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

class Game extends React.Component {
  target = 10 + Math.floor(40 * Math.random());

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.target}>{this.target}</Text>
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
});

export default Game;
