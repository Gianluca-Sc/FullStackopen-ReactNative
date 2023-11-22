import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import RepositoryItem from "../RepositoryItem";
import { useState, useEffect } from "react";
import useRepositories from "../../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import { useDebounce } from "use-debounce";

const RepositoryList = () => {
  const [filter, setFilter] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [debounceKeyWord] = useDebounce(searchKeyword, 500);

  const FILTER = {
    latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
    highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  };

  const { repositories, loading, fetchMore, pageInfo } = useRepositories({
    ...FILTER[filter],
    debounceKeyWord,
    first: 10,
    after: pageInfo?.endCursor,
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return <ActivityIndicator color={"blue"} />;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      filter={filter}
      setFilter={setFilter}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
