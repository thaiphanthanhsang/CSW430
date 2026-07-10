import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const GAP = 16;
const H_PADDING = 20;
const BUTTON_SIZE = (width - H_PADDING * 2 - GAP * 3) / 4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    displayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 30,
    },
    displayText: {
        fontSize: 56,
        fontWeight: '300',
        color: '#1a1a1a',
    },
    keypad: {
        paddingHorizontal: H_PADDING,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GAP,
    },
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zeroButton: {
        width: BUTTON_SIZE * 2 + GAP,
        borderRadius: BUTTON_SIZE / 2,
        alignItems: 'flex-start',
        paddingLeft: 28,
    },
    operatorButton: {
        backgroundColor: '#fdeade',
    },
    equalButton: {
        backgroundColor: '#f5a623',
    },
    buttonText: {
        fontSize: 26,
        color: '#1a1a1a',
        fontWeight: '400',
    },
    operatorText: {
        color: '#f5a623',
    },
    equalText: {
        color: '#ffffff',
    },
    clearButton: {
        marginHorizontal: H_PADDING,
        marginTop: 4,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearText: {
        fontSize: 18,
        color: '#4a4a4a',
        fontWeight: '500',
    },
});

export default styles;



