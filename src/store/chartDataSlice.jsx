import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChartData = createAsyncThunk(
  'chartData/fetchChartData',
  async ({ countryCode, categoryId }) => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 30); 
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = today.toISOString().split('T')[0];
    const response = await axios.get(
      `https://api.apptica.com/package/top_history/${categoryId}/${countryCode}?date_from=${formattedStartDate}&date_to=${formattedEndDate}&platforms=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`
    );
    return response.data.data;
  }
);

const chartDataSlice = createSlice({
  name: 'chartData',
  initialState: {
    data: {
      labels: [],
      datasets: [],
    },
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = transformApiDataToChartFormat(action.payload);
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const transformApiDataToChartFormat = (apiData) => {
  const labels = [];
  const datasets = [];

  for (const categoryId in apiData) {
    const categoryData = apiData[categoryId];

    for (const subCategoryId in categoryData) {
      const subCategoryData = categoryData[subCategoryId];
      const data = Object.values(subCategoryData);

      const categoryName = `Category ${categoryId}`;
      const subCategoryLabel = `${categoryName} - SubCategory ${subCategoryId}`;

      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);

      datasets.push({
        label: subCategoryLabel,
        data,
        borderColor: `rgba(${r},${g},${b},1)`,
        backgroundColor: `rgba(${r},${g},${b},0.2)`,
        fill: false,
      });

      if (labels.length === 0) {
        labels.push(...Object.keys(subCategoryData));
      }
    }
  }

  return { labels, datasets };
};

export default chartDataSlice.reducer;