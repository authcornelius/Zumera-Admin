import { CAREER } from "../../utils/apiConstants";
import { ARCHITECTUREANDDESIGNS } from "../../utils/apiConstants";
import { ACCOUNTANDFINANCES } from "../../utils/apiConstants";
import { CIVILENGINEERINGS } from "../../utils/apiConstants";
import { COOPERATEATTORNEYS } from "../../utils/apiConstants";
import { HRS } from "../../utils/apiConstants";
import { OPERATIONS } from "../../utils/apiConstants";
import { PROCUREMENTS } from "../../utils/apiConstants";
import { PROJECTMANAGERS } from "../../utils/apiConstants";
import { SALESEXECUTIVE } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const careerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCareer: builder.query({
            query: () => ({
                url: CAREER,
            }),
            providesTags: ["career"],
        }),
        getSingleCareer: builder.query({
            query: (job_slug) => ({
                url: `${CAREER}/${job_slug}`,
            }),
            providesTags: ["single_career"],
        }),

        updateSingleJob: builder.mutation({
            query: ({id, data}) => ({
                url: `${CAREER}/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["career", "single_career"],
        }),

        deleteSingleCareer: builder.mutation({
            query: ({job_slug}) => ({
                url: `${CAREER}/${job_slug}`,
                method: "DELETE"
            }),
            invalidatesTags: ["career", "single_career"],
        }),

        addArchitectureJob: builder.mutation({
            query: (data) => ({
                url: ARCHITECTUREANDDESIGNS,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["career", "single_career"],
        }),
        addAccountingJob: builder.mutation({
            query: (data) => ({
                url: ACCOUNTANDFINANCES,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["career", "single_career"],
        }),
        addCivilEngineeringJob: builder.mutation({
            query: (data) => ({
                url: CIVILENGINEERINGS,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["career", "single_career"],
        }),
        addHrsJob: builder.mutation({
            query: (data) => ({
                url: HRS,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["career", "single_career"],
        }),
        addOperationsJob: builder.mutation({
            query: (data) => ({
                url: OPERATIONS,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["career", "single_career"],
        }),
        addProcurementJob: builder.mutation({
            query: (data) => ({
                url: PROCUREMENTS,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["career", "single_career"],
        }),
        addProjectManagerJob: builder.mutation({
            query: (data) => ({
                url: PROJECTMANAGERS,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["career", "single_career"],
        }),
        addSalesExecutiveJob: builder.mutation({
            query: (data) => ({
                url: SALESEXECUTIVE,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["career", "single_career"],
        }),
        addCooperateAttorneyJob: builder.mutation({
            query: (data) => ({
                url: COOPERATEATTORNEYS,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["career", "single_career"],
        })
    })
})


export const {
    useGetCareerQuery,
    useGetSingleCareerQuery,
    useDeleteSingleCareerMutation,
    useAddArchitectureJobMutation,
    useAddAccountingJobMutation,
    useAddCivilEngineeringJobMutation,
    useAddHrsJobMutation,
    useAddOperationsJobMutation,
    useAddProcurementJobMutation,
    useAddProjectManagerJobMutation,
    useAddSalesExecutiveJobMutation,
    useAddCooperateAttorneyJobMutation,
    useUpdateSingleJobMutation,
} = careerApiSlice