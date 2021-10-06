import axios from 'axios';


export const ApiRequestHandler =  {

    assembleHeader : () => {
        return {
          headers: {
            Authorization: localStorage.getItem("token") == null ? null : 'Bearer '.concat(localStorage.getItem("token")),
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        };
      },

    get: (url, callback, errorCallback) => {
      axios
        .get(url, ApiRequestHandler.assembleHeader())
        .then((res) => {
          callback(res.data);
      })
        .catch((err) => {
            errorCallback(err.message);
        });
    },

    delete: (url, errorCallback) => {
      axios
        .delete(url, ApiRequestHandler.assembleHeader())
        .catch((err) => {
            errorCallback(err.message);
        });
    },

    put: (url, updatedObject, errorCallback) => {
      axios
        .put(url, updatedObject, ApiRequestHandler.assembleHeader())
        .catch((err) => {
            errorCallback(err.message);
        });
    },

    post: (url, payload, errorCallback) => {
      axios
        .post(url, payload, ApiRequestHandler.assembleHeader())
        .catch((err) => {
            errorCallback(err.message);
        });
    },

    postLogin: (url, loginCredentials, setUserLogin) => {
      axios.post(url, loginCredentials).then((res) => {
        if (
          res.status === 200 &&
          res.data.hasOwnProperty("username") &&
          res.data.hasOwnProperty("roles") &&
          res.data.hasOwnProperty("token")
        ) {
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("roles", res.data.roles);
          localStorage.setItem("token", res.data.token);
          setUserLogin(res.data);
        }
      });
  }

    
       
    
}
