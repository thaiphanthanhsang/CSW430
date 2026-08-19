import { View, ActivityIndicator, Pressable } from 'react-native';
import { Avatar, Text, IconButton } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatPrice } from '../../utils';

export default function Home({ navigation }) {
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) setUser(JSON.parse(userData));

        const response = await api.get('/services');
        setServices(response.data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{user?.name?.toUpperCase() || 'KHÁCH'}</Text>
        <Pressable>
          <Avatar.Icon
            size={24}
            icon="account"
            color="#E8577E"
            style={styles.icon}
          />
        </Pressable>
      </View>
      <View style={styles.containerList}>
        <Text>Danh sách dịch vụ</Text>
        <IconButton
          icon="plus"
          iconColor="#fff"
          style={styles.btn}
          onPress={() => navigation.navigate('AddPage')}
        />
      </View>
      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#E8577E" />
        </View>
      ) : (
        <ScrollView>
          {services.map((data) => (
            <Pressable
              key={data.id}
              style={styles.containerService}
              onPress={() =>
                navigation.navigate('ServiceDetail', { service: data })
              }>
              <Text>{data.name}</Text>
              <Text>{formatPrice(data.price)}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerService: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#111',
    borderWidth: 1,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#E8577E',
    borderRadius: 20,
    width: 36,
    height: 36,
  },
  containerList: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#E8577E',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  icon: {
    backgroundColor: '#fff',
    color: '#fff',
  },
});
