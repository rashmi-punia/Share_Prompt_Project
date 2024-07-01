import { connectdb } from "@utils/database";
import Prompt from "@models/promptModel";

export const GET = async(req) => {
   try {
    connectdb();
    
    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), {
        status : 200
    })
   } catch (error) {
    return new Response("Failed to fetch all prompts ", {
        status : 500
    })
   }
}