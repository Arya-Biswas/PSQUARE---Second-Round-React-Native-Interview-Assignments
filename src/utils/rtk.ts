// import { API_URL } from '@env';
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 400) {
    const errors = Object.values(result?.error?.data || {});

    if (errors?.length > 1 && errors[1] === 400) {
      return result;
    }

    if (errors?.length) {
      const error = errors[0] as any;
      if (error?.length) {
      }
    }
  }

  return result;
};

const emptySplitApi = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['UNAUTHORIZED', 'UNKNOWN_ERROR'],
  endpoints: () => ({}),
});

export default emptySplitApi;
