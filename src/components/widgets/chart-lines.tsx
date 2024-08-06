import { useEffect, useRef } from 'react'

import Chart, { ChartData } from 'chart.js/auto'

export default function ChartLines({ data }: { data: ChartData }) {
  const canvasRef = useRef(null)
  const chartRef = useRef<Chart | null>()

  useEffect(() => {
    const drawChart = () => {
      if (!canvasRef.current) return

      chartRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data,
        options: {
          datasets: {
            line: {
              fill: 'start',
              borderWidth: 2,
              tension: 0.4,
              pointStyle: 'circle',
              pointRadius: 1.5,
            },
          },
        },
      })
    }

    drawChart()

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [data])

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  )
}
