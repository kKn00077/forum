import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

// == 유저가 처음/갱신된 페이지 방문 시 캐싱 후 20초 동안은 캐싱하지 않는다.
export const revalidate = 20;

export const dynamic = 'forece-dynamic';

export default async function List(){

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection('post').find().toArray();
    result = result.map((a)=>{
      a._id = a._id.toString()
      return a
    });

    // GET요청 결과를 캐싱하는 구문. cache 옵션은 디폴트값이기 때문에 url만 적어도 캐싱이 됨.
    // 캐싱 없이 실시간을 원할 경우 cache 옵션을 no-store로 지정
    // {revalidate : 60} == 60초마다 url에 요청한 데이터를 캐싱하여 갱신하겠다.
    // 캐싱 장점: 서버 자원 절약
    // 캐싱 단점: 하드용량 차지함. 단 하드값이 저렴해서 커버 가능
    /* await fetch('/url', {cache : 'force-cache'}); */

    return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
    )
}