import { StyleSheet, Text, View } from 'react-native';
import { type StackScreenProps } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';

import store from '../store';
import { type StackParams } from '../components/Navigator/Navigator'

type RouteProps = StackScreenProps<StackParams, 'Details'>['route'];
type NavigationProps = StackScreenProps<StackParams, 'Details'>['navigation'];

import Card from '../components/Card';
import { SharedElement } from 'react-navigation-shared-element';
import { useSharedValue } from 'react-native-reanimated';

const Details = () => {
  const xd = useSharedValue(true)
  const { params: { id }} = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();

  const cardData = store.find(i => i.id === id); 

  const handleNavigation = (id: string) => {
    navigation.goBack();
  }

  if (!cardData) {
    handleNavigation('1')
  }


  return (
    <View style={styles.container}>
      <SharedElement id={`${cardData!.id}.card`}>
        <Card data={cardData!} index={0} isListOpen={xd} onPress={handleNavigation}/>
      </SharedElement>
      <Text>Transaction 1</Text>
      <Text>Transaction 2</Text>
      <Text>Transaction 3</Text>
      <Text>Transaction 4</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10
  }
})

export default Details
