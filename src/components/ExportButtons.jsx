import React from 'react';
import { Button } from '@mui/material';

const ExportButtons = ({ chartData, chartRef }) => {
  const exportToCSV = () => {
    if (!chartData || chartData.labels.length === 0) return;

    let csvContent = `data:text/csv;charset=utf-8,Date,${chartData.labels.join(',')}\n`;

    chartData.datasets.forEach((dataset) => {
      csvContent += `${dataset.label},${dataset.data.join(',')}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'chart_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPNG = () => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'chart.png';
    link.click();
  };

  return (
    <div className="export-buttons">
      <Button variant="outlined" color="primary" onClick={exportToCSV}>
        Export to CSV
      </Button>
      <Button variant="outlined" color="error" onClick={exportToPNG}>
        Export to PNG
      </Button>
    </div>
  );
};

export default ExportButtons;
