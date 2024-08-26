import { ASSET } from "../../utils/apiConstants";
import { apiSlice } from "./apiSlice";



export const assetApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssets: builder.query({
            query: (page) => ({
                url: ASSET,
                params:{page}
            }),
            providesTags: ["assets"],
        }),
        getSingleAsset: builder.query({
            query: (asset_slug) => ({
                url: `${ASSET}/${asset_slug}`,
            }),
            providesTags: ["single_asset"],
        }),
        createAsset: builder.mutation({
            query: (data) => ({
                url: ASSET,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["assets"],
        }),
        updateAsset: builder.mutation({
            query: ({asset_slug, data}) => ({
                url: `${ASSET}/${asset_slug}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["assets", "single_asset"],
        }),
        dispatchAsset: builder.mutation({
            query: ({asset_slug, data}) => ({
                url: `${ASSET}/dispatch/${asset_slug}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["assets"],
        }),
    })
})


export const {
    useCreateAssetMutation,
    useGetAssetsQuery,
    useGetSingleAssetQuery,
    useUpdateAssetMutation,
    useDispatchAssetMutation,
} = assetApiSlice