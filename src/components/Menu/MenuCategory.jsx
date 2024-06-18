import { useEffect, useState } from 'react';

const MenuCategory = ({ categories, onChange }) => {
  const [selectedCategories, setSelectedCategories] = useState(['all']);

  useEffect(() => {
    setSelectedCategories(['all']);
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setSelectedCategories((prevCategories) =>
      checked ? [...prevCategories, value] : prevCategories.filter((category) => category !== value)
    );
  };

  useEffect(() => {
    onChange(selectedCategories);
  }, [selectedCategories, onChange]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value="all"
          onChange={handleCategoryChange}
          checked={selectedCategories.includes('all')}
        />
        전체
      </label>
      {categories.map((category) => (
        <label key={category.value}>
          <input
            type="checkbox"
            value={category.value}
            onChange={handleCategoryChange}
            checked={selectedCategories.includes(category.value)}
          />
          {category.label}
        </label>
      ))}
    </div>
  );
};

export default MenuCategory;
