import { View, Alert } from 'react-native';
import { Text, Button, Appbar, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import api from '../api';

export default function AddPage({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    if (!name || !price) {
      Alert.alert('Vui lòng nhập đầy đủ tên dịch vụ và giá.');
      return;
    }
    setLoading(true);
    api
      .post('/services', {
        name,
        price: Number(price),
      })
      .then((response) => {
        console.log('Response:', response.data);
        Alert.alert('Added service successfully!');
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Appbar.Header style={styles.container} statusBarHeight={0}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Service" color="white" />
      </Appbar.Header>
      <View>
        <Text style={styles.text}>Service name *</Text>
        <TextInput
          label="name"
          placeholder="Input a service name"
          value={name}
          onChangeText={setName}
          style={styles.box}
        />
        <Text style={styles.text}>Price *</Text>
        <TextInput
          label="price"
          placeholder="Input a price"
          value={price}
          onChangeText={setPrice}
          style={styles.box}
        />
        <Button
          style={styles.btn}
          mode="contained"
          onPress={handleAdd}
          loading={loading}
          disabled={loading}>
          Add
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
    backgroundColor: '##f2f2f2',
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
