import {
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import api from '../api';
import { formatPrice, formatDate } from '../utils';

export default function Transaction({ navigation }) {
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
            letterSpacing: 0.5,
          }}>
          Transaction
        </Text>
      </View>
      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#E8577E" />
        </View>
      ) : (
        <ScrollView>
          {transaction.map((data) => (
            <TouchableOpacity
              key={data.id}
              style={styles.containerService}
              onPress={() =>
                navigation.navigate('TransactionDetail', { transaction: data })
              }>
              <View>
                <Text style={styles.row1}>
                  {data.id} - {formatDate(data.createdAt)}
                </Text>
                {data.services.map((item) => (
                  <Text key={item.id}>- {item.name}</Text>
                ))}
                <Text>
                  <Text>Customer: </Text>
                  {data.customer.name}
                </Text>
              </View>
              <View>
                <Text style={styles.price}>{formatPrice(data.price)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <View style={styles.fab}>
        <IconButton
          icon="plus"
          iconColor="#fff"
          style={styles.btn}
          onPress={() => navigation.navigate('AddCustomer')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerService: {
    marginHorizontal: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#E8577E',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  row1: {
    fontWeight: 'bold',
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
