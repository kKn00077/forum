import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write() {
    
    let session = await getServerSession(authOptions);

    if(!session) {
        return <div>로그인 필수 페이지입니다.</div>
    }

    return (
        <div className="p-20 ">
            <h4>글작성</h4>
            <form action="/api/post" method="POST">
                <input type="text" name="title" placeholder="제목"/>
                <input placeholder="내용" name="content"/>
                <button type="submit">버튼</button>
            </form>
        </div>
    )
}