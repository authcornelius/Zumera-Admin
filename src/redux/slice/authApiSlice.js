import { LOGIN } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: LOGIN,
                method: 'POST',
                body: data,
            })
        }),
    })
})


export const { 
    useLoginMutation,
} = authApiSlice;