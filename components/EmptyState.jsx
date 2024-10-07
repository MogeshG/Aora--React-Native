import { View, Text, Image } from "react-native";
import CustomButton from "../components/customButton"
import { images } from "../constants";
import { router } from "expo-router";

const EmptyState = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[150px]"  resizeMode="contain"/>
      <Text className="text-gray-100 font-pmedium text-xl">{title}</Text>
      <Text className="text-xs text-center font-pmedium text-white m-2">
        {subTitle}
      </Text>
      <CustomButton 
        title="Create Video"
        handlePress={()=> router.push('/create')}
        containerStyles="w-full px-4"
      />
    </View>
  );
};

export default EmptyState;
