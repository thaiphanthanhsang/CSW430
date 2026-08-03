import { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [phone, setPhone] = useState('0373007856');
  const [password, setPassword] = useState('123');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!phone || !password)
      return 'Vui lòng nhập đầy đủ số điện thoại và mật khẩu.';
    setLoading(true);
    api
      .post('/auth', {
        phone,
        password,
      })
      .then(async (response) => {
        console.log('Login success', response.data);
        Alert.alert('Login success');
        await AsyncStorage.setItem('token', response.data.token);
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error("'Lỗi đăng nhập: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Login
      </Text>

      <TextInput
        style={styles.box}
        mode="outlined"
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        autoCapitalize="none"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.box}
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secure}
        right={
          <TextInput.Icon
            icon={secure ? 'eye-off' : 'eye'}
            onPress={() => setSecure(!secure)}
          />
        }
      />

      <Button
        style={styles.btn}
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 50,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E8577E',
    textAlign: 'center',
    marginBottom: 40,
  },
  box: {
    borderRadius: 12,
  },
  btn: {
    marginTop: 50,
    padding: 3,
    borderRadius: 15,
    backgroundColor: '#E8577E',
  },
});
