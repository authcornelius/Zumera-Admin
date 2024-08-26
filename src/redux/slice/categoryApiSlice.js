import { CATEGORY } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (page) => ({
                url: CATEGORY,
                params:{page}
            }),
            providesTags: ["categories"],
        }),
        getSingleCategory: builder.query({
            query: (category_slug) => ({
                url: `${CATEGORY}/${category_slug}`,
            }),
            providesTags: ["single_category"],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: CATEGORY,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["categories"],
        }),
        updateCategory: builder.mutation({
            query: ({category_slug, data}) => ({
                url: `${CATEGORY}/${category_slug}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["categories", "single_category"],
        }),
    })
})


export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useGetSingleCategoryQuery,
    useUpdateCategoryMutation,
} = categoryApiSlice