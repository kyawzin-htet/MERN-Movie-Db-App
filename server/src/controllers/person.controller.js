const responseHandler = require("../handlers/response.handler.js");
const tmdbApi = require("../tmdb/tmdb.api.js");

const personDetail = async(req, res) =>{
    try{
        const {personId} = req.params;

        const person = await tmdbApi.personDetail({personId})

        responseHandler.ok(res, person)
    }catch{
        responseHandler.error(res)
    }
};

const personMedias = async( req, res) =>{
    try{
        const {personId} = req.params;

        const medias = await tmdbApi.personMedias({personId});

        responseHandler.ok(res, medias);
    }catch{
        responseHandler.error(res)
    }
};

module.exports = {
    personDetail,
    personMedias
};