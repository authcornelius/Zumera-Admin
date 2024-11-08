import { SUBSCRIBER } from "../../utils/apiConstants";
import { INVESTOR } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const staffApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubscriber: builder.query({
            query: (page) => ({
                url: SUBSCRIBER,
                params:{page}
            }),
            providesTags: ["subscriber"],
        }),
        getInvestor: builder.query({
            query: (page) => ({
                url: INVESTOR,
                params:{page}
            }),
            providesTags: ["investor"],
        }),
    })
})


export const {
    useGetSubscriberQuery,
    useGetInvestorQuery,
} = staffApiSlice