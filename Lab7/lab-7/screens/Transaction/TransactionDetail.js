import {
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { formatPrice, formatDate } from '../../utils';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useState } from 'react';
import api from '../../api';

export default function TransactionDetail({ route, navigation }) {
  const { transaction } = route.params || {};
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to cancel this transaction? This will affect the customer transaction information',
      [
        {
          text: 'YES',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const transactionId = transaction._id || transaction.id;
              await api.delete(`/transactions/${transactionId}`);

              Alert.alert('Thành công', 'Huỷ thành công!');
              navigation.goBack();
            } catch (error) {
              console.error('Lỗi khi huỷ:', error);
              Alert.alert('Lỗi', 'Huỷ thất bại. Vui lòng thử lại.');
            } finally {
              setLoading(false);
            }
          },
        },
        {
          text: 'CANCEL',
          style: 'cancel',
        },
      ]
    );
  };

  if (!transaction) {
    return (
      <View style={styles.centerBox}>
        <Text>Không tìm thấy thông tin giao dịch</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Appbar.Header style={styles.container} statusBarHeight={0}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Transaction detail" color="white" />
        <Menu>
          <MenuTrigger>
            <Appbar.Action icon="dots-vertical" color="white" />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionsContainer: styles.customMenu }}>
            <MenuOption text="See more detail" />
            <MenuOption onSelect={handleCancel}>
              <Text style={{ color: 'red', padding: 5 }}>
                Cancel transaction
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Thông tin chung */}
        <View style={styles.detailContainer}>
          <Text style={styles.title}>General information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Transaction code</Text>
            <Text style={styles.value}>
              {transaction._id || transaction.id}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Customer</Text>
            <Text style={styles.value}>
              {transaction.customer?.name || 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Creation time</Text>
            <Text style={styles.value}>
              {formatDate(transaction.createdAt)}
            </Text>
          </View>
        </View>

        {/* Danh sách dịch vụ */}
        <View style={styles.detailContainer}>
          <Text style={styles.title}>Service list</Text>
          {transaction.services?.map((item, index) => (
            <View key={item._id || item.id || index} style={styles.infoRow}>
              <Text style={[styles.label, { flex: 1 }]}>{item.name}</Text>
              <Text style={[styles.label, { marginRight: 15 }]}>
                x {item.quantity}
              </Text>
              <Text style={styles.value}>{formatPrice(item.price)}</Text>
            </View>
          ))}
          <View style={styles.hyphen} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.value}>
              {formatPrice(
                transaction.priceBeforePromotion || transaction.price
              )}
            </Text>
          </View>
        </View>

        {/* Chi phí */}
        <View style={styles.detailContainer}>
          <Text style={styles.title}>Cost</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Amount of money</Text>
            <Text style={styles.value}>
              {formatPrice(
                transaction.priceBeforePromotion || transaction.price
              )}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Discount</Text>
            <Text style={styles.value}>
              {formatPrice(
                (transaction.priceBeforePromotion || transaction.price) -
                  transaction.price
              )}
            </Text>
          </View>
          <View style={styles.hyphen} />
          <View style={styles.infoRow}>
            <Text style={styles.value}>Total payment</Text>
            <Text style={styles.title}>{formatPrice(transaction.price)}</Text>
          </View>
        </View>
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#E8577E" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8577E',
  },
  hyphen: {
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical: 10,
  },
  detailContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontWeight: 'normal',
    color: '#555',
    fontSize: 15,
  },
  value: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },
  title: {
    fontWeight: 'bold',
    color: '#E8577E',
    fontSize: 16,
    marginBottom: 8,
  },
  customMenu: {
    padding: 6,
    borderRadius: 8,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
