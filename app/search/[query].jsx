import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
} from "react-native";
import useAppwrite from "../../lib/useAppwrite";
import { getSearchPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  console.log(query)
  const { data: posts, refetch } = useAppwrite(getSearchPosts(query));
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    refetch();
  }, [query]);

  const handleVideoPlay = (id) => {
    setActiveVideoId(id);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            isPlaying={activeVideoId === item.$id}
            onPlay={() => handleVideoPlay(item.$id)}
            onStop={() => handleVideoPlay(null)}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results for
            </Text>
            <Text className="font-psemibold text-2xl text-gray-100">
              {query}
            </Text>
            <View className="mt-6 mb-8 ">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="No videos available for this title"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
