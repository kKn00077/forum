import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// 미들웨어는 export default function이 아니라 export function임 
export async function middleware(request) {
    // console.log(request.nextUrl);
    // console.log(request.cookies);
    // console.log(request.headers);

    // NextResponse.next(); // 페이지 무사 통과
    // NextResponse.redirect(); // 다른 페이지로 이동 (주소창 URL 변경)
    // NextResponse.rewrite(); // 다른 페이지로 이동 (주소창 URL 유지)
    
    const response = NextResponse.next()

    // nextAuth를 활용한 현재 유저 정보 확인 (JWT 사용 한정)
    // 미로그인일 경우 null
    const session = await getToken({req : request});

    if(request.nextUrl.pathname.startsWith('/write')) {
        if(session == null) {
            // return NextResponse.redirect(new URL('/api/auth/signin'), request.url); -- 간혹 오류나는 경우가 있음. 그럴 경우 아래처럼 작성
            return NextResponse.redirect(new URL('http://localhost:3000/api/auth/signin'), request.url);
        }
    }

    request.cookies.get('쿠키이름')  //출력
    request.cookies.has('쿠키이름')  //존재확인
    request.cookies.delete('쿠키이름')  //삭제
    
    response.cookies.set({
        name: 'mode',
        value: 'dark',
        maxAge: 3600,
        httpOnly : true
    })  

    // request.nextUrl.pathname - 현재 요청한 url 반환
    if(request.nextUrl.pathname.startsWith('/list')) {
        console.log(new Date());
        console.log(request.headers.get('sec-ch-ua-platform'));
    }

    if(request.nextUrl.pathname.startsWith('/register')) {
        if(!request.cookies.get('visited')) {
            response.cookies.set({
                name: 'visited',
                value: true,
                maxAge: 3600,
                httpOnly : true
            })
        }
    }
    
    return response;
}