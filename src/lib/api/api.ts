/**
 * Dependence
 */
import axios from 'axios';

/**
 * Dependence Types
 */
import type { AxiosInstance } from 'axios';

/**
 * API
 * @type {axios.AxiosInstance}
 */


export const api: AxiosInstance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/posts',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	}
});
