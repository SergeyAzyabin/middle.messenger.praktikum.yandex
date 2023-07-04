enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}


type Options = {
  method?: METHODS;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
};

function queryStringify(data: object) {
	return Object.entries(data).map(([key, value]) => key + '=' + value).join('&');
}

export class HTTPTransport {

	get = (url: string, options: Options = {}) : Promise<XMLHttpRequest> => {
		return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
	};


	put = (url: string, options: Options = {}) : Promise<XMLHttpRequest> => {
		return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
	};

	post = (url: string, options: Options = {}) : Promise<XMLHttpRequest> => {
		return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
	};

	delete = (url: string, options: Options = {}) : Promise<XMLHttpRequest> => {
		return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
	};

	request = (url: string, options: Options, timeout = 5000) : Promise<XMLHttpRequest> => {

		const { headers = {}, method, data } = options;

		return new Promise(function (resolve, reject) {
			if (!method) {
				reject('Укажите метод');
				return;
			}

			const xhr = new XMLHttpRequest();

			xhr.open(method, method === METHODS.GET && data ? `${url}${queryStringify(data)}` : url);

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}

		});
	};
}