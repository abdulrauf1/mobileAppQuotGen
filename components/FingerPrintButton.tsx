import { Image, Text, TouchableOpacity } from "react-native";
import React from 'react'
import { icons } from "@/constants/icons";

const FingerPrintButton = ({
    title,
    handlePress,
    containerStyles,
    
  }:any) => {

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-white p-2 border-2 border-gray-200 rounded-lg shadow-md ${containerStyles}`}
    >
        <Image
          source={ icons.fingerPrint}
          className="w-14 h-14"
          resizeMode="contain"
        />
    </TouchableOpacity>
  )
}

export default FingerPrintButton