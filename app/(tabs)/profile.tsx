import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "@/constants/icons";
// import { icons } from "../../constants";
// import useAppwrite from "../../lib/useAppwrite";

import { signOut } from "@/lib/config";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";


export default function Profile() {
  const { user, setUser, setIsLogged } = useGlobalContext();
  
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/log-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

          

            
          </View>
      
    </SafeAreaView>
  );
};
