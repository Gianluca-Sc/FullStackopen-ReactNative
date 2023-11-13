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
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { ME } from "../grahql/queries";
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
  const { loading, error, data } = useQuery(ME);
  const signOut = useSignOut();

  const username = data?.me?.username;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {username ? (
          <TouchableWithoutFeedback onPress={signOut}>
            <Text style={styles.text}>Sign Out</Text>
          </TouchableWithoutFeedback>
        ) : (
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppBar;
