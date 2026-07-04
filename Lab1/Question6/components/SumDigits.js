import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import styles from '../styles/common.styles';

export default function SumDigits() {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState(null);

    const calculateSum = () => {
        const str = number.trim();
        if (str.length === 0) return;

        const firstDigit = parseInt(str[0], 10);
        const lastDigit = parseInt(str[str.length - 1], 10);

        setResult(firstDigit + lastDigit);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sum of First & Last Digit</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter a number"
                value={number}
                onChangeText={(text) => {
                    setNumber(text);
                    setResult(null);
                }}
            />
            <Button title="Calculate" onPress={calculateSum} />
            {result !== null && <Text style={styles.result}>Result: {result}</Text>}
        </View>
    );
}

