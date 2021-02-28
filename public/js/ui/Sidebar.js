// DONE

/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const btnSidebarToggle = document.querySelector('a.sidebar-toggle'),
      sidebar = document.querySelector('.sidebar-mini');
    btnSidebarToggle.addEventListener(
      'click',
      (evt) => {
        evt.preventDefault();
        sidebar.classList.toggle('sidebar-open');
        sidebar.classList.toggle('sidebar-collapse');
      },
      false
    );
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const btnLogin = document
      .querySelector('li.menu-item_login')
      .querySelector('a');
    btnLogin.addEventListener(
      'click',
      (evt) => {
        evt.preventDefault();
        App.getModal('login').open();
      },
      false
    );

    const btnRegister = document
      .querySelector('li.menu-item_register')
      .querySelector('a');
    btnRegister.addEventListener(
      'click',
      (evt) => {
        evt.preventDefault();
        App.getModal('register').open();
      },
      false
    );

    const btnLogout = document
      .querySelector('li.menu-item_logout')
      .querySelector('a');
    btnLogout.addEventListener(
      'click',
      (evt) => {
        evt.preventDefault();
        User.logout(User.current());
      },
      false
    );
  }
}
