import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCountries } from './store/countriesSlice';
import { fetchCategories } from './store/categoriesSlice';
import { fetchChartData } from './store/chartDataSlice';

import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

import FiltersContainer from './components/FiltersContainer';
import DateRangePicker from './components/DateRangePicker';
import ChartComponent from './components/ChartComponent';
import ExportButtons from './components/ExportButtons';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.list);
  const categories = useSelector((state) => state.categories.list);
  const chartData = useSelector((state) => state.chartData.data);
  const isLoading = useSelector((state) => state.chartData.status === 'loading');
  const error = useSelector((state) => state.chartData.error);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  const handleCountryChange = (event) => {
      event.stopPropagation();
    const countryCode = event.target.value;
   
    setSelectedCountry(countryCode);
    if (countryCode && selectedCategory) {
      dispatch(fetchChartData({ countryCode, categoryId: selectedCategory }));
    }
  };



const handleCategoryChange = (event) => {
    event.stopPropagation();
  console.log('Category changed:', event.target.value);
  const categoryId = event.target.value;
 
  setSelectedCategory(categoryId);
  if (selectedCountry && categoryId) {
    console.log('Fetching chart data...');
    dispatch(fetchChartData({ countryCode: selectedCountry, categoryId }));
  }
};

  // Проверка ErrorBoundary
  // const [errors, setError] = useState(null);
  // const handleClick = () => {
  //   setError(new Error('Test error'));
  // };

  return (
    <div className="app-container">
      {/* Проверка ErrorBoundary 
            <button onClick={handleClick}>Trigger error</button>
            {errors && <ErrorBoundary errors={errors} />} */}
      
      <h1>Top History</h1>

      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <>
         <div className="filters-container">
          <FiltersContainer
            countries={countries}
            categories={categories}
            handleCountryChange={handleCountryChange}
            handleCategoryChange={handleCategoryChange}
            selectedCountry={selectedCountry}
            selectedCategory={selectedCategory}
          />

          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            selectedCountry={selectedCountry}
            selectedCategory={selectedCategory}
            dispatch={dispatch}
            fetchChartData={fetchChartData}
          />
          </div>

          <div className="chart-container">
            <ChartComponent chartData={chartData} chartRef={chartRef} />
            <ExportButtons chartData={chartData} chartRef={chartRef} />
          </div>
          
        </>
      )}
    </div>
  );
}

export default App;