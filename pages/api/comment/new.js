import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export default async function Handler(request, response) {
    const db = (await connectDB).db('forum');
    const comment = db.collection('comment');
    let session = await getServerSession(request, response, authOptions);

    if(request.method == 'POST') {
        
        if(!session) {
            return response.status(400).json('로그인 필수!');
        }

        let commentData = JSON.parse(request.body);
        commentData.parent = new ObjectId(commentData.parent);
        commentData.author = session.user.email;

        let result = await comment.insertOne(commentData);

        if(result) {
            let result = await comment.find({parent : commentData.parent}).toArray();

            return response.status(200).json(result);
        }
    }
}