import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Trainers from '../data/Trainers.json'
import BarChart from 'react-native-chart-kit/dist/BarChart';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import { useRoute, RouteProp } from '@react-navigation/native';
import { clientType } from '../types/props_types';

type RouteParams = {
  clientType?: number;
};

export default function Profile() {

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const { currentTrainer } = useContext(TrainerContext);
  const { currentCoustumer } = useContext(CoustumerContext);

  console.log("currentTrainer:", currentTrainer);
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const clientType = route.params?.clientType;
  console.log("clientType:", clientType);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Incomes',
        data: [2200, 2500, 2700, 3000, 2900, 3200],
        color: (opacity = 1) => `rgba(29,189,123, ${opacity})`, // green
      },
      {
        label: 'Outcomes',
        data: [2000, 2100, 2200, 2800, 2600, 3000],
        color: (opacity = 1) => `rgba(29,189,123, ${opacity})`, // red
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(2,71,56, ${opacity})`,
    barPercentage: 0.5,
  };


  if (clientType == 2 && currentCoustumer) {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.Header}>
            <Text style={styles.profileName}> hello {currentCoustumer.first_name} {currentCoustumer.last_name}</Text>
            <Image
              source={{ uri: currentCoustumer.image }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity>
              <View style={styles.StatesContainer}>
                <Text style={styles.TextContainer}>Stats</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AllCostumers', { clientType })}>
              <View style={styles.StatesContainer}>
                <Text style={styles.TextContainer}>costumers</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity onPress={() => navigation.navigate('Calander', { clientType })}>
              <View style={styles.StatesContainer}>
                <Text style={styles.TextContainer}>Scheduals</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Posts', { clientType })}>
              <View style={styles.StatesContainer}>
                <Text style={styles.TextContainer}>Posts</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.moneyContainer}>
            <View>
              <Text style={styles.textMoney}>Income</Text>
            </View>
            <View style={styles.Line}></View>
            <View>
              <Text style={styles.textMoney}>Outcome</Text>
            </View>
          </View>
          <View>
          </View>
          <View style={styles.CharContainer}>
            <BarChart
              data={data}
              width={screenWidth}
              height={290}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              yAxisLabel="$"
              yAxisSuffix="" // התווסף בשביל הוריד תקלה
              showValuesOnTopOfBars
              fromZero
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  else if(currentTrainer){
    <SafeAreaView>
      <ScrollView>
        <View style={styles.Header}>
          <Text style={styles.profileName}> hello {currentTrainer.first_name} {currentTrainer.last_name}</Text>
          <Image
            source={{ uri: currentTrainer.image }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity>
            <View style={styles.StatesContainer}>
              <Text style={styles.TextContainer}>Stats</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AllCostumers', { clientType })}>
            <View style={styles.StatesContainer}>
              <Text style={styles.TextContainer}>costumers</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() => navigation.navigate('Calander', { clientType })}>
            <View style={styles.StatesContainer}>
              <Text style={styles.TextContainer}>Scheduals</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Posts', { clientType })}>
            <View style={styles.StatesContainer}>
              <Text style={styles.TextContainer}>Posts</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.moneyContainer}>
          <View>
            <Text style={styles.textMoney}>Income</Text>
          </View>
          <View style={styles.Line}></View>
          <View>
            <Text style={styles.textMoney}>Outcome</Text>
          </View>
        </View>
        <View>
        </View>
        <View style={styles.CharContainer}>
          <BarChart
            data={data}
            width={screenWidth}
            height={290}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            yAxisLabel="$"
            yAxisSuffix="" // התווסף בשביל הוריד תקלה
            showValuesOnTopOfBars
            fromZero
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  }
  else{
    return <Text>Page 404</Text>
  }
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  profileName: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 70
  },
  StatesContainer: {
    backgroundColor: "rgba(29,189,123,0.6)",
    height: 130,
    width: 130,
    borderRadius: 20
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50
  },
  TextContainer: {
    textAlign: "center",
    margin: "auto",
    fontSize: 18
  },
  moneyContainer: {
    backgroundColor: "rgba(29,189,123,0.6)",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 70,
    width: "90%",
    margin: "auto",
    marginTop: 30
  },
  Line: {
    backgroundColor: "black",
    height: 70,
    width: 2
  },
  textMoney: {
    textAlign: "center",
    margin: "auto"
  },
  CharContainer: {
    marginTop: 50
  }
})