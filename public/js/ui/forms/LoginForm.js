//done

/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    User.login(options, (response) => {
      if (!response.success) {
        alert(response.error);
        return;
      }
      App.setState('user-logged');
      User.setCurrent(response.user);
      this.element.reset();
      App.getModal('login').unregisterEvents();
      App.getModal('login').close();
    });
  }
}
