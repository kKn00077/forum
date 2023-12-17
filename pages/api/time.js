export default function handler(request, response) {
    
    let today = new Date();
    
    if(request.method == 'GET') {
        const datetime = today.toLocaleString();
        return response.status(200).json(datetime);
    }
}