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
    User.login(options, (err, response) => {
      console.log(response);
      // if (!response.success) {
      //   return;
      // }
      App.setState('user-logged');
      this.element.reset();
      App.getModal('login').close();
    });

    // const p = new Promise(function (resolve, reject) {
    //   User.logout(User.current());
    // });
    // p.then(
    //   (result) => App.setState('init'),
    //   (error) => console.log(error)
    // );

    // User.login(options, () => App.setState('user-logged'));
    // this.element.reset();
    // App.modals.login.close();
  }
}
