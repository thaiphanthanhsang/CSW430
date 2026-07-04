import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import styles from '../styles/common.styles';

export default function EmployeeForm({ title }) {
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [occupation, setOccupation] = useState('');

    const handleUpdate = () => {
        Alert.alert('Success', 'Employee information updated successfully!');
    };

    return (
        <View style={styles.container}>
            <Text>{title}</Text>
            <Text>Full Name:</Text>
            <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
            />

            <Text>Age:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />

            <Text>Occupation:</Text>
            <TextInput
                style={styles.input}
                value={occupation}
                onChangeText={setOccupation}
            />

            <Button title="Update" onPress={handleUpdate} />
        </View>
    )
}