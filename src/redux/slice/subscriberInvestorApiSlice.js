import { SUBSCRIBER } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const staffApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubscriber: builder.query({
            query: (page) => ({
                url: SUBSCRIBER,
                params:{page}
            }),
            providesTags: ["staff"],
        }),
    })
})


export const {
    useGetSubscriberQuery,
    useGetSingleStaffQuery,
    useUpdateStaffMutation,
} = staffApiSlice