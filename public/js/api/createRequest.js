/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = async (options = {}) => {
  if (!options.data) {
    return;
  }
  const { method = 'GET', data = {}, callback = function () {} } = options;

  let requestURL = options.url;
  let requestData = new FormData();
  console.log(options.data);

  if (options.data) {
    if (method === 'GET') {
      const urlAppendArray = Object.entries(data.data).map(
        ([key, value]) => key + '=' + value
      );
      const urlAppend = urlAppendArray.join('&');
      requestURL += '?' + urlAppend;
    } else {
      Object.entries(data.data).forEach(([key, value]) =>
        requestData.append(key, value)
      );
    }
  }

  console.log(callback);

  try {
    let response = await fetch(requestURL, {
      method: method,
      body: method === 'GET' ? null : requestData,
    });
    if (response.ok) {
      response = await response.json();
      console.log('response - JSON', response);
      callback(response);
      return response;
    } else {
      console.log('Ошибка HTTP: ' + response.status);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
