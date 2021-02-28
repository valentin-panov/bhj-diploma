// done

/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Не передан элемент Modal');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    this.elementsClose = [
      ...this.element.querySelectorAll('button[data-dismiss="modal"]'),
    ];
    this.elementsClose.forEach((btn) =>
      btn.addEventListener('click', (evt) => {
        this.onClose(evt);
      })
    );
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(evt) {
    const target = evt.target.closest('[data-dismiss="modal"]');
    if (target) {
      evt.preventDefault();
      this.close();
    }
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    this.elementsClose.forEach((btn) =>
      btn.removeEventListener('click', this.onClose)
    );
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = 'none';
  }
}
