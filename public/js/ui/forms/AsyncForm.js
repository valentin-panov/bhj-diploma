/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;

    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * !!! Запрещает странице перезагружаться при попытке успешной отправки - пока не понимаю, как здесь отфильровать успешную отправку
   * */
  registerEvents() {
    this.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submit();
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    return [...new FormData(this.element).entries()].reduce((target, [name, value]) => {
      target[name] = value;
      return target;
    }, {});
  }

  // метод для экстенда другими формами
  onSubmit(options) {}

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   *  {
   *    "результат работы метода getData()"
   *  }
   * */
  submit() {
    const data = this.getData();
    this.onSubmit({ data });
  }
}
