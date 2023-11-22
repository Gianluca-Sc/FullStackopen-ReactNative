import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_REPOSITORIES } from "../grahql/queries";

//GRAPHQL
const useRepositories = ({ orderBy, orderDirection, searchKeyword, first }) => {
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderBy, orderDirection, searchKeyword, first },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        orderDirection,
        searchKeyword,
        first,
      },
    });
  };

  const repositories = data?.repositories;
  const pageInfo = data?.pageInfo;

  return { loading, error, repositories, fetchMore: handleFetchMore, pageInfo };
};

export default useRepositories;

//API REST
/* const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [loading, setLoading] = useState(false);
  
    const fetchRepositories = async () => {
      setLoading(true);
  
      // Replace the IP address part with your own IP address!
      const response = await fetch("http://192.168.178.28:5000/api/repositories");
      const json = await response.json();
  
      setLoading(false);
      setRepositories(json);
    };
  
    useEffect(() => {
      fetchRepositories();
    }, []);
  
    return { repositories, loading, refetch: fetchRepositories };
  };
  
  export default useRepositories;
 */
