/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент должен быть передан!');
    }
    this.currentAccountId = null;
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      const createAccount = evt.target.closest('.create-account');

      if (createAccount) {
        const modal = App.getModal('createAccount');
        return modal.open();
      }

      const selectedAccount = evt.target.closest('.account');

      if (selectedAccount) {
        this.onSelectAccount(selectedAccount);
      }
    });
    // const newAccountButtonElement = this.element.querySelector('.create-account');
    // newAccountButtonElement.addEventListener('click', (evt) => {
    //   //        e.stopPropagation();
    //   evt.preventDefault();
    //   App.getModal('newAccount').open();
    // });
    // this.element.addEventListener('click', (evt) => {
    //   const currentElement = evt.target;
    //   const account = currentElement.closest('.account');
    //   if (account && account.classList.contains('account')) {
    //     this.onSelectAccount(currentElement);
    //   }
    // });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (!User.current()) {
      return;
    }
    Account.list(User.current(), (err, response) => {
      if (err) {
        return;
      }
      if (!response.data) {
        return;
      }
      this.clear();
      this.renderItem(response.data);
    });
    // const isCurrentUser = User.current();
    // if (!isCurrentUser) {
    //   return;
    // }
    //  Account.list(isCurrentUser, this.renderItem.bind(this));
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountElements = [...this.element.querySelectorAll('.account')];
    accountElements.forEach((element) => element.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    if (!element) {
      return;
    }
    if (this.currentAccountId) {
      const account = this.element.querySelector(`.account[data-id="${this.currentAccountId}"]`);
      if (account) {
        account.classList.remove('active');
      } else {
        this.currentAccountId = null;
      }
    }

    element.classList.add('active');

    const { id } = element.dataset;

    this.currentAccountId = id;

    App.showPage('transactions', {
      account_id: id,
    });
    // const currentAccount = element.closest('.account');
    // const accounts = [...element.closest('.accounts-panel').querySelectorAll('.account')];
    // accounts.forEach((account) => account.classList.remove('active'));
    // const parent = element.closest('.account');
    // parent.classList.add('active');
    // App.showPage('transactions', { account_id: currentAccount.dataset.accountId });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    return `
    <li class="account" data-account-Id="${item.id}">
      <a href="#">
        ${item.name} / ${item.sum} ₽
      </a>
    </li>`;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    data.forEach((item) => {
      const { name, id } = item,
        sum = item.sum.toLocaleString('en'),
        html = this.getAccountHTML({
          name,
          id,
          sum,
        });
      this.element.insertAdjacentHTML('beforeend', html);
    });
  }
  //   if (item.success) {
  //     this.clear();
  //   }
  //   const accounts = item.data;
  //   const ulContainer = this.element.querySelector('li');
  //   let template = accounts.map((account) => this.getAccountHTML(account)).join(' ');
  //   ulContainer.insertAdjacentHTML('afterend', template);
  // }
}
