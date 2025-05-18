import '../../src/App.css';


const Filters = ({ countries, categories, handleCountryChange, handleCategoryChange, selectedCountry, selectedCategory }) => {
  
  return (
    <div className="filters-container2">
      <div className="country-selector">
        <label htmlFor="country-select">Select Country: </label>
        <select
          id="country-select"
          value={selectedCountry || ''}
          onChange={handleCountryChange}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="category-selector">
        <label htmlFor="category-select">Select Category: </label>
        <select
          id="category-select"
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;