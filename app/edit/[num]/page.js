import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
    
    const db = (await connectDB).db("forum");
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.num) });

    return (
        <div className="p-20 ">
            <h4>글수정</h4>
            <form action="/api/post" method="POST">
                <input type="hidden" name="_method" defaultValue="PUT"/>
                <input type="hidden" name="_id" defaultValue={result._id.toString()}/>
                <input type="text" name="title" defaultValue={result.title}/>
                <input type="text" name="content" defaultValue={result.content}/>
                <button type="submit">버튼</button>
            </form>
        </div>
    )
}