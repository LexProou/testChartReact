import { Line } from 'react-chartjs-2';

const ChartComponent = ({ chartData, chartRef }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: true,
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            return `Date: ${tooltipItems[0].label}`;
          },
          label: function (context) {
            return `${context.dataset.label}: Rank ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        reverse: true,
        title: {
          display: true,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <Line
      ref={chartRef}
      data={chartData}
      options={options}
    />
  );
};

export default ChartComponent;