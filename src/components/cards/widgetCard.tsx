import { Doughnut } from 'react-chartjs-2'
import { WidgetType } from '../../types/category'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend)

const chartOptions = {
  plugins: {
    chart: {
      heigt: '90%'

    },
    legend: {
      display: false,
    },
  },
};

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
      <div className='card card-side h-full bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>{widget.text}</h2>
          <div className='flex gap-16'>
            {/* <Doughnut options={chartOptions} data={cloudAccountsData} /> */}
            <p className='font-semibold text-xl'>{widget.status}</p>
          </div>
        </div>
      </div>
    </>
  )
}
