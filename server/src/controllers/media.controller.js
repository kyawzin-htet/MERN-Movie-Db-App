const responseHandler = require("../handlers/response.handler.js");
const tmdbApi = require("../tmdb/tmdb.api.js");
const userModel = require("../models/user.model.js");
const favouriteModel = require("../models/favourite.model.js");
const reviewModel = require("../models/review.model.js");
const tokenMiddleware = require("../middlewares/token.middleware.js");


const getList = async(req, res) =>{
    try{
        const {page} = req.query;
        const {mediaType, mediaCategory} = req.params;

        const response = await tmdbApi.mediaList({mediaType, mediaCategory, page})

        return responseHandler.ok(res, response);
    }catch{
        responseHandler.error(res)
    }
};

const getGenres = async(req, res) =>{
    try{
        const {mediaType} = req.params;
        const response = await tmdbApi.mediaGenres({mediaType});

        return responseHandler.ok(res, response);
    }catch{
        responseHandler.error(res)
    }
};

const search = async(req, res) =>{
    try{
        const {mediaType} = req.params;
        const { query, page} = req.query;

        const response = await tmdbApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === "people" ? "person" : mediaType
        });

        responseHandler.ok(res, response);
    }catch{
        responseHandler.error(res)
    }
};

const getDetail = async(req, res) =>{
    try{
        const {mediaType, mediaId} = req.params;
        const params = {mediaType, mediaId} 

        const media = await tmdbApi.mediaDetail(params)

        media.credits  = await tmdbApi.mediaCredits(params)

        const videos = await tmdbApi.mediaVideos(params)

        media.videos = videos

        const recommend = await tmdbApi.mediaRecommend(params)

        media.recommend = recommend.results

        media.images = await tmdbApi.mediaImages(params)

        const tokenDecoded = tokenMiddleware.tokenDecode(req)

        if(tokenDecoded){
            const user = await userModel.findById(tokenDecoded.data)
            if(user){
                const isFavourite = await favouriteModel.findOne({user: user.id, mediaId})
                media.isFavourite = isFavourite !== null
            }
        }
        media.reviews = await reviewModel.find({mediaId}).populate("user").sort("-createdAt");

        responseHandler.ok(res, media)
     }catch(err){
        console.log(err)
        responseHandler.error(res)
    }
}

module.exports ={
    getList,
    getGenres,
    search,
    getDetail
}