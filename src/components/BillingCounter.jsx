// import React, { useState } from "react";

// const BillingCounter = () => {
//   const [showBillingCounter, setShowBillingCounter] = useState(true);
//   const [counterValue, setCounterValue] = useState("");
//   const [counterArray, setCounterArray] = useState([]);
//   const [quantity, setQuantity] = useState("");

//   const handleAddCounter = () => {
//     const counterValueToNumber = Number(counterValue);
//     if (counterValue <= 0) return;
//     const updatedArray = Array.from({ length: counterValueToNumber }, () => []);
//     setCounterArray(updatedArray);
//     setShowBillingCounter(false);
//   };

//   const handleAddCustomers = () => {
//     const qty = Number(quantity);
//     if (qty <= 0) return;
//     let minSize = counterArray[0].reduce((acc, curr) => acc + curr, 0);
//     let minIdex = 0;
//     for (let i = 1; i < counterArray.length; i++) {
//       let getCurrLength = counterArray[i].reduce((acc, curr) => acc + curr, 0);
//       if (getCurrLength < minSize) {
//         minSize = getCurrLength;
//         minIdex = i;
//       }
//     }
//     const updatedCounter = [...counterArray];
//     updatedCounter[minIdex] = [...updatedCounter[minIdex], qty];
//     setCounterArray(updatedCounter);
//     console.log(updatedCounter);
//   };

//   return (
//     <div>
//       {showBillingCounter ? (
//         <div>
//           <input
//             type="number"
//             value={counterValue}
//             placeholder="Number of Counters"
//             onChange={(e) => setCounterValue(e.target.value)}
//           />
//           <br />
//           <button onClick={handleAddCounter}>Set Counter</button>
//         </div>
//       ) : (
//         <div>
//           <input
//             type="number"
//             value={quantity}
//             placeholder="Enter Quantity"
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//           <br />
//           <button onClick={handleAddCustomers}>Add Customers</button>
//         </div>
//       )}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "1rem",
//         }}
//       >
//         {counterArray?.map((queue, index) => (
//           <div style={{ border: "1px solid black" }} key={index}>
//             <h4>Counter {index + 1}</h4>
//             {queue.map((qty, index) => (
//               <div key={index}>{qty}</div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BillingCounter;

import React, { useState } from "react";
import "./styles.css";

export default function BillingCounter() {
  const [counter, setCounter] = useState("");
  const [quantity, setQuantity] = useState("");
  const [counterArray, setCounterArray] = useState([]);
  const [isAddCustomers, setIsAddCustomers] = useState(false);
  const [message, setMessage] = useState("");

  const handleCounterChange = (e) => {
    setCounter(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleCounterClick = () => {
    const count = Number(counter);
    if (count <= 0) return;

    if (counterArray.length === 0) {
      const newArray = Array.from({ length: count }, () => []);
      setCounterArray(newArray);
      setCounter("");
      setIsAddCustomers(true);
      setMessage("");
    }
  };

  const handleAddCustomer = () => {
    if (counterArray.length === 0) return;
    const qty = Number(quantity);

    if (qty <= 0) return;
    let minIndex = 0;
    let minSum = counterArray[0].reduce((a, b) => a + b, 0);

    counterArray.forEach((queue, index) => {
      const sum = queue.reduce((a, b) => a + b, 0);
      if (sum < minSum) {
        minSum = sum;
        minIndex = index;
      }
    });

    const updatedCounters = [...counterArray];
    updatedCounters[minIndex] = [...updatedCounters[minIndex], qty];

    setCounterArray(updatedCounters);
    setQuantity("");
    setMessage(`Customer assigned to Counter ${minIndex + 1}`);
  };

  return (
    <div className="billing-container" data-testid="billing-container">
      <h2 data-testid="heading">Billing Counter System</h2>
      <div className="input-section" data-testid="counter-input-section">
        <input
          data-testid="counter-input"
          type="number"
          placeholder={isAddCustomers ? "Enter quantity" : "Number of counters"}
          value={isAddCustomers ? quantity : counter}
          onChange={(e) =>
            isAddCustomers ? handleQuantity(e) : handleCounterChange(e)
          }
        />
        <button
          data-testid="set-counter-button"
          onClick={isAddCustomers ? handleAddCustomer : handleCounterClick}
        >
          {isAddCustomers ? "Add Customer" : "Set Counters"}
        </button>
      </div>
      {message && (
        <p data-testid="assignment-msg" className="assignment-msg">
          {message}
        </p>
      )}
      <div className="counter-wrapper">
        {counterArray.map((queue, index) => (
          <div className="counter" key={index} data-testid={`counter-${index}`}>
            <h4 data-testid="counter-heading">Counter {index + 1}</h4>
            {queue.map((qty, i) => (
              <div key={i} data-testid="customer-box" className="customer-box">
                {qty}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
