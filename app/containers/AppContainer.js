import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Home from './Home';
import ApplicationTabs from './ApplicationTabs';
import Detail from './Detail';
import { Animated, StyleSheet, View, NavigationExperimental } from 'react-native';

const {
  Card: NavigationCard,
  Transitioner: NavigationTransitioner
} = NavigationExperimental;

const { PagerStyleInterpolator: NavigationPagerStyleInterpolator } = NavigationCard;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this._render = this._render.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  render() {
    return (
      <NavigationTransitioner
        navigationState={this.props.navigationState}
        render={this._render}
      />
    );
  }

  _render(transitionProps) {
    const scenes = transitionProps.scenes.map((scene) => {
      const sceneProps = {
        ...transitionProps,
        scene,
      };
      return this._renderScene(sceneProps);
    });

    return (
      <View style={{flex: 1}}>
        {scenes}
      </View>
    )
  }

  _renderScene(sceneProps) {
    return (
      <SceneContainer {...sceneProps} key={sceneProps.scene.key} />
    )
  }
}

class SceneContainer extends Component {

  render() {
    const style = [
      styles.scene,
      NavigationPagerStyleInterpolator.forHorizontal(this.props)
    ]

    let Scene = null;
    if (this.props.scene.route.key === 'ApplicationTabs') { Scene = ApplicationTabs }
    if (this.props.scene.route.key === 'Detail') { Scene = Detail }
    return (
      <Animated.View style={style}>
        <Scene {...this.props} style={style} />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  }
});

function mapStateToProps(state) {
  return {
    navigationState: state.navigationState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
