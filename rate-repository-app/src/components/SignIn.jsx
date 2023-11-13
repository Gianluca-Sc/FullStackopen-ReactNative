import { Formik } from "formik";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FormikTextInput from "./FormikTextInput";

import theme from "./theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </TouchableWithoutFeedback>
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
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async ({ username, password }) => {
    if (!username && !password) {
      console.log("please provide username and password");
      return;
    }

    try {
      const { data } = await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
