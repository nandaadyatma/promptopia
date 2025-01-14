import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const userId = (await params).id

        const prompts = await Prompt.find({
            creator: userId
        }).populate("creator");

        return new Response( JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        return new Response( "Failed to fetch data", {
            status: 500
        })
    }
}