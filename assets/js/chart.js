let chart
let currentPosition = 0
const monthButtons = generateMonthButtons()
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() + 1

let buttonWidth // Теперь это не константа
let visibleButtons // Теперь это не константа

document.addEventListener('DOMContentLoaded', function () {
  initMonthSelector()
  updateChart(currentMonth, currentYear)
  setupNavigation()

  // Добавляем слушатель события изменения размера окна
  window.addEventListener('resize', handleResize)
  handleResize() // Первоначальный вызов для установки значений
})

function handleResize() {
  const wrapper = document.querySelector('.monthWrapper')
  const firstButton = document.querySelector('.monthList__item')

  if (wrapper && firstButton) {
    const wrapperWidth = wrapper.offsetWidth
    const btnWidth = firstButton.offsetWidth + 5 // Учитываем gap в 5px
    visibleButtons = Math.floor(wrapperWidth / btnWidth)
    buttonWidth = btnWidth

    // Пересчитываем и центрируем, если необходимо
    centerCurrentMonth()
    updateNavButtons()
  }
}

function initMonthSelector() {
  const container = document.getElementById('monthList')

  monthButtons.forEach((btn, index) => {
    const button = document.createElement('button')
    button.className = 'monthList__item'
    if (btn.isCurrent) {
      button.classList.add('monthList__item--active')
    }
    button.textContent = btn.label
    button.dataset.year = btn.year
    button.dataset.month = btn.month
    button.onclick = () => {
      document
        .querySelectorAll('.monthList__item')
        .forEach((b) => b.classList.remove('monthList__item--active'))
      button.classList.add('monthList__item--active')
      updateChart(btn.month, btn.year)
    }
    container.appendChild(button)
  })
}

function centerCurrentMonth() {
  const buttons = document.querySelectorAll('.monthList__item')
  const currentIndex = monthButtons.findIndex((btn) => btn.isCurrent)

  if (currentIndex >= 0 && buttons.length > 0 && visibleButtons > 0) {
    // Вычисляем позицию, чтобы центрировать текущий месяц
    currentPosition = Math.max(
      0,
      Math.min(currentIndex - Math.floor(visibleButtons / 2), monthButtons.length - visibleButtons)
    )
    updateSliderPosition()
  }
}

function setupNavigation() {
  const prevBtn = document.getElementById('prev-month')
  const nextBtn = document.getElementById('next-month')
  const totalButtons = monthButtons.length

  prevBtn.addEventListener('click', () => {
    currentPosition = Math.max(0, currentPosition - 1)
    updateSliderPosition()
    updateNavButtons()
  })

  nextBtn.addEventListener('click', () => {
    currentPosition = Math.min(totalButtons - visibleButtons, currentPosition + 1)
    updateSliderPosition()
    updateNavButtons()
  })

  updateNavButtons()
}

function updateSliderPosition() {
  const monthSelector = document.getElementById('monthList')
  monthSelector.style.transform = `translateX(-${currentPosition * buttonWidth}px)`
}

function updateNavButtons() {
  const prevBtn = document.getElementById('prev-month')
  const nextBtn = document.getElementById('next-month')
  const totalButtons = monthButtons.length

  prevBtn.disabled = currentPosition === 0
  nextBtn.disabled = currentPosition >= totalButtons - visibleButtons
}

function updateChart(month, year) {
  const labels = generateDayLabels(month, year)
  const seriesData = generateSeriesData(labels.length)
  const config = getChartConfig(labels, seriesData, month, year)

  if (chart) {
    chart.destroy()
  }

  chart = Highcharts.chart('chart-container', config)
}
