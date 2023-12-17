'use client'

import {signIn, signOut} from 'next-auth/react' // signIn => 자동으로 로그인 페이지로 이동, signOut => 자동으로 로그아웃

export default function AuthInfo({session}) {


    return !session
            ? <button onClick={() => { signIn() }}>로그인</button> 
            : <span>{session.user.name} <button onClick={() => { signOut() }}>로그아웃</button></span>
}