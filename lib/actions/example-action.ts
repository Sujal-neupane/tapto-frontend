"use server";


export async function exampleAction() {
    // simulating api
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return{
        success: true,
        message: "Example action executed successfully"
        data:null
    }
}   

