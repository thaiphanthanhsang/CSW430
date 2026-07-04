import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, StyleSheet } from 'react-native';
import EmployeeForm from './components/EmployeeForm';
import SumDigits from './components/SumDigits';
import MinOfThree from './components/MinOfThree';
import Hailstone from './components/Hailstone';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <EmployeeForm title="Employee Information Entry" />
      <View style={styles.divider} />
      <SumDigits />
      <View style={styles.divider} />
      <MinOfThree />
      <View style={styles.divider} />
      <Hailstone />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc'
  },
});
