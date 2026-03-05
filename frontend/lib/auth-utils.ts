import {headers} from "next/headers";
import {auth} from "./auth";
import { redirect } from "next/navigation";

const authSession = async()=>{
    const session = await auth.api.getSession({headers:await headers()})

    return session;
}

export const requireAuth = async()=>{
    const session = await authSession();

    if (!session) {
        redirect("/sign-in");
    }

    return session;
}

export const requireNoAuth = async()=>{
    const session = await authSession();

    if (session) {
        redirect("/");
    }
};