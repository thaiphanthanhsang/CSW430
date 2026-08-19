import { View, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import api from '../../api';
import { formatPrice } from '../../utils';
import TransactionList from '../Transaction/TransactionList';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function CustomerDetail({ route, navigation }) {
  const { customer } = route.params;

  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);

  const handleEdit = () => {
    navigation.navigate('EditCustomer', { customer });
  };

  const handleDelete = () => {
    Alert.alert('Xóa khách hàng', `Bạn có chắc muốn xóa "${customer.name}"?`, [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);

          try {
            await api.delete(`/Customers/${customer._id}`);

            Alert.alert('Xóa khách hàng thành công!');
            navigation.navigate('Customer');
          } catch (error) {
            console.error('Lỗi khi xóa khách hàng:', error);
            Alert.alert('Xóa thất bại. Vui lòng thử lại.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/Customers/${customer._id}`);

        setTransaction(response.data.transactions || []);
      } catch (err) {
        console.error('Lỗi khi lấy transaction:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [customer._id]);

  return (
    <>
      <Appbar.Header style={styles.container} statusBarHeight={0}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />

        <Appbar.Content title="Customer Detail" color="white" />

        <Menu>
          <MenuTrigger>
            <Appbar.Action icon="dots-vertical" color="white" />
          </MenuTrigger>

          <MenuOptions style={styles.custom}>
            <MenuOption onSelect={handleEdit} text="Edit Customer" />

            <MenuOption onSelect={handleDelete}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </Appbar.Header>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#E8577E" />
        </View>
      ) : (
        <ScrollView>
          <View>
            <View style={styles.containerValue}>
              <Text style={styles.title}>General information</Text>

              <Text style={styles.value}>
                <Text>Name: </Text>
                {customer.name}
              </Text>

              <Text style={styles.value}>
                <Text>Phone: </Text>
                {customer.phone}
              </Text>

              <Text style={styles.value}>
                <Text>Total spent: </Text>
                {formatPrice(customer.totalSpent)}
              </Text>

              <Text style={styles.value}>
                <Text>Time: </Text>
                {customer.createdBy}
              </Text>

              <Text style={styles.value}>
                <Text>Last update: </Text>
                {customer.updatedBy}
              </Text>
            </View>

            <View style={styles.containerValue}>
              <Text style={styles.title}>Transaction history</Text>
              <TransactionList
                navigation={navigation}
                transactions={transaction}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8577E',
  },
  containerValue: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  custom: {
    padding: 10,
  },
  value: {
    fontWeight: 'normal',
    color: '#555',
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#E8577E',
    fontSize: 16,
  },
});
