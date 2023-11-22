import { Pressable } from "react-native";
import { useNavigate } from "react-router-native";

import RepositoryItem from ".";

const RepositoryItemContainer = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  );
};

export default RepositoryItemContainer;
