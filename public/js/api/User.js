// done?

/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage['user'] = JSON.stringify(user);
    App.update(); // ! найти лучшее место для этого
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static async fetch(data, callback = (f) => f) {
    // User.unsetCurrent(); // ! если данных об авторизации нет, то нужно ансетить ?
    return await createRequest({
      data,
      url: this.URL + '/current',
      method: 'GET',
      responseType: 'json',
      callback,
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static async login(data, callback = (f) => f) {
    return await createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data,
      callback,
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static async register(data, callback = (f) => f) {
    return await createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback,
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static async logout(data, callback = (f) => f) {
    return await createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      data,
      callback: (response) => {
        if (response.success) {
          User.unsetCurrent();
          App.setState('init');
        }
      },
    });
  }
}
User.URL = '/user';
