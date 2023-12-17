// /api/test
export default function handler(request, response) {

    console.log(request.query);

    // if문 설정 안하면 모든 요청 받음
    if(request.method == 'POST') {
        return response.status(200).json('처리완료');
    }
}