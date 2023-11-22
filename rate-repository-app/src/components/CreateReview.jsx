import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from "./theme";
import useCreateReview from "../hooks/useCreateReview";

const initialValues = {
  ownerName: "",
  name: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup.number().integer().min(0).max(100).required(),
  text: yup.string().nullable(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Create a Review</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  button: {
    width: "90%",
    padding: 15,
    backgroundColor: theme.colors.primary,
    color: "white",
    textAlign: "center",
    borderRadius: 5,
    marginTop: 5,
  },
});

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async ({ ownerName, rating, text, repositoryName }) => {
    try {
      const { data } = await createReview({
        ownerName,
        rating,
        text,
        repositoryName,
      });

      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (error) {
      Alert.alert("Error", error.graphQLErrors[0].message);
      console.log(error);
    }
  };
  return <ReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
