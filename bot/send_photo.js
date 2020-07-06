const message = msg.caption.match(telegramRegex)[1];
const fileId = msg.photo[msg.photo.length - 1].file_id;
request(`https://api.telegram.org/bot${settings.telegram.token}/getFile?file_id=${fileId}`, (error, response, body) => {
	const filePath = JSON.parse(body).result.file_path;
	console.log(`https://api.telegram.org/file/bot${settings.telegram.token}/${filePath}`);
	request({
		url: `https://api.telegram.org/file/bot${settings.telegram.token}/${filePath}`,
		encoding: 'binary',
		headers: {
			"Connection": "keep-alive"
		}
	}, (error, response, body) => {
		const base64 = Buffer.from(body, 'binary').toString('base64');
		twitterBot.post('media/upload', { media: base64 }, (error, data, response) => {
			const mediaId = data.media_id_string;
			twitterBot.post('media/metadata/create', { media_id: mediaId }, (error, data, response) => {
				const params = { status: message, media_ids: [mediaId] };
				twitterBot.post('statuses/update', params, (error, data, response) => {
				})
			});
		});	
	});
});