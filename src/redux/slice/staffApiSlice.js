import { STAFF } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const staffApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStaff: builder.query({
            query: (page) => ({
                url: STAFF,
                params:{page}
            }),
            providesTags: ["staff"],
        }),
        getSingleStaff: builder.query({
            query: (staff_slug) => ({
                url: `${STAFF}/${staff_slug}`,
            }),
            providesTags: ["single_staff"],
        }),
        createStaff: builder.mutation({
            query: (data) => ({
                url: STAFF,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["staff"],
        }),
        updateStaff: builder.mutation({
            query: ({staff_slug, data}) => ({
                url: `${STAFF}/${staff_slug}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["staff", "single_staff"],
        }),
    })
})


export const {
    useCreateStaffMutation,
    useGetStaffQuery,
    useGetSingleStaffQuery,
    useUpdateStaffMutation,
} = staffApiSlice