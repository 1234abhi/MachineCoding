import React, { useEffect, useState } from "react";
import "./styles.css";

export default function ListSorter({ initialList = [] }) {
  const [fruitList, setFruitList] = useState(initialList);

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    let updatedList = [...initialList];
    switch (value) {
      case "defaultOrder":
        setFruitList(initialList);
        break;
      case "ascendingOrder":
        updatedList.sort((a, b) => a.localeCompare(b));
        setFruitList(updatedList);
        break;
      case "descendingOrder":
        updatedList.sort((a, b) => b.localeCompare(a));
        setFruitList(updatedList);
        break;
      case "lengthOrder":
        updatedList.sort((a, b) => a.length - b.length);
        setFruitList(updatedList);
    }
  };

  return (
    <div data-testid="container">
      <div>
        <h2> List Sorter</h2>
      </div>
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        data-testid="sort-dropdown"
        onChange={(e) => handleDropdownChange(e)}
      >
        <option value="defaultOrder">Default</option>
        <option value="ascendingOrder">A - Z(Alphabetical) - "az"</option>
        <option value="descendingOrder">
          Z - A(Reverse Alphabetical) - "za"
        </option>
        <option value="lengthOrder">Length (Shortest First) - "length"</option>
      </select>
      <ul data-testid="list">
        {fruitList?.map((fruit, index) => (
          <li data-testid="list-item" key={index}>
            {fruit}
          </li>
        ))}
      </ul>
    </div>
  );
}
