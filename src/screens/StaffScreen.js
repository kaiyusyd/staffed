import React from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  Modal,
  KeyboardAvoidingView,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  Button,
  Text,
  Title,
  Item,
  Icon,
  Card,
  CardItem
} from 'native-base';
import {
  TextField
} from 'react-native-material-textfield';
import _ from 'lodash';
import moment from 'moment';
import {
  getStaff,
  addStaff,
  removeStaff
} from '../actions';
import labels from '../helpers/labels';
import { COLOR } from '../helpers/constants';

class StaffScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      addDisabled: true,
      firstName: '',
      lastName: '',
      payRate: '20'
    };
  }

  componentDidMount() {
    this.props.getStaff();
  }

  onDone() {
    const {
      firstName,
      lastName,
      payRate
    } = this.state;

    const staff = {
      first_name: firstName,
      last_name: lastName,
      pay_rate: payRate
    };

    this.props.addStaff(staff);
    this.setModalVisibility();
  }

  setModalVisibility(modalVisible = false) {
    this.setState({ modalVisible });
  }

  validInput() {
    const {
      firstName,
      lastName,
      payRate
    } = this.state;

    if (_.isEmpty(firstName) || _.isEmpty(lastName) || _.isEmpty(payRate)) {
      this.setState({ addDisabled: true });
    } else {
      this.setState({ addDisabled: false });
    }
  }

  renderItem = ({ item }) => {
    const fullName = `${item.first_name} ${item.last_name}`;
    const addedAt = `${labels.addedAt}: ${moment.unix(item.created_at.seconds).format('MM/DD/YYYY')}`;
    return (
      <View>
        <CardItem header style={{ justifyContent: 'space-between' }}>
          <Text>{fullName}</Text>
          <Text note>{addedAt}</Text>
        </CardItem>

        <CardItem style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Title>${item.pay_rate}</Title>
          <Text note>/{labels.hr}</Text>
        </CardItem>
      </View>
    );
  }

  renderHiddenItem = ({ item }) => (
    <View
      style={styles.rowBack}
    >
      <View style={{ height: '100%', width: 160, flexDirection: 'row' }}>
        <TouchableOpacity
          style={[styles.hiddenBtn, { backgroundColor: COLOR.BLUE }]}
          onPress={() => console.warn('cannot edit now')}
        >
          <Icon name='md-create' style={{ fontSize: 28, color: COLOR.A }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.hiddenBtn, { backgroundColor: COLOR.RED }]}
          onPress={() => this.props.removeStaff(item)}
        >
          <Icon name='md-trash' style={{ fontSize: 28, color: COLOR.A }} />
        </TouchableOpacity>
      </View>
    </View>
  )

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Item style={{ justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20 }}>
          <Title style={{ fontSize: 40 }}>{labels.staff}</Title>

          <Button
            iconLeft
            style={{ backgroundColor: COLOR.B }}
            onPress={() => this.setModalVisibility(true)}
          >
            <Icon name='add' style={{ color: COLOR.A }} />
            <Text style={{ color: COLOR.A }}>{labels.add}</Text>
          </Button>
        </Item>
        <SwipeListView
          data={this.props.data}
          renderItem={(data) => this.renderItem(data)}
          refreshing={this.props.loading}
          renderHiddenItem={this.renderHiddenItem}
          onRefresh={() => this.props.getStaff()}
          keyExtractor={(item, index) => index.toString()}
          rightOpenValue={-160}
        />

        <Modal
          animationType='fade'
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <KeyboardAvoidingView style={styles.modalContainer} behavior='padding' enabled>
            <Card style={{ padding: 20, width: '80%', backgroundColor: COLOR.A }}>
              <Title style={styles.modalTitle}>{labels.addStaff}</Title>

              <TextField
                tintColor={COLOR.B}
                baseColor={COLOR.B}
                autoCorrect={false}
                label={labels.firstName}
                clearButtonMode='while-editing'
                value={this.state.firstName}
                onChangeText={(text) => { this.validInput(); this.setState({ firstName: text }); }}
                style={{ color: COLOR.TEXT }}
              />

              <TextField
                tintColor={COLOR.B}
                baseColor={COLOR.B}
                autoCorrect={false}
                label={labels.lastName}
                clearButtonMode='while-editing'
                value={this.state.lastName}
                onChangeText={(text) => { this.validInput(); this.setState({ lastName: text }); }}
                style={{ color: COLOR.TEXT }}
              />

              <TextField
                tintColor={COLOR.B}
                baseColor={COLOR.B}
                autoCorrect={false}
                keyboardType='numeric'
                label={labels.payRate}
                clearButtonMode='while-editing'
                value={this.state.payRate}
                onChangeText={(text) => { this.validInput(); this.setState({ payRate: text }); }}
                style={{ color: COLOR.TEXT }}
              />

              <Button
                block
                disabled={this.state.addDisabled}
                style={{ marginTop: 10 }}
                onPress={() => this.onDone()}
              >
                <Text style={{ color: COLOR.A }}>{labels.done}</Text>
              </Button>

              <Button transparent onPress={() => this.setModalVisibility()} style={{ position: 'absolute', top: 12, right: 6 }}>
                <Icon name='close' style={{ fontSize: 32, color: COLOR.B }} />
              </Button>
            </Card>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  modalTitle: {
    width: '100%',
    textAlign: 'center',
    height: 32,
    lineHeight: 32
  },
  hiddenBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  const {
    data,
    loading
  } = state.staff.staffList;

  return {
    data,
    loading
  };
};

export default connect(mapStateToProps, {
  getStaff,
  addStaff,
  removeStaff
})(StaffScreen);
