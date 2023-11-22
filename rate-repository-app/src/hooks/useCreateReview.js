import { CREATE_REVIEW } from "../grahql/mutations";
import { useMutation } from "@apollo/client";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, rating, text, repositoryName }) => {
    rating = +rating;

    const result = await mutate({
      variables: { review: { ownerName, rating, text, repositoryName } },
      fetchPolicy: "no-cache",
    });

    return result;
  };

  return [createReview, result];
};

export default useCreateReview;
