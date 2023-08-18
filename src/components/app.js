import React from 'react';

import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

class App extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Hello World!</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default App;
