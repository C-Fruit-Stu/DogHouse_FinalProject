import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { TrainerContext } from '../context/TrainerContextProvider'
import { CoustumerContext } from '../context/CoustumerContextProvider'
import { useRoute, RouteProp } from '@react-navigation/native'

type RouteParams = {
  clientType?: number;
};

export default function Profile() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const { currentTrainer } = useContext(TrainerContext);
  const { currentCoustumer } = useContext(CoustumerContext);

  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const clientType = route.params?.clientType;

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


  if (clientType == 2) {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.Header}>
            <Text style={styles.profileName}> hello {currentCoustumer.first_name}</Text>
            <Image
                source={{ uri: currentCoustumer.image || "../assets/AutoProfilePic.png" }}
                style={styles.profileImage}
              />

          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity onPress={() => navigation.navigate('FindTrainer', { clientType })}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Find new trainers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TrainingSchedules', { clientType })}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Training Schedules</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Posts', { clientType })}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Posts</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  else {
    return (
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
              <View style={styles.button}>
                <Text style={styles.buttonText}>Stats</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AllCostumers', { clientType })}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Customers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Calander', { clientType })}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Schedules</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Posts', { clientType })}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Posts</Text>
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
          <View style={styles.CharContainer}>
            <BarChart
              data={data}
              width={screenWidth}
              height={290}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              yAxisLabel="$"
              yAxisSuffix=""
              showValuesOnTopOfBars
              fromZero
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
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
    width: 100,  // Adjust the width and height according to your needs
    height: 100,
    borderRadius: 50,  // Optional: If you want to make it circular
    resizeMode: 'cover', 
  },
  containerButton: {
    flexDirection: "column", // Changed from row to column
    alignItems: "center", // Center buttons in the column
    marginTop: 50,
    width: "100%",
  },
  button: {
    backgroundColor: '#1DBD7B', // Green background
    borderRadius: 8, // Rounded corners
    marginVertical: 10, // Space between buttons
    paddingVertical: 15, // Vertical padding for button height
    paddingHorizontal: 20, // Horizontal padding for button width
    alignItems: 'center',
    width: 350,
    height:60 // Space between buttons
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff", // White text color
    fontWeight: "600", // Semi-bold text
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
