import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlice';
import categoriesReducer from './categoriesSlice';
import chartDataReducer from './chartDataSlice';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    categories: categoriesReducer,
    chartData: chartDataReducer,
  },
});

export default store;