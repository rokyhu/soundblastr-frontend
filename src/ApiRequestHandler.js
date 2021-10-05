
import axios from 'axios'

export const ApiRequestHandler =  {

    assembleHeader : () => {
        return {
          headers: {
            Authorization: 'Bearer '.concat(localStorage.getItem("token")),
            Username: localStorage.getItem("username"),
            Roles: localStorage.getItem("roles")
          }
        };
      },

    apiGet: (url, callback, errorCallback) => {
      axios
        .get(url, ApiRequestHandler.assembleHeader())
        .then((res) => {
        callback(res.data);
        console.log(ApiRequestHandler.requestHeader);
      })
        .catch((err) => {
            errorCallback(err.message);
        });
    },

    
        
    
}
