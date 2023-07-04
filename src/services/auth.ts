import { authApi } from "../api/auth-api";

class Auth {

    async login(dispatch,state,payload) {

        dispatch({isLoading : true});

        const response = await authApi.login(payload)

        console.log(response);
    }

}

export const authService =  new Auth();