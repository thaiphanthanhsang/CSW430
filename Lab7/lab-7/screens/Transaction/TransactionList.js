import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { formatPrice, formatDate } from '../../utils';

export default function TransactionList({ navigation, transactions = [] }) {
  console.log('TRANSACTIONS:', transactions);

  return (
    <ScrollView>
      {transactions.map((data) => (
        <TouchableOpacity
          key={data._id}
          style={styles.containerService}
          onPress={() =>
            navigation.navigate('TransactionDetail', {
              transaction: data,
            })
          }>
          <View style={{ flex: 1 }}>
            <Text style={styles.row1}>
              {data.id} - {formatDate(data.createdAt)}
            </Text>

            {data.services?.map((item) => (
              <Text key={item._id}>- {item.name}</Text>
            ))}

            <Text>Customer: {data.customer?.name}</Text>
          </View>

          <Text style={styles.price}>{formatPrice(data.price)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerService: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 10,
  },

  row1: {
    fontWeight: 'bold',
  },

  price: {
    fontWeight: 'bold',
    color: '#E8577E',
  },
});
