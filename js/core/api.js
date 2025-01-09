import { config } from './config.js';

const baseURL = config.api.baseURL;

async function request(endpoint, method = 'GET', body = null, headers = {}) {
  const options = {
    method,
    headers: {
      ...headers
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseURL}${endpoint}`, options);

  if (!response.ok) {
    const message = `Error ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  return response.json();
}

export { request };
