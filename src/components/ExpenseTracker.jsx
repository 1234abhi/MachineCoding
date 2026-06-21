import React, { useState, useMemo } from "react";

const ExpenseTracker = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
  });

  const [lists, setLists] = useState([]);
  const [openForm, setOpenForm] = useState(true);
  const [search, setSearch] = useState("");

  // ✅ Calculate totals using useMemo (better than storing in state)
  const { totalIncome, totalExpense } = useMemo(() => {
    return lists.reduce(
      (acc, curr) => {
        if (curr.type === "income") acc.totalIncome += curr.amount;
        if (curr.type === "expense") acc.totalExpense += curr.amount;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 },
    );
  }, [lists]);

  // ✅ Add transaction
  const handleAddTransaction = () => {
    if (!formData.title || !formData.amount) return;

    const newTransaction = {
      id: crypto.randomUUID(),
      title: formData.title,
      amount: Number(formData.amount),
      type: formData.type,
    };

    setLists((prev) => [...prev, newTransaction]);
    setFormData({ title: "", amount: "", type: "income" });
    setOpenForm((prev) => !prev);
  };

  // ✅ Delete transaction
  const handleDelete = (id) => {
    setLists((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Filtered transactions
  const filteredTransactions = lists.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="tracker-container">
      <h2>Expense Tracker</h2>

      <div className="header-container">
        <h3 data-testid="balance-amount">
          Balance: ₹{totalIncome - totalExpense}
        </h3>

        <button
          data-testid="toggle-form-button"
          onClick={() => setOpenForm((prev) => !prev)}
        >
          {openForm ? "Close Form" : "Open Form"}
        </button>
      </div>

      {openForm && (
        <div className="form">
          <input
            type="text"
            data-testid="title-input"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <input
            type="number"
            data-testid="amount-input"
            placeholder="Amount"
            min="0"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          <select
            data-testid="type-select"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button data-testid="add-button" onClick={handleAddTransaction}>
            Add Transaction
          </button>
        </div>
      )}

      <div className="summary">
        <div data-testid="income-amount">Income: ₹{totalIncome}</div>
        <div data-testid="expenses-amount">Expense: ₹{totalExpense}</div>
      </div>

      <input
        type="text"
        data-testid="search-input"
        placeholder="Search..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((item) => (
          <div key={item.id} className="transaction">
            <span>
              {item.title} — ₹{item.amount} ({item.type})
            </span>
            <button onClick={() => handleDelete(item.id)}>❌</button>
          </div>
        ))
      ) : (
        <div>No Transaction Found</div>
      )}
    </div>
  );
};

export default ExpenseTracker;
