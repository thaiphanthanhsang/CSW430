import { configureStore, createSlice } from "@reduxjs/toolkit";

export const mapContacts = (contact) => {
    const { name, picture, phone, cell, email } = contact;
    return {
        name: name.first + ' ' + name.last,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() < 0.1 ? true : false,
    }
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
    },
    reducers: {
        fetchContactsSuccess: (state, action) => {
            state.contacts = action.payload;
        }
    }
});

export const { fetchContactsSuccess } = contactsSlice.actions;
const store = configureStore({
    reducer: contactsSlice.reducer,
})

export default store;