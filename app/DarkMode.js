'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function DarkMode() {

    let router = useRouter()
    let [button, setButton] = useState('');

    useEffect(() => {
        let mode = ('; '+document.cookie).split('; mode=').pop().split(';')[0];
        if (mode == '') {
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
            setButton('🌙');
        }
    }, []);

    return (
        <span onClick={() => {
            let mode = ('; '+document.cookie).split('; mode=').pop().split(';')[0];

            if(mode == 'light') {
                document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400);
                setButton('☀️');
            } else if (mode == 'dark') {
                document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
                setButton('🌙');
            }
            router.refresh(); // 바뀐 부분만 새로고침
        }}>{ button }</span>
    )
}