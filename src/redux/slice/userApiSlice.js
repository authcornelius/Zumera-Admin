import { REGISTER } from "../../utils/apiConstants";
import { USER } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: USER,
                // params:{page}
            }),
            providesTags: ["users"],
        }),
        getSingleUser: builder.query({
            query: (user_slug) => ({
                url: `${USER}/${user_slug}`,
            }),
            providesTags: ["single_user"],
        }),

        // register a user
        createUser: builder.mutation({
            query: (data) => ({
                url: REGISTER,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["users"],
        }),

        updateUser: builder.mutation({
            query: ({user_id, data}) => ({
                url: `${USER}/${user_id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["users", "single_user"],
        }),
        deleteUser: builder.mutation({
            query: ({user_id}) => ({
                url: `${USER}/${user_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["users", "single_user"],
        }),
    })
})


export const {
    useCreateUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
    useGetSingleUserQuery,
    useDeleteUserMutation,
} = userApiSlice