import { View, Text, Alert } from 'react-native';

import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useEffect } from 'react';

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  useEffect( () =>{
    Alert.alert("Error", `${loading} ${isLogged}`);
  },[])

  return (
    <>
      <Stack>
        <Stack.Screen 
          name="log-in"
          options={{
            headerShown: false
          }}
        />

      </Stack>
      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default AuthLayout