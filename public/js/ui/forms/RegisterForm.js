// done

/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    User.register(options, (response) => {
      if (!response.success) {
        alert(JSON.stringify(response.error));
        return;
      }

      App.setState('user-logged');
      User.setCurrent(response.user);
      this.element.reset();
      App.getModal('register').unregisterEvents();
      App.getModal('register').close();
    });
  }
}
