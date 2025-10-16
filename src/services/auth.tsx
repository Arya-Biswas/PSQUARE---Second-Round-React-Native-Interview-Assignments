import {END_POINTS} from '../helpers/constants/url';
import {CommonResponse} from '../types/General';
import emptySplitApi from '../utils/rtk';

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<
      CommonResponse,
      {
        body: {
          email: string;
          username: string;
          first_name: string;
          last_name: string;
          password: string;
          tos_accept: boolean;
          privacy_policy_accept: boolean;
        };
      }
    >({
      query: ({body}) => ({
        url: END_POINTS.register,
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation<
      CommonResponse,
      {body: {email: string; password: string}}
    >({
      query: ({body}) => ({
        url: END_POINTS.login || 'auth/login',
        method: 'POST',
        body,
      }),
    }),

    verifyEmailOtp: builder.mutation<
      CommonResponse,
      {
        body: {
          email: string;
          action: 'login' | 'register' | 'passwordReset';
          code: string;
        };
      }
    >({
      query: ({body}) => ({
        url: END_POINTS.verifyEmailOtp,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailOtpMutation,
} = authApi;
