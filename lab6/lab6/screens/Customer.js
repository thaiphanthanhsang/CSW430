import { View, ActivityIndicator, ScrollView } from 'react-native';
import { Text, IconButton, Appbar, Avatar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import api from '../api';
import { formatPrice } from '../utils';

export default function Customer({ navigation }) {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/customers');
        setCustomer(response.data);
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
          Customer
        </Text>
      </View>
      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#E8577E" />
        </View>
      ) : (
        <ScrollView>
          {customer.map((data) => (
            <View style={styles.containerService}>
              <View>
                <Text>
                  <Text style={styles.title}>Customer:</Text> {data.name}
                </Text>
                <Text>
                  <Text style={styles.title}>Phone:</Text> {data.phone}
                </Text>
                <Text style={styles.price}>
                  <Text style={styles.title}>Total money:</Text>{' '}
                  {formatPrice(data.totalSpent)}
                </Text>
              </View>
              <View>
                <Avatar.Icon
                  size={40}
                  icon="crown"
                  color="#E8577E"
                  style={styles.icon}
                />
                <Text style={styles.text}>Guest</Text>
              </View>
            </View>
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
  icon: {
    backgroundColor: 'none',
    marginRight: 50,
  },
  text: {
    color: '#E8577E',
  },
  price: {
    color: '#E8577E',
  },
  title: {
    color: 'grey',
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
