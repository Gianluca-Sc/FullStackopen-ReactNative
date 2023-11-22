import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../grahql/mutations";

import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const [mutate, result] = useMutation(SIGN_IN);
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: { credentials: { username, password } },
    });

    await authStorage.setAccessToken(result.data.authenticate.accessToken);

    await client.resetStore();

    navigate("/");
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
