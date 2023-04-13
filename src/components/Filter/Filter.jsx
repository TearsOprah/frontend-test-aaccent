import React, { useState, useEffect } from "react";
import './Filter.scss'

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
    <div className={'filter-container'}>
      <h3 className={'filter-title'}>Бренды: </h3>
      <ul className={'filter-list'}>
        {brands.map((brand) => (
          <li className={'filter-item'} key={brand.id}>
            <label className={'checkbox'}>
              <input
                type={"checkbox"}
                value={brand.id}
                onChange={handleCheckboxChange}
              />
              <span className={'checkmark'}></span>
              {brand.title}
            </label>
          </li>
        ))}
      </ul>

      <div className={'filter-buttons'}>
        <button className={'filter-button'} onClick={handleApplyFilters}>Применить</button>
        <button className={'filter-button'} onClick={handleResetFilters}>Сбросить</button>
      </div>
    </div>
  );
}
