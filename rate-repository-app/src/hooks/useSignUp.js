import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../grahql/mutations";

import { useNavigate } from "react-router-native";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    const result = await mutate({
      variables: { user: { username, password } },
    });

    return result;
  };

  return [signUp, result];
};

export default useSignUp;
