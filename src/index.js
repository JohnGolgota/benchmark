import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

const TOKEN = process.env.API_TOKEN;
const BASE_ENDPOINT = process.env.BASE_ENDPOINT;
console.log({ TOKEN, BASE_ENDPOINT });

async function mekeRequests(requestsAmount, url) {
	const requests = [];
	const statuses = [];
	for (let i = 0; i < requestsAmount; i++) {
		requests.push(
			axios
				.request({
					method: "GET",
					url,
					headers: {
						Authorization: `Bearer ${TOKEN}`,
					},
				})
				.then((res) => {
					if (res.status !== 200) {
						statuses.push({ status: res.status, success: res.status === 200 });
					}
				})
				.catch((err) => {
					if (err.response) {
						statuses.push({ status: err.response.status, success: false });
					} else {
						statuses.push({ status: err.status, success: false });
					}
				}),
		);
	}
	await Promise.all(requests);
	console.log("All requests are done!");
	console.log({ results: statuses, amount: requestsAmount });
}

mekeRequests(5000, BASE_ENDPOINT).catch((err) =>
	console.log(err),
);
