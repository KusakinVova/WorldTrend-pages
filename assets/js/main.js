console.log('Hello, World!')

document.addEventListener('DOMContentLoaded', function () {
  const showMoreButton = document.querySelector('.news__showMore')
  const hiddenItems = document.querySelectorAll('.news__item--hidden')

  showMoreButton.addEventListener('click', function (e) {
    e.preventDefault() // Предотвращаем переход по ссылке

    // Плавно показываем каждый скрытый элемент
    hiddenItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '0'
        item.style.display = 'block' // Или 'flex', в зависимости от вашей верстки
        item.style.transition = 'opacity 0.5s ease'

        // Небольшая задержка перед анимацией для каждого элемента
        setTimeout(() => {
          item.style.opacity = '1'
        }, 10)
      }, index * 100) // Задержка между появлением элементов
    })

    // Скрываем кнопку после показа всех элементов
    setTimeout(() => {
      this.parentElement.style.display = 'none'
    }, hiddenItems.length * 100 + 500)
  })
})
