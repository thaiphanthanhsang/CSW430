import {
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Text, Button, Appbar } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useState, useEffect } from 'react';
import api from '../../api';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatPrice } from '../../utils';

export default function AddTransaction({ navigation }) {
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [executors, setExecutors] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCustomers = await api.get('/customers');
        setCustomers(
          resCustomers.data.map((item) => ({
            label: `${item.name} - ${item.phone}`,
            value: item._id,
          }))
        );

        const resServices = await api.get('/services');
        setServices(resServices.data);

        const resUsers = await api.get('/users');
        setExecutors(
          resUsers.data.map((user) => ({
            label: user.name || user.fullName || user.username || 'Staff',
            value: user._id,
          }))
        );
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
        Alert.alert('Lỗi', 'Không thể lấy dữ liệu từ hệ thống');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleService = (serviceId) => {
    const updated = { ...selectedServices };
    if (updated[serviceId]) {
      delete updated[serviceId];
    } else {
      updated[serviceId] = { quantity: 1, userId: null };
    }
    setSelectedServices(updated);
  };

  const changeQuantity = (serviceId, amount) => {
    if (!selectedServices[serviceId]) return;
    const currentQty = selectedServices[serviceId].quantity;
    const newQty = currentQty + amount;

    const updated = { ...selectedServices };
    if (newQty <= 0) {
      delete updated[serviceId];
    } else {
      updated[serviceId].quantity = newQty;
    }
    setSelectedServices(updated);
  };

  const changeExecutor = (serviceId, userId) => {
    if (!selectedServices[serviceId]) return;
    const updated = { ...selectedServices };
    updated[serviceId].userId = userId;
    setSelectedServices(updated);
  };

  const calculateTotal = () => {
    let total = 0;
    for (const serviceId in selectedServices) {
      const foundService = services.find((item) => item._id === serviceId);
      if (foundService) {
        total += foundService.price * selectedServices[serviceId].quantity;
      }
    }
    return total;
  };

  const handleAdd = async () => {
    if (!selectedCustomer) {
      Alert.alert('Thông báo', 'Vui lòng chọn customer');
      return;
    }

    const servicesList = Object.entries(selectedServices).map(
      ([serviceId, detail]) => ({
        _id: serviceId,
        quantity: detail.quantity,
        userId: detail.userId,
      })
    );

    if (servicesList.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn ít nhất 1 dịch vụ');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/transactions', {
        customerId: selectedCustomer,
        services: servicesList,
      });

      console.log('Response:', response.data);
      Alert.alert('Thành công', 'Added transaction successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Thêm transaction thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Appbar.Header style={styles.container} statusBarHeight={0}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add transaction" color="white" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#E8577E" />
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.text}>Customer *</Text>

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholder}
              selectedTextStyle={styles.selectedText}
              inputSearchStyle={styles.inputSearch}
              iconStyle={styles.iconStyle}
              data={customers}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select customer"
              searchPlaceholder="Search customer..."
              value={selectedCustomer}
              onChange={(item) => setSelectedCustomer(item.value)}
            />

            <View style={{ marginTop: 15 }}>
              {services.map((item) => {
                const isChecked = !!selectedServices[item._id];
                const currentQty = selectedServices[item._id]?.quantity || 1;
                const currentExecutor =
                  selectedServices[item._id]?.userId || null;

                return (
                  <View key={item._id} style={styles.serviceBox}>
                    <BouncyCheckbox
                      size={22}
                      fillColor="#E5536F"
                      unFillColor="#FFFFFF"
                      text={item.name}
                      iconStyle={{ borderColor: '#E5536F', borderRadius: 11 }}
                      innerIconStyle={{ borderRadius: 11 }}
                      textStyle={styles.checkboxText}
                      disableBuiltInState
                      isChecked={isChecked}
                      onPress={() => toggleService(item._id)}
                    />

                    {isChecked && (
                      <View style={styles.serviceDetails}>
                        <View style={styles.rowControls}>
                          <View style={styles.stepper}>
                            <TouchableOpacity
                              style={styles.stepBtn}
                              onPress={() => changeQuantity(item._id, -1)}>
                              <Text style={styles.stepText}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.qtyText}>{currentQty}</Text>

                            <TouchableOpacity
                              style={styles.stepBtn}
                              onPress={() => changeQuantity(item._id, 1)}>
                              <Text style={styles.stepText}>+</Text>
                            </TouchableOpacity>
                          </View>

                          <Dropdown
                            style={styles.executorDropdown}
                            placeholderStyle={styles.placeholder}
                            selectedTextStyle={styles.selectedText}
                            data={executors}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder="Executor"
                            value={currentExecutor}
                            onChange={(e) => changeExecutor(item._id, e.value)}
                          />
                        </View>

                        <Text style={styles.priceLabel}>
                          Price:{' '}
                          <Text style={styles.priceValue}>
                            {formatPrice(item.price)}
                          </Text>
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}>
        <Button
          mode="contained"
          onPress={handleAdd}
          style={styles.btn}
          buttonColor="#E8577E"
          disabled={loading}>
          {`See summary: (${formatPrice(calculateTotal())})`}
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8577E',
  },
  content: {
    paddingBottom: 110,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 55,
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  placeholder: {
    color: '#999',
    fontSize: 14,
  },
  selectedText: {
    color: '#333',
    fontSize: 14,
  },
  inputSearch: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  btn: {
    borderRadius: 10,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  serviceBox: {
    marginBottom: 16,
  },
  checkboxText: {
    fontSize: 15,
    color: '#333',
    textDecorationLine: 'none',
  },
  serviceDetails: {
    marginLeft: 32,
    marginTop: 8,
  },
  rowControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 12,
  },
  stepBtn: {
    width: 38,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 16,
    color: '#555',
  },
  qtyText: {
    width: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  executorDropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 36,
    backgroundColor: '#FFF',
  },
  priceLabel: {
    fontSize: 13,
    color: '#333',
  },
  priceValue: {
    color: '#E5536F',
    fontWeight: 'bold',
  },
});
