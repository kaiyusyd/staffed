import React from 'react';
import { KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import {
  Title
} from 'native-base';
import { COLOR } from '../helpers/constants';

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      const { navigation } = this.props;
      navigation.navigate(user ? 'Landing' : 'Login');
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: COLOR.A
        }}
        behavior='padding'
        enabled
      >
        <Title style={{ fontSize: 60, color: COLOR.TEXT, marginBottom: 40 }}>STAFFED</Title>
        <ActivityIndicator />
      </KeyboardAvoidingView>
    );
  }
}
