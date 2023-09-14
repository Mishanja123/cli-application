const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');


const contactsPath = path.join(__dirname, "/db/contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const object = JSON.parse(data);
    return object
  };
  
  const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);
    return foundContact || null
  }
  
  const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const removedContact = contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return removedContact
    } else {
        return null
    }
  }
  
  const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };