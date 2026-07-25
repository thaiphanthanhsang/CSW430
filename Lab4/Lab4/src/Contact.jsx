import { useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactListItem from './ContactListItem';
import { fetchContactsSuccess, mapContacts } from './Store';

export const CONTACTS_CACHE_KEY = '@contacts_cache';

const keyExtractor = ({ phone }) => phone;

const fetchContacts = async () => {
  const data = await fetch('https://randomuser.me/api/?results=50');
  const ContactData = await data.json();
  return ContactData.results.map(mapContacts);
};

const Contacts = ({ navigation }) => {
  const { contacts } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem(CONTACTS_CACHE_KEY)
      .then(cached => {
        if (cached) {
          dispatch(fetchContactsSuccess(JSON.parse(cached)));
        }
      })
      .catch(e => console.error('Failed to read contacts cache:', e));

    fetchContacts()
      .then(contacts => {
        dispatch(fetchContactsSuccess(contacts));
        AsyncStorage.setItem(CONTACTS_CACHE_KEY, JSON.stringify(contacts))
          .catch(e => console.error('Failed to write contacts cache:', e));
      })
      .catch(e => { console.error('fetchContacts failed:', e); });
  }, [dispatch]);

  const renderContacts = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('ProfileContact', { contact: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderContacts}
      />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
