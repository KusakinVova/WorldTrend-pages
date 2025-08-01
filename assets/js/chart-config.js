function getChartConfig(labels, seriesData, month, year) {
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
  const monthName = monthNames[month - 1]
  const ONE_TERABYTE = 1024 * 1024 * 1024 * 1024
  const ONE_GIGABYTE = 1024 * 1024 * 1024

  return {
    chart: {
      type: 'line',
      zoomType: 'xy',
      scrollablePlotArea: {
        minWidth: 900, // Минимальная ширина области графика, при которой появится скролл
        scrollPositionX: 1, // Начальная позиция скрола по X
      },
      spacing: [40, 0, 0, 0], // Отступ (top, right, bottom, left)
      marginTop: 40,
      marginRight: 0,
      marginBottom: 80,
      marginLeft: 40,
    },
    title: false,
    xAxis: {
      categories: labels,
      title: {},
    },
    yAxis: {
      title: {
        text: 'TB',
        align: 'high',
        rotation: 0,

        y: -20,
        x: 30,
      },
      min: 0,
      max: ONE_TERABYTE,
      tickInterval: ONE_TERABYTE / 10,
      labels: {
        formatter: function () {
          return (this.value / ONE_TERABYTE).toFixed(1)
        },
      },
      // plotLines: [], // Массив для хранения линий
      gridLineWidth: 0, // Убираем линии сетки
      lineWidth: 1, // Толщина линии оси Y
    },
    tooltip: {
      crosshairs: {
        color: '#D8D8D8',
        dashStyle: 'line',
        width: 1,
      },
      split: true,
      distance: 10,
      positioner: function (labelWidth, labelHeight, point) {
        return {
          x: point.plotX - 25 + labelWidth / 2, // Центрируем тултип по X
          y: point.plotY - labelHeight - 10, // Размещаем тултип над точкой, добавляя отступ
        }
      },
      formatter: function () {
        var splitFormatter = function (point, data) {
          // Форматируем значение
          const yValue = (point.y / ONE_GIGABYTE).toFixed(0)
          return `
            ${data.x + 1} ${monthName} <br />
            ${yValue} GB
            `
        }
        return [this.x, splitFormatter(this.points[0], this), splitFormatter(this.points[1], this)]
      },
    },

    plotOptions: {
      series: {
        lineWidth: 3, // Толщина линии
        marker: {
          enabled: false, // Убираем маркеры на точках
          symbol: 'circle',
        },
        states: {
          hover: {
            lineWidthPlus: 0, // Убираем увеличение толщины линии при наведении
            halo: {
              size: 0, // Убираем ореол вокруг линии при наведении
            },
            marker: {
              enabled: true, // <-- Показываем маркер
              radius: 5, // <-- Увеличиваем радиус маркера
            },
          },
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: seriesData,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 320,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  }
}
