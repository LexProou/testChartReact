import React from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@mui/material';

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate, selectedCountry, selectedCategory, dispatch, fetchChartData }) => {
  return (
    <div className="date-range-selector">
      <div className="date-picker">
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="date-picker">
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <Button
                variant="contained"
                className="apply-dates-btn"
                onClick={() =>
                  selectedCountry &&
                  selectedCategory &&
                  dispatch(
                    fetchChartData({
                      countryCode: selectedCountry,
                      categoryId: selectedCategory,
                    })
                  )
                }
              >
                Apply
              </Button>
            </div>
  );
};

export default DateRangePicker;