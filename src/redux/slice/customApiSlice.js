import { CUSTOM } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const customApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCustoms: builder.query({
            query: (page) => ({
                url: CUSTOM,
                params:{page}
            }),
            providesTags: ["customs"],
        }),
        getSingleCustom: builder.query({
            query: (custom_slug) => ({
                url: `${CUSTOM}/${custom_slug}`,
            }),
            providesTags: ["single_custom"],
        }),
        createCustom: builder.mutation({
            query: (data) => ({
                url: CUSTOM,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["customs"],
        }),
        updateCustom: builder.mutation({
            query: ({custom_slug, data}) => ({
                url: `${CUSTOM}/${custom_slug}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["customs", "single_custom"],
        }),
    })
})


export const {
    useCreateCustomMutation,
    useGetCustomsQuery,
    useGetSingleCustomQuery,
    useUpdateCustomMutation,
} = customApiSlice