import { useQuery } from "@apollo/client";
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { GET_CURRENT_USER } from "../grahql/queries";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Myreviews = () => {
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });

  if (loading) {
    return <ActivityIndicator color={"blue"} />;
  }

  const reviewsNodes = data.me
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewsNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      ListEmptyComponent={<Text>Empty</Text>}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Myreviews;
