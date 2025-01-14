const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const deleteContactById = require('./deleteContactById');
const updateContactById = require('./updateContactById');
const updateFavorite = require('./updateFavorite');

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    deleteContactById,
    updateContactById,
    updateFavorite,
};
