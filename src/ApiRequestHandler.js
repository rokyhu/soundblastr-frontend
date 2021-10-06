
import axios from 'axios';

const backendRoutes = {
  event: {
    all: "http://localhost:8080/event/all",
  },
  band: {
    all: "http://localhost:8080/band/all",
  },
  venue: {
    all: "http://localhost:8080/venue/all",
  },
  auth: {
    loginUrl: "http://localhost:8080/auth/login",
  }
}


export const ApiRequestHandler =  {

    assembleHeader : () => {
        return {
          headers: {
            Authorization: localStorage.getItem("token") == null ? null : 'Bearer '.concat(localStorage.getItem("token")),
          }
        };
      },

    getAllEvents: (callback, errorCallback) => {
      axios
        .get(backendRoutes.event.all, ApiRequestHandler.assembleHeader())
        .then((res) => {
          callback(res.data);
      })
        .catch((err) => {
            errorCallback(err.message);
        });
    },

    getAllBands: (callback, errorCallback) => {
      axios
        .get(backendRoutes.band.all, ApiRequestHandler.assembleHeader())
        .then((res) => {
          callback(res.data);
      })
        .catch((err) => {
            errorCallback(err.message);
        });
    },

    getAllVenues: (callback, errorCallback) => {
      axios
        .get(backendRoutes.venue.all, ApiRequestHandler.assembleHeader())
        .then((res) => {
          callback(res.data);
      })
        .catch((err) => {
            errorCallback(err.message);
        });
    },
    attemptLogin: (loginCredentials, setUserLogin) => {
      axios.post(backendRoutes.auth.loginUrl, loginCredentials).then((res) => {
        if (
          res.status === 200 &&
          res.data.hasOwnProperty("username") &&
          res.data.hasOwnProperty("roles") &&
          res.data.hasOwnProperty("token")
        ) {
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("roles", res.data.roles);
          localStorage.setItem("token", res.data.token);
          setUserLogin(res.data)
        }
      });
  }

    
       
    
}
