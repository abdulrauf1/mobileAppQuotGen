import { useEffect, useState } from 'react';
import { Link, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal, Platform, View, Text, ScrollView, Dimensions, Image, Alert} from 'react-native';

import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { images } from '@/constants/images';
import FingerPrintButton from '@/components/FingerPrintButton';
import * as LocalAuthentication from 'expo-local-authentication';

import {  signIn } from "../../lib/config";
import { useGlobalContext } from "../../context/GlobalProvider";


import AndroidAuth from './AndroidAuth';

const Login = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [authenticated, setAuthenticated] =useState(false);


  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      const res = await signIn(form.email, form.password);
      if(res != null){
        // const result = await getCurrentUser();
        console.log(res);
        setUser(res.email);
        setIsLogged(true);

        Alert.alert("Success", "User signed in successfully");
        router.replace("/home");
      }
      else{
        Alert.alert("Error", "Incorrect Username or Password");
      }
      
    } catch (error:any) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const showFingerPrintOptons = () => {
    LocalAuthentication.hasHardwareAsync().then((data) => {
      if(data){
        LocalAuthentication.isEnrolledAsync().then((en) => {
          if(en){
            // setModalVisible(!modalVisible);
          }
          else{
            Alert.alert('Alert Title', 'Auth Not Enroll', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        });
        
      }
      else{
        Alert.alert('Alert Title', 'Finger Not Print Supported', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    });
    if (Platform.OS === 'android') {
      setModalVisible(true);
    } else {
      Alert.alert('Alert Title', 'IOS Touch ID', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }

  }

  const bioAuth = async () => {
    try {
        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Login with Biometrics",
            disableDeviceFallback: true,
            cancelLabel: "Cancel",
        });
        if (biometricAuth.success) {
          Alert.alert("Success", "User signed in successfully");
          router.replace("/home");      
        }
    } catch (error:any) {
      Alert.alert("Error", error.message);        
    }
};

  useEffect( () => {
    if(modalVisible)
    {
      bioAuth();
      
    }

  },[modalVisible]);

  return (
   <SafeAreaView className="bg-light h-full">
    <ScrollView>
      <View className="w-full justify-center h-full my-6 px-4"
      style={{
        minHeight: Dimensions.get("window").height - 100,
      }}
      >
        <View className="items-center justify-center">
          <Image 
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
        </View>
        <Text className="text-2xl text-semibold mt-10 font-psemibold"> Log in to IS Works</Text>

        <FormField 
          title = "Email"
          value = {form.email}
          handleChangeText = {(e:any)=> setForm({ ...form, email: e})}
          otherStyles = "mt-7"
          keyboardType = "email-address"
        />

        <FormField 
          title = "Password"
          value = {form.password}
          handleChangeText = {(e:any)=> setForm({ ...form, password: e})}
          otherStyles = "mt-7"
          
        />

        <CustomButton 
          title="Log In"
          handlePress = {submit}
          containerStyles = "mt-7"
          isLoading = {isSubmitting}
        />
        
        <View className="justify-center pt-5 flex-row gap-2">
          <Text>Forgot username or Password {"\n"}</Text>
          
        </View>
        <View className="justify-center pt-5 flex-row gap-2">
          
          <FingerPrintButton 
            handlePress = {showFingerPrintOptons}
            
          />
        </View>
        
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        
          setModalVisible(!modalVisible);
        }}>
        <View className="bg-black bg-opacity-50 flex-1 justify-center">
          <View className="bg-white px-10 py-10 rounded-md">
          
            <Text className="text-xl font-bold pb-5 text-center text-gray-800">
              Biometric Authentication
            </Text>
            
            <Text className="font-pnormal pb-5 text-center text-gray-100">Place your finger at FingerPrint Sensor</Text>
            <View className="justify-center pb-5 flex-row gap-2">
              <FingerPrintButton 
                handlePress = {bioAuth}                
              />
            </View>
        
              

            <CustomButton
              title="Close"
              handlePress={() => setModalVisible(!modalVisible)}>              
            </CustomButton>
          </View>
        </View>
      </Modal>

    </ScrollView>
   </SafeAreaView>

  )
}

export default Login;

