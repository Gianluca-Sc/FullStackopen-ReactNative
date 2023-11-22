import { Formik } from "formik";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import FormikTextInput from "./FormikTextInput";

import theme from "./theme";
import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at leat of length 4")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Password must be at leat of length 4")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required("Password confirm is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async ({ username, password }) => {
    if (!username && !password) {
      console.log("please provide username and password");
      return;
    }

    try {
      await signUp({ username, password });
      await signIn({ username, password });
    } catch (error) {
      Alert.alert("Error", error.graphQLErrors[0].message);
      console.log(error);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
