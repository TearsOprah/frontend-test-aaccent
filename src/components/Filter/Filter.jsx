// import React, { useState } from "react";
// import './Filter.scss'
//
// export default function Filter({ brands }) {
//   const [selectedBrands, setSelectedBrands] = useState([]);
//
//   const handleApplyFilters = () => {
//     // Вызов функции handleApplyFilters с выбранными брендами
//     // Можете выполнять необходимую логику с выбранными брендами здесь
//     console.log("Selected brands: ", selectedBrands);
//   };
//
//   const handleResetFilters = () => {
//     setSelectedBrands([]);
//     console.log("Selected brands: ", selectedBrands);
//   };
//
//   const handleBrandClick = (brandId) => {
//     if (selectedBrands.includes(brandId)) {
//       // Если бренд уже выбран, удаляем его из массива выбранных брендов
//       setSelectedBrands(prevSelectedBrands =>
//         prevSelectedBrands.filter(brand => brand !== brandId)
//       );
//     } else {
//       // Если бренд не выбран, добавляем его в массив выбранных брендов
//       setSelectedBrands(prevSelectedBrands => [...prevSelectedBrands, brandId]);
//     }
//   };
//
//   return (
//     <>
//       <h3>Brands: </h3>
//       <ul>
//         {brands.map((brand, index) => (
//           <li
//             key={brand.id}
//             onClick={() => handleBrandClick(brand.id)}
//             className={selectedBrands.includes(brand.id) ? "brand_active" : ""}
//             style={{ cursor: "pointer" }}
//           >
//             {brand.title}
//           </li>
//         ))}
//       </ul>
//
//       <div>
//         <button onClick={handleApplyFilters}>Apply</button>
//         <button onClick={handleResetFilters}>Reset</button>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";

export default function Filter({ brands }) {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleApplyFilters = () => {
    // Вызов функции handleApplyFilters с выбранными брендами
    // Можете выполнять необходимую логику с выбранными брендами здесь
    console.log("Selected brands: ", selectedBrands);
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);

    // Снимаем отметки со всех флажков, устанавливая значение checked в false
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    console.log("Selected brands: ", selectedBrands);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Если флажок отмечен, добавляем значение в массив выбранных брендов
      setSelectedBrands(prevSelectedBrands => [...prevSelectedBrands, value]);
    } else {
      // Если флажок снят, удаляем значение из массива выбранных брендов
      setSelectedBrands(prevSelectedBrands => prevSelectedBrands.filter((brandId) => brandId !== value));
    }
  };

  useEffect(() => {
    // Устанавливаем состояние флажков при изменении состояния selectedBrands
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (selectedBrands.includes(checkbox.value)) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
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
