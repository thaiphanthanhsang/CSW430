import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import styles from '../styles/common.styles';

export default function MinOfThree() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');
    const [min, setMin] = useState(null);

    const findMin = () => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        const c = parseFloat(num3);

        if (isNaN(a) || isNaN(b) || isNaN(c)) return;

        setMin(Math.min(a, b, c));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find Minimum of Three Numbers</Text>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Number 1"
                value={num1}
                onChangeText={setNum1}
            />
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Number 2"
                value={num2}
                onChangeText={setNum2}
            />
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Number 3"
                value={num3}
                onChangeText={setNum3}
            />

            <Button title="Find Minimum" onPress={findMin} />

            {min !== null && <Text style={styles.result}>Minimum: {min}</Text>}
        </View>
    );
}
