/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент должен быть передан!');
    }
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const transactionButtonsContainer = document.querySelector('.transactions-panel');
    transactionButtonsContainer.addEventListener('click', (e) => {
      const currentTarget = e.target;
      if (currentTarget.classList.contains('create-income-button')) {
        const modalWindow = App.getModal('newIncome');
        modalWindow.open();
      }
      if (currentTarget.classList.contains('create-expense-button')) {
        const modalWindow = App.getModal('newExpense');
        modalWindow.open();
      }
    });

  }
}
