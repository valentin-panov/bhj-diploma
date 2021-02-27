// jasmine red (entity delete)

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = async (options = {}) => {
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
  let requestData = new FormData();

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
    xhr.open(method, requestURL, async);
    xhr.send(requestData);
  } catch (err) {
    //    error.call(this, err);
    callback.call(this, err);
  }

  xhr.onload = function () {
    //    success.call(this, xhr.response);
    callback.call(this, null, xhr.response);
  };

  xhr.onerror = function () {
    const err = new Error('Request Error');
    //    error.call(this, err);
    callback.call(this, err);
  };

  return xhr;
};
