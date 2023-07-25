import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(sessionStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [contacts]);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSaveContact = () => {
    if (name.trim() === '' || phone.trim() === '') {
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      phone,
    };

    setContacts([...contacts, newContact]);
    setName('');
    setPhone('');
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  return (
    <div>
      <h1>Imenik</h1>
      <div>
        <input type="text" placeholder="Ime" value={name} onChange={handleNameChange} />
        <input type="text" placeholder="Broj telefona" value={phone} onChange={handlePhoneChange} />
        <button onClick={handleSaveContact}>Dodaj</button>
      </div>
      <ul>
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} onDelete={handleDeleteContact} />
        ))}
      </ul>
    </div>
  );
};

const Contact = ({ contact, onDelete }) => {
  return (
    <li>
      {contact.name} - {contact.phone} <button onClick={() => onDelete(contact.id)}>Obriši</button>
    </li>
  );
};

export default App;
