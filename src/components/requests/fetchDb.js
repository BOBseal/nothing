import { DBTestUrl } from "../constants/constants"
//user endpoint helpers -- add and update user not included


export const getAllUsers=async()=>{
    try {
        const x =await fetch(`${DBTestUrl}user/all-users`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("All User Fetch Failed");
    }
} // working

export const getSingleUser=async({id})=>{
    try {
        const x =await fetch(`${DBTestUrl}user/id=${id}`);
        const y = await x.json();
        return y;
    } catch (error) {
        console.log(error);
        return("Get User Failed");
    }
} // working

export const deleteUser=async({id})=>{
    try {
        await fetch(`${DBTestUrl}user?delete-user=${id}`);
    } catch (error) {
        console.log(error);
        return("Profile Deletion Failed");
    }
}

// tier endpoints // YOU SAID THIS ONE WRONG URL RIGHT ??? WELL LET's SEE

export const getTierInfoSingle = async({wallet})=>{
    try {
        const c = await fetch(`${DBTestUrl}tier?userWallet=${wallet}`);
        const d = await c.json();
        return d;
    } catch (error) {
        console.log(error);
        return("Tier Info Fetch Failed");
    }
}