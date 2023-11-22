import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "./theme";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../grahql/mutations";

const ReviewItem = ({
  review: { id, text, rating, createdAt, user, repository },
  ...props
}) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const viewRepository = () => {
    navigate(`/repositories/${repository.id}`);
  };

  const deleteReview = () => {
    Alert.alert("Delete review", "Are you sure you want delete this review?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            const result = await mutate({ variables: { deleteReviewId: id } });
            props.refetch();
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.review}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{rating}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.username}>
            {user?.username || repository?.fullName}
          </Text>
          <Text style={styles.date}>
            {new Date(createdAt).toLocaleDateString()}
          </Text>
          <View style={styles.text}>
            <Text>{text}</Text>
          </View>
        </View>
      </View>
      {repository && (
        <View style={styles.bottonContainer}>
          <Pressable
            onPress={viewRepository}
            style={[styles.botton, { backgroundColor: theme.colors.primary }]}
          >
            <Text style={styles.bottonText}>View repository</Text>
          </Pressable>
          <Pressable
            onPress={deleteReview}
            style={[styles.botton, { backgroundColor: "crimson" }]}
          >
            <Text style={styles.bottonText}>Delete repository</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  review: {
    flexDirection: "row",
    gap: 15,
    padding: 15,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  rating: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  details: {
    gap: 2,
  },
  username: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    color: "black",
  },
  date: {
    color: theme.colors.textSecondary,
  },
  text: {
    width: "95%",
  },

  bottonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 15,
    padding: 20,
  },

  botton: {
    flexGrow: 1,
    padding: 15,
    borderRadius: 5,
  },

  bottonText: {
    color: "white",
    textAlign: "center",
  },
});

export default ReviewItem;
