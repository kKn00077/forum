import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(request, response){

    const db = (await connectDB).db('forum');
    const post = db.collection('post');
    let session = await getServerSession(request, response, authOptions);
    
    if(request.body._method == 'PUT') { 
        
        let body = request.body;
        
        if(body.title == '') {
            return response.status(400).json('제목 필수');
        }
        
        try {

            const isMinePost =  await post.findOne({_id: new ObjectId(props.params.num), author : session.user.email});

            if(!isMinePost) {
                return response.status(400).json('권한 없음');
            }

            const result = await post.updateOne({_id: new ObjectId(body._id)}, { $set : { title : body.title, content : body.content }});
    
            if(result) {
                return response.status(200).redirect(302, '/detail/'+body._id);
            }
        } catch (error) {
            return response.status(500).json('DB 오류 발생');
        }
    } else if(request.method == 'POST'){

        if(request.body.title == '') {
            return response.status(400).json('제목 필수');
        }

        if (session) {
            request.body.author = session.user.email;
        }

        try {
            
            const result = await post.insertOne(request.body);
    
            if(result) {
                return response.status(200).redirect(302, '/list');
            }
        } catch (error) {
            return response.status(500).json('DB 오류 발생');
        }

    } else if(request.method == 'DELETE') {
        
        if(request.body == '') {
            return response.status(400).json('필수 데이터 누락');
        }

        try {

            if(!session) {
                return response.status(400).json('권한 없음');
            }

            if(session.user.role != 'admin') {
                const isMinePost =  await post.findOne({_id: new ObjectId(request.body), author : session.user.email});
    
                if(!isMinePost) {
                    return response.status(400).json('권한 없음');
                }
            }

            const result = await post.deleteOne({_id : new ObjectId(request.body)});
    
            if(result.deletedCount) {
                return response.status(200).json('삭제 성공');
            } else {
                return response.status(500).json('삭제 실패');
            }
        } catch (error) {
            console.log(error)
            return response.status(500).json( 'DB 오류 발생');
        }

    }
    
}