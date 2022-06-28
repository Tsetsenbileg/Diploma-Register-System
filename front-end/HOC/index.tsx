import { NextPage } from "next";
import { useUser } from "../Context/user";
import Home from "../pages";
const WithAuth = (Component: NextPage) => {

    const Auth = (props: any) => {

        const { getAccessToken } = useUser();
        // console.log(getAccessToken(), "token");

        // console.log(getAccessToken(), "ACCESS TOKEN");
        if (getAccessToken()) {
            return <Component {...props} />
        }
        // return {
        //     redirect: {
        //         destination: '/',
        //         statusCode: 302
        //     }
        // }
        return <Home />
    }
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps
    }
    return Auth;
}

export default WithAuth;