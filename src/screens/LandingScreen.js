import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StaffScreen from './StaffScreen';
import RosterScreen from './RosterScreen';
import SettingsScreen from './SettingsScreen';
import IconWithBadge from '../components/IconWithBadge';
import { COLOR } from '../helpers/constants';

const TabNavigator = createBottomTabNavigator(
  {
    Staff: StaffScreen,
    Roster: RosterScreen,
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Staff') {
          iconName = 'md-person';
          IconComponent = IconWithBadge;
        } else if (routeName === 'Roster') {
          iconName = 'md-calendar';
          IconComponent = IconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = 'md-cog';
        }

        return <IconComponent focused={focused} name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: COLOR.TEXT,
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: COLOR.A,
        borderTopWidth: 0
      }
    },
  }
);

export default createAppContainer(TabNavigator);
