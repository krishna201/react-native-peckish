import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export default class About extends Component {

  render() {
    return (
      <View style={styles.scene}>
        <Text>About</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20
  }
});
