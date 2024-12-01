import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


type RouteParams = {
  clientType?: number;
};

export default function HomePage() {
  const { currentTrainer } = useContext(TrainerContext);
  const { currentCoustumer } = useContext(CoustumerContext);
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const clientType = route.params?.clientType;
  const navigation = useNavigation();
  const scaleAnimation = new Animated.Value(1);
  
  
  Animated.loop(
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();

  

  const renderScheduleItem = ({ item } : any) => (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      style={styles.scheduleCard}
    >
      <Text style={styles.scheduleName}>{item.name}</Text>
      <Text style={styles.scheduleDate}>{item.date}</Text>
      <Text style={styles.scheduleTime}>{item.time}</Text>
    </Animatable.View>
  );

  const rendercostumeritem = ({ item } : any) => (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      style={styles.scheduleCard}
    >
      <Text style={styles.scheduleName}>{item.name}</Text>
      <Text style={styles.scheduleDate}>{item.date}</Text>
      <Text style={styles.scheduleTime}>{item.time}</Text>
    </Animatable.View>
  );

  if (clientType === 2 && currentCoustumer) {
    return (
      <SafeAreaView>
        <View style={styles.headerDiv}>
          <View>
            <Text style={styles.titleName}>
              Hello {currentCoustumer.first_name}
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: currentCoustumer.image }}
              style={styles.imageLogin}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('FindTrainer', { clientType })}
        >
        <Animated.View style={[styles.box, { transform: [{ scale: scaleAnimation }] }]}>
        <MaterialCommunityIcons name="dog" size={50} color="#fff" style={styles.icon} />
          <Text style={styles.text}>Find Your Next Trainer</Text>
        </Animated.View>
          <Text style={styles.sectionTitle}>Your Schedules</Text>
        <FlatList
          data={currentCoustumer.trainingSchedule}
          renderItem={rendercostumeritem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else if (clientType === 1 && currentTrainer) {
    return (
      <SafeAreaView>
        <View style={styles.headerDiv}>
          <View>
            <Text style={styles.titleName}>
              Hello {currentTrainer.first_name}
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: currentTrainer.image }}
              style={styles.imageLogin}
            />
          </View>
        </View>
        <Text style={styles.sectionTitle}>Your Schedules</Text>
        <FlatList
          data={currentTrainer.trainingSchedule}
          renderItem={renderScheduleItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  imageLogin: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  headerDiv: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  titleName: {
    fontSize: 20, // Slightly smaller font size for a sleek, modern feel
    fontWeight: '500', // Lighter weight for a more subtle look
    color: '#333', // Darker text for high contrast but not too harsh
    textAlign: 'center', // Center alignment for balance
    marginTop: 30, // Slight space above for better alignment
    letterSpacing: 1.2, // Tight but clear letter spacing for elegance
    fontFamily: 'Poppins', // Modern sans-serif font for a clean, trendy look
    textTransform: 'capitalize', // Capitalize first letter for a cleaner, more polished appearance
    opacity: 0.9,
  },
  statesContainer: {
    backgroundColor: 'rgba(29,189,123,0.6)',
    height: 130,
    width: 130,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#075E5B',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scheduleName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  scheduleDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#666',
  },

  box: {
    backgroundColor: 'rgba(29,189,123,0.6)',
    height: 130,
    width: "90%",
    margin: 'auto',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
