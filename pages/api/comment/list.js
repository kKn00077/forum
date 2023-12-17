import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Handler(request, response) {
    const db = (await connectDB).db('forum');
    let result = await db.collection('comment').find({parent : new ObjectId(request.query.parent)}).toArray();

    return response.status(200).json(result);
}