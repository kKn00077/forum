'use client'

import { useEffect, useState } from "react"

export default function Comment(props) {
    let [comment, setComment] = useState('')
    let [data, setData] = useState([]);
    const num = props.num;

     // == html 로드/재랜더링 될 때 마다 실행됨. 1번만 실행하고 싶을 경우 array param 주가
     // 랜더링이 다 돼서 html을 보여준 후에 늦게 실행됨
    useEffect(() => {
        fetch('/api/comment/list?parent='+num, {method : 'GET'})
        .then((r) => {
            const data = r.json();
                    
            if(r.status == 200) {
                return data;
            } else {
                // 서버가 에러코드 전송 시에 실행할 코드
                return data.then((error) => {
                    throw new Error(error);
                });
            }
        }).then((result) => {
            // 성공 시 실행할 코드
            setData(result);
        }).catch((error) => {
            alert(error.message);
        })
    },[])
    
    return (
        <div>
            <div>
                <hr></hr>
                {
                    data.length > 0 ?
                    data.map((a, i)=> {
                        return (
                            <p key={i}>{a.content}</p>
                        )
                    })
                    : '로딩중'
                }
            </div>
            <input onChange={(e) => { setComment(e.target.value) }}/>
            <button onClick={() => {
                fetch('/api/comment/new', {method : 'POST', body : JSON.stringify({ content : comment, parent : num })})
                .then((r)=> { // then == 요청 완료 후 특정 동작 지정
                    const data = r.json();
                    
                    if(r.status == 200) {
                        return data;
                    } else {
                        // 서버가 에러코드 전송 시에 실행할 코드
                        return data.then((error) => {
                            throw new Error(error);
                        });
                    }
                }).then((result) => {
                    // 성공 시 실행할 코드
                    setData(result);
                }).catch((error) => {
                    alert(error.message);
                })
            }}>댓글전송</button>
        </div>
    )
}