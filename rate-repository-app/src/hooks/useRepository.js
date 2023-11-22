import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../grahql/queries";

const useRepository = ({ id, first }) => {
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id, first },
  });

  console.log("data", data);

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first,
      },
    });
  };

  //console.log(data);
  //const reviews = data?.repository.reviews;
  const repository = data?.repository;

  const pageInfo = data?.pageInfo;

  return {
    loading,
    error,

    repository,
    pageInfo,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;
