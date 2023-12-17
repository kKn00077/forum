import { connectDB } from "@/util/database"

export default async function Home() {

  const client = await connectDB;
  
  // 사용한 database 조회
  // client component는 브라우저에서 코드 조회가 되므로 보안상 권장 x
  const db = client.db("forum");

  // post 콜렉선(==테이블) 내의
  // find() == 모든 데이터 조회
  // toArray() == 배열로 변환
  let result = await db.collection('post').find().toArray();

  return (
    <div>ㅎㅇㅎㅇ</div>
  )
}
