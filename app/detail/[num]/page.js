import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import { notFound } from "next/navigation";

// props == 부모컴포넌트에서 전달해준 데이터+url 파라미터
export default async function Detail(props){
    
    const db = (await connectDB).db("forum");
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.num) });

    if(result == null) {
        // return <div>404 없는 페이지</div>
        // not-found.js 보여줌
        return notFound();
    }
    
    return (
        <div>
            <h4>상세페이지</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            <Comment num={props.params.num}/>
        </div>
    )
}