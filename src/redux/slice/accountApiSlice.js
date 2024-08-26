import { ACCOUNT } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: (page) => ({
                url: ACCOUNT,
                params:{page}
            }),
            providesTags: ["accounts"],
        }),
        getSingleAccount: builder.query({
            query: (account_slug) => ({
                url: `${ACCOUNT}/${account_slug}`,
            }),
            providesTags: ["single_account"],
        }),
        createAccount: builder.mutation({
            query: (data) => ({
                url: ACCOUNT,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["accounts"],
        }),
        updateAccount: builder.mutation({
            query: ({account_slug, data}) => ({
                url: `${ACCOUNT}/${account_slug}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["accounts", "single_account"],
        }),
    })
})


export const {
    useCreateAccountMutation,
    useGetAccountsQuery,
    useGetSingleAccountQuery,
    useUpdateAccountMutation,
} = accountApiSlice