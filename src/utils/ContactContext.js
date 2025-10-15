import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sampleContacts } from '../data/contactsData';

const ContactContext = createContext();
export const useContacts = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const stored = await AsyncStorage.getItem('contacts');
      if (stored) setContacts(JSON.parse(stored));
      else {
        setContacts(sampleContacts);
        await AsyncStorage.setItem('contacts', JSON.stringify(sampleContacts));
      }
    } catch (error) {
      console.error('Failed to load contacts:', error);
      setContacts(sampleContacts);
    } finally {
      setLoading(false);
    }
  };

  const saveContacts = async list => AsyncStorage.setItem('contacts', JSON.stringify(list));

  const addContact = async data => {
    const newContact = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      favorite: false,
    };
    const updated = [...contacts, newContact];
    setContacts(updated);
    await saveContacts(updated);
  };

  const updateContact = async (id, data) => {
    const updated = contacts.map(c => (c.id === id ? { ...c, ...data } : c));
    setContacts(updated);
    await saveContacts(updated);
  };

  const deleteContact = async id => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    await saveContacts(updated);
  };

  const toggleFavorite = async id => {
    const updated = contacts.map(c => (c.id === id ? { ...c, favorite: !c.favorite } : c));
    setContacts(updated);
    await saveContacts(updated);
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        addContact,
        updateContact,
        deleteContact,
        toggleFavorite,
        refreshContacts: loadContacts,
      }}>
      {children}
    </ContactContext.Provider>
  );
};
