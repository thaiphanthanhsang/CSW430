import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
    },
    result: { marginTop: 10, fontSize: 16, fontWeight: '600' },
    resultBox: { marginTop: 15, maxHeight: 200 },
    steps: { marginTop: 10, fontWeight: '600' },
});