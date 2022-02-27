import React from 'react';
import GoogleLogin from 'react-google-login';
import {client_id} from "./password";
/**
 * 함수형 컴포넌트 스니펫입니다.
 */

const clientId = "";

const Login = () => {
    const onSuccess = async(response) => {
        console.log(response);
        const { googleId, profileObj : { email, name } } = response;
    }

    const onFailure = (error) => {
        console.log(error);
    }

    return(
        <div>
            <GoogleLogin
                clientId={client_id}
                responseType={"id_token"}
                onSuccess={onSuccess}
                onFailure={onFailure}/>
        </div>
    )
};

export default Login;


