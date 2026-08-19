import {
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import api from '../../api';
import TransactionList from './TransactionList';

export default function Transaction({ navigation, transactions }) {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/transactions');
        setTransaction(response.data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Transaction
        </Text>
      </View>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#E8577E" />
        </View>
      ) : (
        <TransactionList navigation={navigation} transactions={transaction} />
      )}
      <View style={styles.fab}>
        <IconButton
          icon="plus"
          iconColor="#fff"
          style={styles.btn}
          onPress={() => navigation.navigate('AddTransaction')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E8577E',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  btn: {
    backgroundColor: '#E8577E',
    borderRadius: 20,
    width: 36,
    height: 36,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
  },
});
