import { useMutation } from "react-query";
import { FormData } from "./types";
import { postRequest } from "../../utils/httpClient";

const submitForm = (data: FormData) => {
  return postRequest("/register", data);
};

export const useSubmitForm = () => {
  return useMutation(submitForm);
};
