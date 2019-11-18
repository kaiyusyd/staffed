import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert
} from 'react-native';
import {
  Button,
  Text,
  Title
} from 'native-base';
import {
  TextField
} from 'react-native-material-textfield';
import firebase from 'react-native-firebase';
import _ from 'lodash';
import labels from '../helpers/labels';
import messages from '../helpers/messages';
import { COLOR } from '../helpers/constants';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'test@mail.com',
      password: 'test0000',
      emailError: '',
      passwordError: '',
      loading: false
    };
  }

  signIn = () => {
    const { email, password } = this.state;

    if (_.isEmpty(email)) {
      this.setState({ emailError: messages.noEmpty });
      return;
    }

    if (_.isEmpty(password)) {
      this.setState({ passwordError: messages.noEmpty });
      return;
    }

    this.setState({ loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ loading: false });
        const { navigation } = this.props;
        navigation.navigate('Landing');
      })
      .catch(() => {
        this.setState({ loading: false });
        Alert.alert('', messages.invalidAccount);
      });
  };

  render() {
    const {
      email,
      password,
      emailError,
      passwordError,
      loading
    } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{
            flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: COLOR.A
          }}
          behavior='padding'
          enabled
        >
          <Title style={{ fontSize: 60, color: COLOR.TEXT, marginBottom: 40 }}>STAFFED</Title>

          <TextField
            tintColor={COLOR.B}
            baseColor={COLOR.B}
            autoCapitalize='none'
            autoCorrect={false}
            label={labels.email}
            clearButtonMode='while-editing'
            value={email}
            onChangeText={(text) => this.setState({ email: text })}
            error={emailError}
            style={{ color: COLOR.TEXT }}
          />

          <TextField
            tintColor={COLOR.B}
            baseColor={COLOR.B}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            label={labels.password}
            clearButtonMode='while-editing'
            value={password}
            onChangeText={(text) => this.setState({ password: text })}
            error={passwordError}
            style={{ color: COLOR.TEXT }}
          />

          <Button
            block
            style={{ marginTop: 12, backgroundColor: COLOR.B }}
            onPress={() => this.signIn()}
          >
            {
              loading ? <ActivityIndicator color={COLOR.A} /> : <Text style={{ fontWeight: 'bold', color: COLOR.A }}>{labels.loginWithEmail}</Text>
            }
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
