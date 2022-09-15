import fetch from 'node-fetch';
//import * as sharp from 'sharp'

const getUserAccessToken = async (uid: string, secret: string, code: string, redirect_uri: string): Promise<any> => {
	let request = await fetch("https://api.intra.42.fr/oauth/token", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			grant_type: "authorization_code",
			client_id: uid,
			client_secret: secret,
			code: code,
			redirect_uri
		})
	})
	return await request.json();
}

const getUserInformations = async (access_token: string): Promise<any> => {
	let request = await fetch("https://api.intra.42.fr/v2/me", {
		method: "GET",
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json'
		}
	})
	return await request.json();
}

//const getBase64FromBuffer = async (buffer: Buffer): Promise<string> => {
//	console.log(`=> Resizing to 256x256 pixels...`);
	//const resizedBuffer = await sharp(buffer).resize(
	//	128, 128,
	//	{fit: 'cover', withoutEnlargement: true}
	//).jpeg({ quality: 50 }).toBuffer();
	//console.log(`=> Converting to base64...`);
	//return resizedBuffer.toString('base64');
//}

//const getBase64FromURI = async (uri: string): Promise<string> => {
//	console.log(`Fetching avatar from ${uri}...`);
//	const data = await fetch(uri);
//	const buffer = await data.buffer();
//	return getBase64FromBuffer(buffer);
//}

export {
	getUserAccessToken,
	getUserInformations,
//	getBase64FromBuffer,
//	getBase64FromURI,
};