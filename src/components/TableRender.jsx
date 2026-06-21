import React, { useEffect, useState } from "react";

const TableRender = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();

      sortByName(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sortByName = (data) => {
    const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
    setUserData(sorted);
  };

  const handleFilterByName = (e) => {
    setSearch(e.target.value);
  };

  // ✅ Filtering logic
  const filteredData = userData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Table</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleFilterByName}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((dt) => (
            <tr key={dt.id}>
              <td>{dt.name}</td>
              <td>{dt.username}</td>
              <td>{dt.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRender;
