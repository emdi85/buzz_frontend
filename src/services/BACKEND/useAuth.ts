'use server'
import axios from 'axios'
import { cookies } from 'next/headers';


export const login = async ({ username, password }: { username: string, password: string }): Promise<{ success: boolean }> => {

    let response;
    try {
        response = await axios.post("http://buzz-back-2:8080" + "/login", { username, password })


        if (response.status === 200) {
            cookies().set("access", response.data.access_token, { maxAge: 3600 * 24 * 2 })
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (e: any) {
        console.log("Error on /login >>>>>>")
        console.log(e.response ?? e)
        console.log(">>>>>>>>>>>>>>>>>>>>>>")
        return {
            success: false,
        }
    }



}
export const register = async ({ username, password }: { username: string, password: string }) => {
    let response;
    try {
        response = await axios.post("http://buzz-back-2:8080" + "/register", { username, password })



        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (e: any) {
        console.log("Error on /register >>>>>>")
        console.log(e.response ?? e)
        console.log(">>>>>>>>>>>>>>>>>>>>>>")
        return {
            success: false,
        }
    }


}


export const logout = async () => {
    cookies().delete("access")
}