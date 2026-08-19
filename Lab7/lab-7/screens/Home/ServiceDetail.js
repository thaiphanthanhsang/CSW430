import { View, Alert, ActivityIndicator } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import api from '../../api';
import { formatPrice, formatDate } from '../../utils';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function ServiceDetail({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const { service } = route.params;

  const handleEdit = () => {
    navigation.navigate('EditService', { service });
  };

  const handleDelete = () => {
    Alert.alert('Xóa dịch vụ', `Bạn có chắc muốn xóa "${service.name}"?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            await api.delete(`/services/${service._id}`);
            Alert.alert('Xóa dịch vụ thành công!');
            navigation.navigate('Home');
          } catch (error) {
            console.error('Lỗi khi xóa dịch vụ:', error);
            Alert.alert('Xóa thất bại. Vui lòng thử lại.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };
  return (
    <>
      <Appbar.Header style={styles.container} statusBarHeight={0}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Service Detail" color="white" />
        <Menu>
          <MenuTrigger>
            <Appbar.Action icon="dots-vertical" color="white" />
          </MenuTrigger>
          <MenuOptions style={styles.custom}>
            <MenuOption onSelect={handleEdit} text="Edit Service" />
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
        <View style={styles.detailContainer}>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>Service name: </Text>
            <Text style={styles.value}>{service.name}</Text>
          </Text>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>Price: </Text>
            <Text style={styles.value}>{formatPrice(service.price)}</Text>
          </Text>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>Creator ID: </Text>
            <Text style={styles.value}>{service.createdBy}</Text>
          </Text>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>Time: </Text>
            <Text style={styles.value}>{formatDate(service.createdAt)}</Text>
          </Text>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>Final update: </Text>
            <Text style={styles.value}>{formatDate(service.updatedAt)}</Text>
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8577E',
  },
  custom: {
    padding: 10,
  },
  detailContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  infoRow: {
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 12,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  value: {
    fontWeight: 'normal',
    color: '#555',
    fontSize: 16,
  },
});
