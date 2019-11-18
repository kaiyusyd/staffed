import React from 'react';
import { View } from 'react-native';
import {
  Button,
  Text
} from 'native-base';
import firebase from 'react-native-firebase';
import labels from '../helpers/labels';
import { COLOR } from '../helpers/constants';

export default class SettingsScreen extends React.PureComponent {
  render() {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
      }}
      >
        <Button
          block
          style={{ marginTop: 12, backgroundColor: COLOR.B }}
          onPress={() => firebase.auth().signOut()}
        >
          <Text>{labels.logout}</Text>
        </Button>
      </View>
    );
  }
}
