import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Bording2 from './components/Bording2';
import SignUpCostumer from './components/SignUpCostumer';
import SignUpTrainer from './components/SignUpTrainer';
import Payment from './components/Payment';
import HomePage from './screens/HomePage';
import Profile from './screens/Profile';
import FindTrainer from './screens/FindTrainer';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Chat from './components/Chat';
import Settings from './screens/Settings';
import AllCostumers from './screens/AllCostumers';
import LogIn from './screens/LogIn';
import Calanders from './screens/Calanders';
import Posts from './screens/Posts';
import Bording1 from './components/Bording1';
import UpdateInfo from './components/UpdateInfo';
import UpdatePayment from './components/UpdatePayment';
import Membership from './components/Membership';
import CoustumerContextProvider from './context/CoustumerContextProvider';
import TrainerContextProvider from './context/TrainerContextProvider';
import { useRoute, RouteProp } from '@react-navigation/native';
import Admin from './screens/admin';
import ManageTrainers from './screens/ManageTrainers';
import ManageCostumers from './screens/ManageCostumers';
import AdminSettings from './screens/AdminSettings';
import StatisticAdmin from './screens/StatisticAdmin';
import TrainingSchedules from './screens/Trainingscheduals';
import MembershipDetails from './screens/MembershipDetails';
import FAQ from './components/FAQ';
import Support from './components/Support';
import TermsAndConditions from './components/TermCondition';
import UpdatePassword from './components/UpdatePassword';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type RouteParams = {
  clientType?: number;
};

function BackToPre() {
  const route = useRoute<RouteProp<any, any>>(); 
  const clientType = route.params?.clientType;

  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage" component={HomePage} options={{
        tabBarLabel: 'Home',
        headerShown: false,
        tabBarIcon: () => <MaterialCommunityIcons name='home' size={35} color='#1DBD7B' />
      }}
        initialParams={{ clientType }}
      />

      <Tab.Screen name="Posts" component={Posts} options={{
        tabBarLabel: 'Posts',
        headerShown: false,
        tabBarIcon: () => <MaterialCommunityIcons name='post' size={35} color='#1DBD7B' />
      }}
        initialParams={{ clientType }}
      />

      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarLabel: 'Profile',
        headerShown: false,
        tabBarIcon: () => <MaterialCommunityIcons name='account' size={35} color='#1DBD7B' />
      }}
        initialParams={{ clientType }}
      />

      <Tab.Screen name="Chat" component={Chat} options={{
        tabBarLabel: 'Chat',
        headerShown: false,
        tabBarIcon: () => <MaterialCommunityIcons name='wechat' size={35} color='#1DBD7B' />
      }}
        initialParams={{ clientType }}
      />

      <Tab.Screen name="Settings" component={Settings} options={{
        tabBarLabel: 'Settings',
        headerShown: false,
        tabBarIcon: () => <Feather name="settings" size={24} color="#1DBD7B" />
      }}
        initialParams={{ clientType }}
      />
    </Tab.Navigator>
  );
}

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bording1" component={Bording1} options={{ headerShown: false }} />
      <Stack.Screen name="Bording2" component={Bording2} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpCostumer" component={SignUpCostumer} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpTrainer" component={SignUpTrainer} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
      <Stack.Screen name="AllCostumers" component={AllCostumers} options={{ headerShown: true }} />
      <Stack.Screen name="Calander" component={Calanders} options={{ headerShown: false }} />
      <Stack.Screen name="Posts" component={Posts} options={{ headerShown: false }} />
      <Stack.Screen name="Update Info" component={UpdateInfo} options={{ headerShown: false }} />
      <Stack.Screen name="FindTrainer" component={FindTrainer} options={{ headerShown: false }} />
      <Stack.Screen name="Update Payment" component={UpdatePayment} options={{ headerShown: false }} />
      <Stack.Screen name="Mambership" component={Membership} options={{ headerShown: false }} />
      <Stack.Screen name="BackToPre" component={BackToPre} options={{ headerShown: false }} />
      <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
      <Stack.Screen name="Managetrainers" component={ManageTrainers} options={{ headerShown: false }} />
      <Stack.Screen name="ManageCostumers" component={ManageCostumers} options={{ headerShown: false }} />
      <Stack.Screen name="AdminSettings" component={AdminSettings} options={{ headerShown: false }} />
      <Stack.Screen name="StatisticAdmin" component={StatisticAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="TrainingSchedules" component={TrainingSchedules} options={{ headerShown: true }} />
      <Stack.Screen name="Membership Details" component={MembershipDetails} options={{ headerShown: false }} />
      <Stack.Screen name="faq" component={FAQ} options={{ headerShown: false }} />
      <Stack.Screen name="support" component={Support} options={{ headerShown: false }} />
      <Stack.Screen name="termcondition" component={TermsAndConditions} options={{ headerShown: false }} />
      <Stack.Screen name="updatepassword" component={UpdatePassword} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <CoustumerContextProvider>
      <TrainerContextProvider>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
      </TrainerContextProvider>
    </CoustumerContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
