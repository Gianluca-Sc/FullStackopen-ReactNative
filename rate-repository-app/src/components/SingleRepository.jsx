import React from "react";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ReviewItem from "./ReviewItem";
import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();

  const { loading, error, repository, pageInfo, fetchMore } = useRepository({
    id,
    first: 2,
    after: pageInfo?.endCursor,
  });

  if (loading) {
    return <Text>loading...</Text>;
  }

  const onEndReach = () => {
    fetchMore();
  };

  const reviewsNodes = repository
    ? repository?.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewsNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} singleRepository={true} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
