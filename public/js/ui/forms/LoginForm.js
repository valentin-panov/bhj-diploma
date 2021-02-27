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
    User.login(options.data, (err, response) => {
      // if (!response.success) {
      //   return;
      // }
      App.setState('user-logged');
      this.element.reset();
      App.getModal('login').close();
    });
    // User.login(options, () => App.setState('user-logged'));
    // this.element.reset();
    // App.modals.login.close();
  }
}
