import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Resource } from "../models/resource.model.js";

const getResources = asyncHandler(async (req, res) => {
    const { domain, type } = req.query;
    if(!domain){
        throw new ApiError(400, "No domain");
    }
    if(!type){
        throw new ApiError(400, "No type");
    }
    try{
        const resources = await Resource.find({domain: domain, type: type});
        
        if(resources.length === 0){
            throw new ApiError(404, "No resources found");
        }

        res.status(200).json(resources);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: domain})
    }
})

const postResources = asyncHandler(async (req, res) => {
    const {domain, type, title, owner, description, link} = req.body;
    if(!domain){
        throw new ApiError(400, "No domain");
    }
    if(!type){
        throw new ApiError(400, "No type");
    }
    if(!title || !description || !link || !owner){
        throw new ApiError(400, "No details");
    }

    try{
        await Resource.create({
            domain,
            type,
            title,
            owner,
            description,
            link
        });
    } catch(error){
        throw new ApiError(500, "Error while posting resource");
    }

    res.status(200).json(new ApiResponse(200, "Resource posted successfully"));
})

export { getResources, postResources };