import { useQuery } from "react-query";
import { useDebounce } from "../../utils/useDebounce";
import { getRequest } from "../../utils/httpClient";

export const useUsernameCheck = (username: string) => {
  const debouncedUsername = useDebounce(username, 500);

  return useQuery(
    ["checkUsername", debouncedUsername],
    async () => {
      if (!debouncedUsername || debouncedUsername.length < 3) {
        return null;
      }
      const response = await getRequest("/user", {
        username,
      });
      return response.isAvailable;
    },
    {
      enabled: !!debouncedUsername,
    }
  );
};
