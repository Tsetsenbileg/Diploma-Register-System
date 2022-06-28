import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie"
type UserProviderProps = { children: React.ReactNode };

type Action = {
    action: "login" | "logout";
    state: string, //token
    role: string
}

type User = {
    role: string,
    id: string
}
type UserContextType = {
    user: User | undefined;
    userAction: (action: Action) => void;
    getAccessToken: () => string | undefined;
    getRole: () => string | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {

    const router = useRouter();
    const cookie = new Cookies();
    const token = cookie.get("token_diploma");
    const role = cookie.get("role_diploma");
    const [user, setUser] = useState<User | undefined>(undefined);
    const userAction = (action: Action) => {
        switch (action.action) {
            case "login": {
                setUser({ id: action.state, role: action.role }); router.push("/dashboard");
                cookie.set("role_diploma", action.role, { maxAge: 3600 });
                cookie.set("token_diploma", action.state, { maxAge: 3600 });
                break;
            }
            case "logout": {
                setUser(undefined);
                cookie.remove("token_diploma");
                cookie.remove('role_diploma');
                router.push("/");
                break;
            };
            default: "Unhandled error at user action."
        }
    }
    const getAccessToken = () => {
        // return user ? user.id : undefined;
        return token;
    }
    const getRole = () => {
        return role;
    }

    return (
        <UserContext.Provider value={{ user, userAction, getAccessToken, getRole }} >{children}</UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined)
        throw new Error("user error");
    return context;
}