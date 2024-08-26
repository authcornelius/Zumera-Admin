import { USER } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (page) => ({
                url: USER,
                params:{page}
            }),
            providesTags: ["users"],
        }),
        getSingleUser: builder.query({
            query: (user_slug) => ({
                url: `${USER}/${user_slug}`,
            }),
            providesTags: ["single_user"],
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: USER,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["users"],
        }),
        updateUser: builder.mutation({
            query: ({user_slug, data}) => ({
                url: `${USER}/${user_slug}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["users", "single_user"],
        }),
        updateUserStatus: builder.mutation({
            query: ({ user_slug, status }) => ({
                url: `${USER}/${user_slug}`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["users", "single_user"],
        }),
    })
})


export const {
    useCreateUserMutation,
    useGetUsersQuery,
    useGetSingleUserQuery,
    useUpdateUserMutation,
    useUpdateUserStatusMutation,
} = userApiSlice