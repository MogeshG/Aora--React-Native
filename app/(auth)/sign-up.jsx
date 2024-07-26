import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/customButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProviders";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const handleSignUp = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }
    setLoading(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      if (!result) throw new Error("User creation failed");
      
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="min-h-[93vh] w-full flex-1 justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[110px] h-[80px]"
          />
          <Text className="font-pbold text-white text-2xl mt-4">Sign Up</Text>
          <View className="py-2">
            <FormField
              title="Username"
              otherStyles="mt-2"
              placeholder="Enter Name"
              handleChangeText={(value) => {
                console.log(value)
                setForm({ ...form, username: value });

              }}
            />
            <FormField
              title="Email"
              otherStyles="mt-2"
              placeholder="Enter Email"
              handleChangeText={(value) => {
                console.log(value)
                setForm({ ...form, email: value });

              }}
            />
            <FormField
              title="Password"
              otherStyles="mt-2"
              placeholder="Enter Password"
              handleChangeText={(value) => {
                console.log(value)
                setForm({ ...form, password: value });

              }}
            />
          </View>
          <CustomButton
            title="Sign Up"
            handlePress={handleSignUp}
            containerStyles="mt-7"
            isLoading={loading}
          />
          <View className="items-center">
            <Text className="font-pregular p-2 text-gray-100">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-psemibold text-secondary-200"
              >
                Sign in
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
