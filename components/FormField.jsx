import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  handleChangeText,
  placeholder,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="w-full rounded-xl my-1">
      <Text className={`font-pregular text-white ${otherStyles}`}>{title}</Text>
      <View className="flex-row border border-black-100 rounded-lg bg-black-100 w-full items-center focus:border-secondary">
        <TextInput
          className="flex-1 h-[55px] p-2 text-white font-psemibold"
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 mx-2"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
