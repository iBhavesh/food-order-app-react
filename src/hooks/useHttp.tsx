import { useState, useCallback } from "react";

type PostRequestFunction = (data: any) => void;

const useHttp = () => {
  const [httpError, setHttpError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (
      url: string,
      config: RequestInit,
      postRequest: PostRequestFunction
    ) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, config);
        if (!response.ok) {
          throw new Error("Ooops! Something went wrong!");
        }
        const data = await response.json();
        postRequest(data);
      } catch (error) {
        setHttpError(error.message);
      }
      setIsLoading(false);
    },
    []
  );
  return { isLoading, httpError, sendRequest };
};

export default useHttp;
