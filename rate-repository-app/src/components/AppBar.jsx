import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import theme from "./theme";
import { Link, useNavigate } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER, ME } from "../grahql/queries";
import useSignOut from "../hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 20,

    backgroundColor: "#24292e",
  },

  text: {
    color: "white",
    marginHorizontal: 5,
    fontSize: theme.fontSizes.subheading,
  },
});

const AppBar = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const username = data?.me?.username;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {username && (
          <>
            <Pressable onPress={() => navigate("/review")}>
              <Text style={styles.text}>Create a review</Text>
            </Pressable>
            <Pressable onPress={() => navigate("/myreviews")}>
              <Text style={styles.text}>My reviews</Text>
            </Pressable>
          </>
        )}
        {username ? (
          <Pressable onPress={signOut}>
            <Text style={styles.text}>Sign Out</Text>
          </Pressable>
        ) : (
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
        {!username && (
          <Link to="/signup">
            <Text style={styles.text}>Sign up</Text>
          </Link>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppBar;
