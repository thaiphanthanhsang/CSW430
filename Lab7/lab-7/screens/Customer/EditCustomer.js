import { View, Alert } from 'react-native';
import { Text, Button, Appbar, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import api from '../../api';

export default function EditCustomer({ navigation, route }) {
  const { customer } = route.params;
  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState(customer.phone);
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    if (!name || !phone) {
      Alert.alert('Vui lòng nhập đầy đủ tên và số điện thoại.');
      return;
    }
    setLoading(true);
    api
      .put(`/Customers/${customer._id}`, {
        name,
        phone,
      })
      .then((response) => {
        console.log('Response:', response.data);
        Alert.alert('Cập nhật customer thành công!');
        navigation.navigate('Customer');
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Cập nhật thất bại. Vui lòng thử lại.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Appbar.Header style={styles.container} statusBarHeight={0}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Customer" color="white" />
      </Appbar.Header>
      <View>
        <Text style={styles.text}>Customer name *</Text>
        <TextInput
          label="name"
          placeholder="Input a customer name"
          value={name}
          onChangeText={setName}
          style={styles.box}
        />
        <Text style={styles.text}>Phone *</Text>
        <TextInput
          label="phone"
          placeholder="Input phone number"
          value={phone}
          onChangeText={setPhone}
          style={styles.box}
        />
        <Button
          style={styles.btn}
          mode="contained"
          onPress={handleUpdate}
          loading={loading}
          disabled={loading}>
          Update
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8577E',
  },
  box: {
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    marginHorizontal: 20,
  },
  text: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  btn: {
    marginTop: 30,
    padding: 3,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#E8577E',
  },
});
