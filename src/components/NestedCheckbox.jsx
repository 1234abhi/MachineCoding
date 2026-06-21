import React, { useState } from "react";

const checkboxesData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      {
        id: 2,
        label: "Apple",
      },
      {
        id: 3,
        label: "Banana",
      },
      {
        id: 4,
        label: "Citrus",
        children: [
          {
            id: 5,
            label: "Orange",
          },
          {
            id: 6,
            label: "Lemon",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Vegetables",
    children: [
      {
        id: 8,
        label: "Carrot",
      },
      {
        id: 9,
        label: "Broccoli",
      },
    ],
  },
];

const Checkboxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    // if children are present, add all of them to new State
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };
      updateChildren(node);

      // if all children are checked mark parent as checked
      const verifyChecked = (node) => {
        if (!node.children) return;

        // First update nested parents
        node.children.forEach((node) => verifyChecked(node));

        // Then compute this parent's state
        newState[node.id] = node.children.every((child) => newState[child.id]);
      };

      checkboxesData.forEach((node) => verifyChecked(node));

      return newState;
    });
  };

  return (
    <div>
      {data?.map((node) => (
        <div key={node.id} style={{ paddingLeft: "25px" }}>
          <input
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <span>{node.label}</span>
          {node.children && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const NestedCheckbox = () => {
  const [checked, setChecked] = useState({});
  return (
    <div>
      <div>NestedCheckbox</div>
      <Checkboxes
        data={checkboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};

export default NestedCheckbox;
