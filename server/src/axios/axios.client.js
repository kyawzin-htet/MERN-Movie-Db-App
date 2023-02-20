const axios = require("axios");

const get = async(url) =>{
    const response = await axios.get(url,{
        headers: {
            Accept: "application/json",
            "Accept-Encoding": "identity"
        }
    });
    return response.data
}

module.exports = {get};