import React from 'react';

import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
  };

  handlePress = () => {
    console.log(this.props.number);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={styles.randomNumber}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  randomNumber: {
    backgroundColor: '#999',
    width: 150,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
});

export default RandomNumber;