import { OFFICE } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const officeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOffices: builder.query({
            query: (page) => ({
                url: OFFICE,
                params:{page}
            }),
            providesTags: ["offices"],
        }),
        getSingleOffice: builder.query({
            query: (office_slug) => ({
                url: `${OFFICE}/${office_slug}`,
            }),
            providesTags: ["single_office"],
        }),
        createOffice: builder.mutation({
            query: (data) => ({
                url: OFFICE,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["offices"],
        }),        
        updateOffice: builder.mutation({
            query: ({office_slug, data}) => ({
                url: `${OFFICE}/${office_slug}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["offices", "single_office"],
        }),
    })
})


export const {
    useCreateOfficeMutation,
    useGetOfficesQuery,
    useGetSingleOfficeQuery,
    useUpdateOfficeMutation,
} = officeApiSlice

