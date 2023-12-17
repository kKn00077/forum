// 모든 page.js 옆에 생성 가능
//client 컴포넌트 가능
// nextjs에서 리액트 내장 Suspense 컴포넌트 내 fallback으로 loading.js를 실행시킴
// Suspense 컴포넌트는 page.js를 감싸고 있는 형태
export default function Loading() {
    return (
        <h4>로딩중...</h4>
    )
}