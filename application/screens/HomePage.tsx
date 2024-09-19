import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import {useRoute, RouteProp} from '@react-navigation/native';

type RouteParams = {
  clientType?: number;
};

// async storage
export default function HomePage() {

  const { currentTrainer } = useContext(TrainerContext);
  const { currentCoustumer } = useContext(CoustumerContext);
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const clientType = route.params?.clientType;

  if (clientType == 2) {
    return (
      <SafeAreaView>
        <View style={styles.headerDiv}>
          <View>
            <Text style={styles.titleName}>Hello {currentCoustumer.first_name as string}</Text>
          </View>
          <View>
            <Image
              source={{ uri: currentCoustumer.image }}
              style={styles.imageLogin}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  else {
    return (
      <SafeAreaView>
        <View style={styles.headerDiv}>
          <View>
            <Text style={styles.titleName}>Hello {currentTrainer.first_name}</Text>
          </View>
          <View>
            <Image
              source={{ uri: currentTrainer.image }}
              style={styles.imageLogin}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  imageLogin: {
    height: 100,
    width: 100,
    borderRadius: 100
  },
  headerDiv: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginVertical: 20
  },
  titleName: {
    marginTop: 40,
    fontSize: 18
  }
})