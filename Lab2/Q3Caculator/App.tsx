import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

type Operator = '+' | '-' | '*' | '/';
type ButtonType = 'number' | 'operator' | 'equal';

export default function App(): React.JSX.Element {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [operator, setOperator] = useState<Operator | null>(null);
  const [firstValue, setFirstValue] = useState<string>('');

  // Function to handle number inputs
  const handleNumberInput = (num: number): void => {
    if (displayValue === '0') {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  // Function to handle operator inputs
  const handleOperatorInput = (op: Operator): void => {
    setOperator(op);
    setFirstValue(displayValue);
    setDisplayValue('0');
  };

  // Function to handle equal button press
  const handleEqual = (): void => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);
    let result: number | string = num2;

    if (operator === '+') {
      result = num1 + num2;
    } else if (operator === '-') {
      result = num1 - num2;
    } else if (operator === '*') {
      result = num1 * num2;
    } else if (operator === '/') {
      result = num2 !== 0 ? num1 / num2 : 'Error';
    }

    setDisplayValue(result.toString());
    setOperator(null);
    setFirstValue('');
  };

  // Function to handle clear button press
  const handleClear = (): void => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  };

  const renderButton = (
    label: string,
    onPress: () => void,
    type: ButtonType = 'number',
  ): React.JSX.Element => (
    <TouchableOpacity
      key={label}
      style={[
        styles.button,
        type === 'operator' && styles.operatorButton,
        type === 'equal' && styles.equalButton,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.buttonText,
          type === 'operator' && styles.operatorText,
          type === 'equal' && styles.equalText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>

      {/* Keypad */}
      <View style={styles.keypad}>
        <View style={styles.row}>
          {renderButton('7', () => handleNumberInput(7))}
          {renderButton('8', () => handleNumberInput(8))}
          {renderButton('9', () => handleNumberInput(9))}
          {renderButton('÷', () => handleOperatorInput('/'), 'operator')}
        </View>

        <View style={styles.row}>
          {renderButton('4', () => handleNumberInput(4))}
          {renderButton('5', () => handleNumberInput(5))}
          {renderButton('6', () => handleNumberInput(6))}
          {renderButton('×', () => handleOperatorInput('*'), 'operator')}
        </View>

        <View style={styles.row}>
          {renderButton('1', () => handleNumberInput(1))}
          {renderButton('2', () => handleNumberInput(2))}
          {renderButton('3', () => handleNumberInput(3))}
          {renderButton('−', () => handleOperatorInput('-'), 'operator')}
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.zeroButton]}
            onPress={() => handleNumberInput(0)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          {renderButton('+', () => handleOperatorInput('+'), 'operator')}
          {renderButton('=', handleEqual, 'equal')}
        </View>
      </View>

      {/* Clear button */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClear}
        activeOpacity={0.7}
      >
        <Text style={styles.clearText}>C</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
