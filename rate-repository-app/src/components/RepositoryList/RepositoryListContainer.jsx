import { FlatList, StyleSheet, Text, View } from "react-native";
import RepositoryItem from "../RepositoryItem";
import RepositoryItemContainer from "../RepositoryItem/RepositoryItemContainer";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import useRepositories from "../../hooks/useRepositories";
import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;

    // ...

    return (
      <Filter
        filter={props.filter}
        setFilter={props.setFilter}
        searchKeyword={props.searchKeyword}
        setSearchKeyword={props.setSearchKeyword}
      />
    );
  };

  render() {
    const props = this.props;

    repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItemContainer item={item} />}
        ListEmptyComponent={<Text>Empty</Text>}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(item) => item.id}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const Filter = ({ filter, setFilter, searchKeyword, setSearchKeyword }) => {
  const onChangeSearch = (query) => setSearchKeyword(query);

  return (
    <>
      <Searchbar
        placeholder="Search"
        value={searchKeyword}
        onChangeText={onChangeSearch}
      />

      <Picker
        prompt="Select an item..."
        selectedValue={filter}
        onValueChange={(itemValue) => setFilter(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </>
  );
};

export default RepositoryListContainer;
