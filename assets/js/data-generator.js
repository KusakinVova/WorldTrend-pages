const ONE_TERABYTE = 1 * 1024 * 1024 * 1024 * 1024

function getRandomValue() {
  return Math.floor(Math.random() * ONE_TERABYTE * 0.8) // Генерируем случайное значение до 80% от 1 ТБ
}

function generateDayLabels(month, year) {
  const labels = []
  const daysInMonth = new Date(year, month, 0).getDate()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  for (let day = 1; day <= daysInMonth; day++) {
    labels.push(`${day} ${monthNames[month - 1]}`)
  }

  return labels
}

function generateSeriesData(daysCount) {
  const series1 = []
  const series2 = []

  for (let i = 0; i < daysCount; i++) {
    series1.push(getRandomValue())
    series2.push(getRandomValue())
  }

  return [
    { name: 'Chart 1', data: series1, id: 'series1', color: '#C01B1E' },
    { name: 'Chart 2', data: series2, id: 'series2', color: '#143E95' },
  ]
}

function formatBytes(value) {
  if (value >= 1024 * 1024 * 1024 * 1024) {
    return (value / (1024 * 1024 * 1024 * 1024)).toFixed(1) + ' TB'
  } else if (value >= 1024 * 1024 * 1024) {
    return (value / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
  }
  return (value / (1024 * 1024 * 1024 * 1024)).toFixed(3) + ' TB'
}

function generateMonthButtons() {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const buttons = []

  // Generate from Jan 2000 to current month
  for (let year = 2000; year <= currentYear; year++) {
    const endMonth = year === currentYear ? currentMonth : 12
    for (let month = 1; month <= endMonth; month++) {
      buttons.push({
        year,
        month,
        label: `${monthNames[month - 1]}, ${year.toString().slice(-2)}`,
        isCurrent: year === currentYear && month === currentMonth,
      })
    }
  }

  return buttons
}
