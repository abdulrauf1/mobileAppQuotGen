import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from "../constants/images"; 
import CustomButton from '@/components/CustomButton';


const App = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          
          <View className="relative mt-5">
              
            <Text className="text-3xl text-white font-bold text-center">
              IS Works{''}
              
              
            </Text>
            <Text className="text-sm font-pregular text-gray-100 text-center">Servies & Genereal Order Suppliers</Text>
          </View>          
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/log-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />

    </SafeAreaView>
  )
}

export default App
