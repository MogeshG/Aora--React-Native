import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";

import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import VideoCard from "../../components/VideoCard";
import Trending from "../../components/Trending";

const home = () => {
  const {data: posts, loading, refetch} = useAppwrite(getAllPosts);
  const {data: latestPosts, refetch: refetchLatest} = useAppwrite(getLatestPosts);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = async () => {
    setRefresh(true);
    await refetch();
    await refetchLatest();
    setRefresh(false);
  };


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem= {({item}) => (
          <VideoCard video = {item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between flex-row items-start mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-gray-100 ">
                  Mogesh
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first one to upload video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default home;
