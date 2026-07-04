import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import styles from '../styles/common.styles';

export default function Hailstone() {
    const [inputNumber, setInputNumber] = useState('');
    const [sequence, setSequence] = useState([]);

    const generateSequence = () => {
        let n = parseInt(inputNumber, 10);
        if (isNaN(n) || n <= 0) return;

        const seq = [n];
        while (n !== 1) {
            n = n % 2 === 0 ? n / 2 : n * 3 + 1;
            seq.push(n);
        }

        setSequence(seq);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hailstone Sequence</Text>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter a positive number"
                value={inputNumber}
                onChangeText={setInputNumber}
            />

            <Button title="Generate" onPress={generateSequence} />

            <ScrollView style={styles.resultBox}>
                <Text style={styles.result}>{sequence.join(' → ')}</Text>
                {sequence.length > 0 && (
                    <Text style={styles.steps}>Steps: {sequence.length - 1}</Text>
                )}
            </ScrollView>
        </View>
    );
}
