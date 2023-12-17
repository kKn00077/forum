'use client'

import Link from "next/link"

export default function ListItem({result}) { // == props.result

    //useEffect 실행시점 => HTML 랜더링 후에 실행됨 (텅 빈 HTML 먼저 랜더링 후에 내용 채워줌)

    return (
        <div>
            {
                result.map((ele, i) => 
                    <div className="list-item" key={i}>
                      {/* 사용자가 모든 페이지를 접속할 것이 아니기에 prefetch 사용하면 오히려 부담 */}
                      <Link prefetch={false} href={"/detail/"+ele._id}> 
                        <h4>{ ele.title }</h4>
                      </Link>
                      <Link href={'/edit/'+ele._id}>✏️</Link>
                      <span onClick={(e) => {
                        
                        fetch('/api/post', {
                            method : 'DELETE',
                            body : ele._id // fetch 요청으로 데이터 전달 시 obj, arr 데이터는 stringify 이용
                        }).then((r)=> { // then == 요청 완료 후 특정 동작 지정
                            const data = r.json();
                            
                            if(r.status == 200) {
                                return data; // 성공 시 다음 실행할 코드를 실행하기 위한 기본 세팅 코드 (json 본문 컨텐츠 추출을 위해 실행하는 코드)
                            } else {
                                // 서버가 에러코드 전송 시에 실행할 코드
                                // const getData = () => {
                                //     data.then((text) => {
                                //         alert(text);
                                //     });
                                // };

                                // getData();

                                return data.then((error) => {
                                    throw new Error(error); // Throw the error to be caught by the catch block
                                });
                            }
                        }).then((result) => {
                            // 성공 시 실행할 코드
                            
                            //alert(result);
                            let parent = e.target.parentElement;
                            parent.style.opacity = 0; // span의 부모태그인 div.list-item의 opacity:0 애니메이션 추가
                            setTimeout(() => { // 1초 후 display를 none으로 설정하는 코드 실행
                                parent.style.display = 'none';
                            }, 1000);

                        }).catch((error) => {
                            // 인터넷  문제로 실패 시 실행할 코드
                            alert(error.message);
                        })

                        // fetch('/api/test?name=kim&age=20'); // queryString 방식, GET 요청 시 사용 가능
                        // fetch('/api/abc/kim') // URL 파라미터 문법. kim이 api에 query 데이터로 전송됨
                      }}>🗑️</span>
                      <p>{ ele.content }</p>
                    </div>
                )
            }
        </div>
    )
}