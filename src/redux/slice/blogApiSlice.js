import { BLOG } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlog: builder.query({
            query: () => ({
                url: BLOG,
                // params:{page}
            }),
            providesTags: ["all_blogs"],
        }),
        // getSingleUser: builder.query({
        //     query: (user_slug) => ({
        //         url: `${USER}/${user_slug}`,
        //     }),
        //     providesTags: ["single_user"],
        // }),

        // // register a user
        // createUser: builder.mutation({
        //     query: (data) => ({
        //         url: REGISTER,
        //         method: "POST",
        //         body: data
        //     }),
        //     invalidatesTags: ["users"],
        // }),

        // updateUser: builder.mutation({
        //     query: ({user_id, data}) => ({
        //         url: `${USER}/${user_id}`,
        //         method: "PATCH",
        //         body: data
        //     }),
        //     invalidatesTags: ["users", "single_user"],
        // }),
        // deleteUser: builder.mutation({
        //     query: ({user_id}) => ({
        //         url: `${USER}/${user_id}`,
        //         method: "DELETE"
        //     }),
        //     invalidatesTags: ["users", "single_user"],
        // }),
    })
})


export const {
    useGetAllBlogQuery,
    useCreateUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
    useGetSingleUserQuery,
    useDeleteUserMutation,
} = blogApiSlice