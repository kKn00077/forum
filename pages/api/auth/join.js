import { connectDB } from "@/util/database";
import Error from "next/error";
import bcrypt from "bcrypt"

export default async function handler(request, response) {

    const db = (await connectDB).db('forum');
    const users = db.collection('users');

    let newUser = request.body;
    newUser.role = 'normal';

    if(request.method == 'POST') {

        try{

            if(!newUser.name || !newUser.email || !newUser.password) { 
                return response.status(400).json('빈칸 존재합니다.');
            }

            let exist = await users.findOne({email : newUser.email});
    
            if(exist) {
                return response.status(400).json('이미 존재하는 아이디입니다.');
            }

            let hash = await bcrypt.hash(request.body.password,10);
            newUser.password = hash;

            let result = await users.insertOne(newUser);

            if(!result) throw Error;
            
            return response.status(201).json('가입성공!');
        
        } catch(error) {
            return response.status(500).json('오류 발생!');
        }
    }

    return response.status(400).redirect(302, '/join');
}