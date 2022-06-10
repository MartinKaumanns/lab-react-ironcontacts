import './App.css';
import contacts from './contacts.json';
import React, { useState } from 'react';

function App() {
  const [actors, setActors] = useState(contacts.slice(0, 5));

  const addRandomActor = () => {
    const actorsIdNotInTheList = contacts.filter((actor) => {
      return !actors.includes(actor);
    });

    if (actorsIdNotInTheList.length) {
      const randomIndex = Math.floor(
        actorsIdNotInTheList.length * Math.random()
      );

      const randomContact = actorsIdNotInTheList[randomIndex];
      setActors([...actors, randomContact]);
    }
  };

  /* Sort by popularity handle function */

  const sortByName = () => {
    setActors([
      ...actors.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
    ]);
  };

  const sortByPopularity = () => {
    setActors([...actors.sort((a, b) => a.popularity - b.popularity)]);
  };

  const handleDelete = (id) => {
    console.log(id);

    const newListOfActors = actors.filter((item) => item.id !== id);

    setActors(newListOfActors);
  };
  /* Sort by name handle function */

  return (
    <div className="App">
      <table>
        <thead>
          <h1>Iron Contacts</h1>
          <button onClick={() => addRandomActor()}>Add Random Contact</button>
          <button onClick={() => sortByName()}>Sort by name</button>
          <button onClick={() => sortByPopularity()}>Sort by popularity</button>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {actors.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt="" width="100px" />
                </td>
                <td>{contact.name}</td>
                <td>{Math.round(contact.popularity * 100) / 100}</td>
                {contact.wonOscar && <td>🏆</td>}
                {contact.wonEmmy && <td>🏆</td>}
                <td>
                  <button onClick={() => handleDelete(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
