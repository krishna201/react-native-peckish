import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class Detail extends Component {

  recipe() {
    return this.props.searchedRecipes[this.props.navigationParams.id] || null;
  }

  render() {
    const recipe = this.recipe();
    if (!recipe) { return null }
    return (
      <View style={styles.scene}>
        <TouchableHighlight style={{flex: 1, paddingVertical: 20, backgroundColor: '#222'}} onPress={ () => {this.props.navigateBack()} }>
        <Text style={{color: '#FFF'}}>Go Back</Text>
        </TouchableHighlight>
        <View>
          <Image source={{ uri: recipe.thumbnail }} style={styles.resultImage} />
          <Text style={styles.resultText}>{recipe.title}</Text>
        </View>
        <Text style={{fontSize: 21}}>{recipe.ingredients}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20
  },
  resultImage: {
    height: 150
  },
  resultText: {
    backgroundColor: '#000',
    color: '#FFF',
    height: 20
  }
});

function mapStateToProps(state) {
  return {
    navigationParams: state.navigationParams,
    searchedRecipes: state.searchedRecipes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
