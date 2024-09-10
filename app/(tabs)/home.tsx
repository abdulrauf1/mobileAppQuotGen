import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {Link} from 'expo-router';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-content-center bg-white">
      <Text className="text-3xl font-pblack">Home</Text>
    </View>
  )
}



