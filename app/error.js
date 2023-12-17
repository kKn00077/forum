'use client'

// 무적권 client 컴포넌트로만 생성해야함
// reset parameter는 함수임. reset 함수 호출시 페이지 재로드함
// 에러났을 경우 페이지 전체(레이아웃 포함)가 아니라 page.js부분만 error.js로 변경
// error.js가 없을 경우에는 상위 폴더에 있는 error.js를 체크해서 불러옴
// 옆에 있는 layout.js 내에서 발생하는 에러는 체크 못하므로 layout.js 상위 폴더에 넣거나 상위폴더가 더 없을 경우 global-error.js로 생성하면 최상위 layout.js에러가 체크가능하다
export default function Error({error, reset}) {
    return (
        <div>
            <h4>에러났는디유</h4>
            <button onClick={()=>{ reset() }}>페이지 다시 불러오기</button>
        </div>
    )
}