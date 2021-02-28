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

  console.log('CrReq OPTIONS DATA', options.data); // ! не забыть убрать
  console.log(callback); // ! не забыть убрать

  if (options.data) {
    if (method === 'GET') {
      const urlAppendArray = Object.entries(data).map(
        ([key, value]) => key + '=' + value
      );
      const urlAppend = urlAppendArray.join('&');
      requestURL += '?' + urlAppend;
    } else {
      Object.entries(data).forEach(([key, value]) =>
        requestData.append(key, value)
      );
    }
  }

  try {
    let response = await fetch(requestURL, {
      method: method,
      body: method === 'GET' ? null : requestData,
      credentials: 'same-origin', // 'withCredentials задано в true' == 'include' ?
    });
    if (response.ok) {
      let responseJSON = await response.json();

      console.log('response - JSON', responseJSON); // ! не забыть убрать

      callback(responseJSON);
      return responseJSON;
    } else {
      console.log('Ошибка HTTP: ' + response.status);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
