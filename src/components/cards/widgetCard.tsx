import { Doughnut } from 'react-chartjs-2'
import { WidgetType } from '../../types/category'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend)

const chartOptions = {
  plugins: {
    chart: {
      heigt: '90%',
    },
    legend: {
      display: false,
    },
  },
}

export default function WidgetCard({ widget }: { widget: WidgetType }) {
  const cloudAccountsData = {
    labels: ['Connected', 'Not Connected'],
    datasets: [
      {
        data: [2, 2],
        backgroundColor: ['#4F46E5', '#E0E7FF'],
        hoverBackgroundColor: ['#3B82F6', '#A5B4FC'],
        borderWidth: 0,
      },
    ],
  }

  return (
    <>
      <div className='card card-side h-full bg-white shadow-xl w-[400px]'>
        <div className='card-body justify-center '>
          <h2 className='card-title -translate-y-4'>{widget.text}</h2>
          <div className='flex items-center justify-between h-[90%]'>
            <div className='h-20 w-40'>
              <Doughnut options={chartOptions} data={cloudAccountsData} />
            </div>
            <p className='font-semibold text-xl'>{widget.status}</p>
          </div>
        </div>
      </div>
    </>
  )
}
