// jasmine red (entity delete)

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest(),
    f = function () {},
    {
      method = 'GET',
      responseType,
      async = true,
      data = {},
      success = f,
      error = f,
      callback = f,
    } = options;

  xhr.responseType = responseType ? responseType : 'text';
  xhr.withCredentials = true;
  let requestURL = options.url;
  let requestData;

  if (method === 'GET') {
    const urlAppend = Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    if (urlAppend) {
      requestURL += '?' + urlAppend;
    }
  } else {
    requestData = Object.entries(data).reduce((target, [key, value]) => {
      target.append(key, value);
      return target;
    }, new FormData());
  }

  // ! всю голову сломал, почему не работает закомментированный код ниже
  // method === 'GET'
  //   ? (requestURL +=
  //       '?' +
  //       Object.entries(data)
  //         .map(([key, value]) => `${key}=${value}`)
  //         .join('&'))
  //   : (requestData = Object.entries(data).reduce((target, [key, value]) => {
  //       target.append(key, value);
  //       return target;
  //     }, new FormData()));

  xhr.onload = function () {
    success.call(this, xhr.response);
    callback.call(this, null, xhr.response);
  };

  xhr.onerror = function () {
    const err = new Error('Request Error');
    error.call(this, err);
    callback.call(this, err);
  };

  try {
    xhr.open(method, requestURL, async);
    xhr.send(requestData);
  } catch (err) {
    error.call(this, err);
    callback.call(this, err);
  }

  return xhr;
};
