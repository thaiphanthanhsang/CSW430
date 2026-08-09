import { View, ActivityIndicator } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { formatPrice, formatDate } from '../utils';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function TransactionDetail({ route, navigation }) {
  const { transaction } = route.params;

  return (
    <>
      <Appbar.Header style={styles.container} statusBarHeight={0}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Transaction detail" color="white" />
        <Menu>
          <MenuTrigger>
            <Appbar.Action icon="dots-vertical" color="white" />
          </MenuTrigger>
          <MenuOptions style={styles.custom}>
            <MenuOption text="Edit Transaction" />
            <MenuOption>
              <Text style={{ color: 'red' }}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </Appbar.Header>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Generation information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Transaction code</Text>
          <Text style={styles.value}>{transaction.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Customer</Text>
          <Text style={styles.value}>{transaction.customer.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Creation time</Text>
          <Text style={styles.value}>{formatDate(transaction.createdAt)}</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Service list</Text>
        {transaction.services.map((item) => (
          <View key={item.id} style={styles.infoRow}>
            <Text style={styles.label}>{item.name}</Text>
            <Text style={styles.label}>x {item.quantity}</Text>
            <Text style={styles.value}>{formatPrice(item.price)}</Text>
          </View>
        ))}
        <View style={styles.hyphen}></View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>
            {formatPrice(transaction.priceBeforePromotion)}
          </Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Cost</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Amount of money</Text>
          <Text style={styles.value}>
            {formatPrice(transaction.priceBeforePromotion)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Discount</Text>
          <Text style={styles.value}>
            {formatPrice(transaction.price - transaction.priceBeforePromotion)}
          </Text>
        </View>
        <View style={styles.hyphen}></View>
        <View style={styles.infoRow}>
          <Text style={styles.value}>Total payment</Text>
          <Text style={styles.title}>{formatPrice(transaction.price)}</Text>
        </View>
      </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  hyphen: {
    borderTopWidth: 1,
    borderColor: '#777',
    marginTop: 5,
    marginVertical: 5,
  },
  detailContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {
    fontWeight: 'normal',
    color: '#555',
    fontSize: 16,
  },
  value: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#E8577E',
    fontSize: 18,
  },
  container: {
    backgroundColor: '#E8577E',
  },
});
