import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

// 다이나믹 랜더링 -> 페이지 접속 할때마다 html을 새로 그려줌, 장점: 빠름
// 스태틱 랜더링 -> nextjs 자체에서 페이지에 큰 기능이 없다고 판단되면 build할때 만든 html페이지 그대로 보여줌, 단점: 서버/DB부담 상승 -> 캐싱으로 커버
// 간혹 nextjs의 판단 오류로 랜더링 방식이 안맞을 경우가 있는데 그럴 경우에는 아래처럼 설정이 필요함.
export const dynamic = 'forece-dynamic'; // 다이나믹 랜더링으로 설정, force-static => 스태틱 랜더링 설정 


export default async function List(){

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection('post').find().toArray();
    result = result.map((a)=>{
      a._id = a._id.toString()
      return a
    });

    return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
    )
}