const responseHandler = require("../handlers/response.handler.js");
const favouriteModel = require("../models/favourite.model.js")

const addFavourite = async(req, res) =>{

    try{
        const isFavourite = await favouriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        })


        if(isFavourite) return responseHandler.ok(res, isFavourite)

        const favourite = new favouriteModel({
            ...req.body,
            user: req.user.id
        });

        await favourite.save()

        responseHandler.created(res, favourite);
    }catch(error){
        responseHandler.error(res)
    }
};

const removeFavourite = async(req, res) =>{
    try{
        const {favouriteId} = req.params;
        const favourite = await favouriteModel.findOne({
            user: req.user.id,
            _id: favouriteId
        });

        if(!favourite) return responseHandler.notfound(res);

        await favourite.remove();
         
        responseHandler.ok(res)
    }catch(error){
        console.log(error)
        responseHandler.error(res)
    }
}

const getFavouriteOfUser = async(req, res) =>{
    try{
        const favourite = await favouriteModel.find({user: req.user.id}).sort("-createdAt");

        responseHandler.ok(res, favourite);
    }catch{
        responseHandler.error(res)
    }
}

module.exports = {
    addFavourite,
    removeFavourite,
    getFavouriteOfUser
}