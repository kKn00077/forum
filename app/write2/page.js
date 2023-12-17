// server actions 기능

import { connectDB } from "@/util/database";
import { revalidatePath } from "next/cache";

// page.js 안에서 form부터 서버 기능까지 다 해결하는 기능
export default async function Write2() {
    
    //DB에서 데이터 뽑아서 보여주기 
    const db = (await connectDB).db('forum')
    let result = await db.collection('post_test').find().toArray()
    
   async function handleSubmit(formData){
        // server api로 변함
        // 단점: 새로고침이 자동으로 안돼서 손수 해줘야함.
        // 클라이언트 컴포넌트에서도 사용이 가능하지만 같은 폴더에서 파일을 따로 뺀 후 import해서 사용해야함.
        'use server' 

        const db = (await connectDB).db('forum')
        await db.collection('post_test').insertOne({title : formData.get('title')})

        // 캐시된 페이지를 삭제하고 새로 다시 생성 => 새로고침과 거의 동일
        revalidatePath('/write2');
    }

    return (
        <div>
            <form action={handleSubmit}>
                <input name="title"></input>
                <button type="submit">버튼</button>
            </form>
            {
        result ? result.map((a)=>
          <p>글제목 : {a.title}</p>
        )
        : null
      }
        </div>
    )
}