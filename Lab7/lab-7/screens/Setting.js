import { Alert } from 'react-native';
import { Button, Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Setting({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            await AsyncStorage.removeItem('token');
          } catch (err) {
            console.error('Lỗi khi đăng xuất:', err);
          } finally {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        },
      },
    ]);
  };
  return (
    <>
      <Appbar.Header style={styles.container} statusBarHeight={0}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Setting" color="white" />
      </Appbar.Header>
      <Button
        style={styles.btn}
        mode="contained"
        onPress={handleLogout}
        loading={loading}
        disabled={loading}>
        Logout
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8577E',
  },
  btn: {
    marginTop: 30,
    padding: 3,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#E8577E',
  },
});
