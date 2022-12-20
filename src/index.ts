import axios from 'axios';
import { domain, Result, parseUrl } from './utils.js';

const BASE_URL = 'https://apk.nijisan.my.id';
const API_LATEST = `${BASE_URL}/premium/home/latest/1/1`;
const API_SEARCH = (query: string) => `${BASE_URL}/komik/search/${query}/1/1`;

/**
 * Get latest comics update
 * @returns {Promise<Object>}
 */
export const Latest = async (): Promise<object> => {
	let result: Result;
	const data = await axios
		.request({
			url: API_LATEST,
			method: 'GET',
			headers: {
				'User-Agent': 'okhttp/4.9.3',
			},
		})
		.catch((e: any) => {
			return e.response;
		});
	if (data.data && data.data.data.length) {
		result = {
			success: true,
			...data.data,
		};
	} else {
		result = {
			success: false,
			message: 'Failed to fetch data from {API_LATEST}',
		};
	}
	return result;
};

/**
 * Get comics data by query
 * @param {String} query
 * @returns {Promise<object>}
 */
export const Search = async (query: string): Promise<object> => {
	let result: Result;
	const data = await axios
		.request({
			url: API_SEARCH(query),
			method: 'GET',
			headers: {
				'User-Agent': 'okhttp/4.9.3',
			},
		})
		.catch((e: any) => {
			return e.response;
		});
	if (data.data && data.data.page) {
		const _tmp: Result['data'] = [];
		for (const i of data.data.page) {
			_tmp.push({
				...i,
				link: `https://komikcast.${domain}/komik/${i.linkId}/`,
			});
		}
		result = {
			success: true,
			data: _tmp,
		};
	} else {
		result = {
			success: false,
			message: `Error, Query "${query}" Not Found or idk`,
		};
	}
	return result;
};

/**
 * get comic details
 * @param {String} url
 * @returns {Promise<Object>}
 */
export const Info = async (url: string): Promise<object> => {
	let result: Result;
	const uri = parseUrl(url);
	if (!uri) {
		return {
			success: false,
			message: "Error, url didn't match {parseUrl}",
		};
	}
	const data = await axios
		.request({
			url: String(uri),
			method: 'GET',
			headers: {
				'User-Agent': 'okhttp/4.9.3',
			},
		})
		.catch((e: any) => {
			return e.response;
		});
	if (data.data) {
		if (data.data && data.data.images) {
			result = {
				success: true,
				...data.data,
			};
		} else if (data.data && data.data.list_chapter) {
			let _tmp: Result['list_chapter'] = [];
			for (const i of data.data.list_chapter) {
				_tmp.push({
					...i,
					link: `https://komikcast.${domain}/komik/${i.linkId}/`,
				});
			}
			data.data['type'] = data.data['type'].replace(/Type: /g, '');
			data.data['released'] = data.data['released'].replace(/\D/g, '');
			delete data.data['list_chapter'];
			result = {
				success: true,
				...data.data,
				list_chapter: _tmp,
			};
		} else {
			result = {
				success: false,
				message: 'Error, something wrong with {parseUrl} maybe',
			};
		}
	} else {
		result = {
			success: false,
			message: 'Axios failed sending GET request to {parseUrl}',
		};
	}
	return result;
};
const komikcast = {
	Search,
	Latest,
	Info,
	search: Search,
	latest: Latest,
	detail: Info,
};
export default komikcast;
