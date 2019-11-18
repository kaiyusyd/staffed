import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import {
  UPDATE_STAFF,
} from './types';

export const updateStaffState = ({ prop, value }) => ({
  type: UPDATE_STAFF,
  payload: { prop, value }
});

export const getStaff = () => (
  (dispatch) => {
    dispatch(updateStaffState({ prop: 'loading', value: true }));

    const db = firebase.firestore().collection('staffs');
    const user = firebase.auth().currentUser;

    db.where('user_id', '==', user.uid)
      .where('deleted', '==', false)
      .get()
      .then((snapshot) => {
        dispatch(updateStaffState({ prop: 'loading', value: false }));
        const staffs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(updateStaffState({ prop: 'data', value: staffs }));
      })
      .catch((e) => {
        dispatch(updateStaffState({ prop: 'loading', value: false }));
        Alert.alert(e);
      });
  }
);

export const addStaff = (staff) => (
  (dispatch) => {
    dispatch(updateStaffState({ prop: 'loading', value: true }));
    const now = firebase.firestore.Timestamp.fromDate(new Date());
    const timestamp = Date.now().toString();
    const db = firebase.firestore().collection('staffs');
    const { uid } = firebase.auth().currentUser;

    db.doc(timestamp).set({
      ...staff,
      created_at: now,
      updated_at: now,
      deleted: false,
      user_id: uid
    })
      .then(() => {
        dispatch(updateStaffState({ prop: 'loading', value: false }));
        console.log('Document successfully written!');
        dispatch(getStaff()); // refresh staffs
      })
      .catch((error) => {
        dispatch(updateStaffState({ prop: 'loading', value: false }));
        console.warn('Error writing document: ', error);
      });
  }
);

export const removeStaff = (staff) => (
  (dispatch) => {
    dispatch(updateStaffState({ prop: 'loading', value: true }));
    const db = firebase.firestore().collection('staffs');
    db.doc(staff.id).update({ deleted: true })
      .then(() => {
        console.log('Document deleted');
        dispatch(getStaff());
      })
      .catch((error) => {
        dispatch(updateStaffState({ prop: 'loading', value: false }));
        console.warn('Error removing document: ', error);
      });
  }
);
