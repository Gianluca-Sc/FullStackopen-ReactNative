import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import { roundAmount } from "../../utils/index";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    gap: 25,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  column: {
    flexDirection: "column",
    flex: 1,
    gap: 10,
  },
  name: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    flexShrink: 1,
  },

  language: {
    alignSelf: "flex-start",
    padding: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },

  info: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

const RepositoryItem = ({ item, singleRepository = false }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    url,
  } = item;

  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <Header props={{ fullName, ownerAvatarUrl, description, language }} />
      <View style={styles.info}>
        <Stat text="Stars" amount={stargazersCount} />
        <Stat text="Forks" amount={forksCount} />
        <Stat text="Reviews" amount={reviewCount} />
        <Stat text="Rating" amount={ratingAverage} />
      </View>
      {singleRepository && (
        <View style={[styles.language, { alignSelf: "center", width: "90%" }]}>
          <Pressable onPress={handlePress}>
            <Text style={{ color: "white", textAlign: "center", padding: 5 }}>
              Open in Github
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const Header = ({ props }) => {
  const { fullName, ownerAvatarUrl, description, language } = props;

  return (
    <View style={styles.row}>
      <Image style={styles.image} src={ownerAvatarUrl} />
      <View style={styles.column}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.language}>
          <Text style={{ color: "white" }}>{language}</Text>
        </View>
      </View>
    </View>
  );
};

const Stat = ({ text, amount }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
    },
    amount: {
      fontWeight: theme.fontWeights.bold,
      color: theme.colors.textPrimary,
      fontSize: 16,
    },
    title: {
      color: theme.colors.textSecondary,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.amount}>{roundAmount(amount)}</Text>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export default RepositoryItem;
