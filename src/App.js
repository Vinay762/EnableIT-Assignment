import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`https://give-me-users-forever.vercel.app/api/users/${page}/next`)
      .then(response => response.json())
      .then(data => {
        console.log(data.users);
        setUsers(data.users);
        setLoading(false);
      });
  }, [page]);

  const handleNextClick = () => {
    setPage(page + 10);
  };

  const handlePreviousClick = () => {
    if (page-10 >= 0) {
      setPage(page - 10);
    }
  };

  return (
    <div className="App">
      <h1>User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="user-list">
            {users.map(user => (
              <div className="user" key={user.id}>
                <div className="user-info">
                  <h2>{user.FirstNameLastName}</h2>
                  <p>JobTitle :- {user.JobTitle}</p>
                  <p>Phone :- {user.Phone}</p>
                  <p>Company :- {user.Company}</p>
                  <p>Email :- {user.Email}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button onClick={handlePreviousClick} disabled={page === 0}>
              Previous
            </button>
            <button onClick={handleNextClick}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
