
export default async function getFortyTwoUser(code : string)  {
    const {hostname, port} = document.location;

    const request = await fetch(`http://${hostname}:4000/auth/token/${code}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json','cors': 'true'},
        body: JSON.stringify({redirect_uri: `http://${hostname}:${port}`})
    })
	return request;
}