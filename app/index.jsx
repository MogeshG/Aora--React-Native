import React from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { Redirect, router } from "expo-router";
import CustomButton from "../components/customButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/GlobalProviders";

export default function App() {
  const { isLoading, isLoggedIn }  = useGlobalContext();

  if (!isLoading && !isLoggedIn) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-[90vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          ></Image>
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          ></Image>
          <View className="relative mt-5">
            <Text className="text-3xl text-center text-bold text-white">
              Discover endles possibilities with
              <Text className="text-secondary-200"> Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-1 right-20"
              resizeMode="contain"
            ></Image>
          </View>
          <Text className="text-sm font-pregular mt-7 text-center text-gray-100">
            Where creativity Meets Innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
