'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function DetailLink() {
    
    // 뒤로가기 router.back()
    // 앞으로 가기 router.forward()
    // soft refresh 바뀐내용만 새로고침(사이트 전체 새로고침 x) router.refresh()
    // 해당페이지에 필요한 모든 파일 미리 로드 router.prefetch(로드할 페이지) => 다만 Link 태그에도 기본적으로 내장되어있는 기능
    let router = useRouter() // client component에서만 사용가능, server component에서는 직접적으로 못쓰고 태그 import 방식으로 사용

    let a = usePathname() // 현재 url 확인
    let b = useSearchParams() // 현재 queryString 확인가능


    return (
        <button onClick={()=>{ router.back() }}>button</button>
    )
}