import React, { useState, useEffect } from "react";

export default function Filter({ brands, selectedBrands, setSelectedBrands, setIsFilterApplied }) {

  const [tempSelectedBrands, setTempSelectedBrands] = useState([])

  const handleApplyFilters = () => {
    setSelectedBrands(tempSelectedBrands)
    setIsFilterApplied(true);
  };

  const handleResetFilters = () => {
    setTempSelectedBrands([]);
    setSelectedBrands([]);

    // снимаем отметки со всех флажков, устанавливая значение checked в false
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    setIsFilterApplied(false);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // если флажок отмечен, добавляем значение в массив выбранных брендов
      setTempSelectedBrands(prevSelectedBrands => [...prevSelectedBrands, value]);
    } else {
      // если флажок снят, удаляем значение из массива выбранных брендов
      setTempSelectedBrands(prevSelectedBrands => prevSelectedBrands.filter((brandId) => brandId !== value));
    }
  };

  useEffect(() => {
    // устанавливаем состояние флажков при изменении состояния selectedBrands
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = !!selectedBrands.includes(checkbox.value);
    });
  }, [selectedBrands]);

  return (
    <>
      <h3>Brands: </h3>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>
            <label>
              <input
                type={"checkbox"}
                value={brand.id}
                onChange={handleCheckboxChange}
              />
              {brand.title}
            </label>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handleApplyFilters}>Apply</button>
        <button onClick={handleResetFilters}>Reset</button>
      </div>
    </>
  );
}
