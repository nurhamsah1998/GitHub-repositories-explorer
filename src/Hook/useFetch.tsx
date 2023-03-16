import { useQuery, UseQueryResult } from "react-query";
import { AxiosResponse } from "axios";
import api from "../client/api";

function useFetch({
  endPoint,
  enabled = false,
}: {
  endPoint: string;
  enabled: boolean;
}) {
  const fetchData: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery(
    [endPoint],
    () => api.get(endPoint),
    {
      enabled: enabled,
    }
  );

  /// get data result from github
  const items: AxiosResponse<any, any> | undefined | any =
    fetchData.data?.data?.items || [];
  return { items, ...fetchData };
}

export default useFetch;
