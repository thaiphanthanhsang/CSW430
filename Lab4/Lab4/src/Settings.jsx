import { useCallback, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONTACTS_CACHE_KEY } from './Contact';
import { fetchContactsSuccess } from './Store';

const Settings = () => {
    const { contacts } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [cachedCount, setCachedCount] = useState(0);

    const readCache = useCallback(() => {
        AsyncStorage.getItem(CONTACTS_CACHE_KEY)
            .then((cached) => {
                setCachedCount(cached ? JSON.parse(cached).length : 0);
            })
            .catch(() => setCachedCount(0));
    }, []);

    useFocusEffect(
        useCallback(() => {
            readCache();
        }, [readCache])
    );

    const clearCache = () => {
        AsyncStorage.removeItem(CONTACTS_CACHE_KEY)
            .then(() => {
                setCachedCount(0);
                dispatch(fetchContactsSuccess([]));
            })
            .catch(() => { });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Contacts đang hiển thị</Text>
            <Text style={styles.value}>{contacts.length}</Text>

            <Text style={styles.label}>Contacts đã lưu trong AsyncStorage</Text>
            <Text style={styles.value}>{cachedCount}</Text>

            <Button
                mode="contained"
                onPress={clearCache}
                style={styles.button}
            >
                Xóa cache
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontSize: 14,
        color: '#666666',
        marginTop: 16,
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    button: {
        marginTop: 32,
    },
});

export default Settings;
