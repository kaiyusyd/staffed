import React from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import {
  Container,
  Content,
  Title,
} from 'native-base';
import labels from '../helpers/labels';

export default class RosterScreen extends React.PureComponent {
  // componentDidMount() {
  //   const staffs = firebase.firestore().collection('staffs');
  //   staffs.where('user_id', '==', 'LrBBCqlfBxblKRneaBFkeGURbak1')
  //     .get()
  //     .then((snapshot) => console.warn(snapshot.docs.map((doc) => doc.data())))
  //     .catch((e) => console.warn(e));
  // }

  render() {
    return (
      <Container>
        <Content>
          <Title>{labels.roster}</Title>
        </Content>
      </Container>
    );
  }
}
