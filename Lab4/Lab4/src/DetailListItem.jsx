import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

const DetailListItem = ({ icon, title, subtitle }) => {
    return (
        <View style={styles.container}>
            <Icon name={icon} size={20} color="#666666" style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

DetailListItem.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

DetailListItem.defaultProps = {
    icon: 'info',
    title: '',
    subtitle: '',
};

export default DetailListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    icon: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 12,
        color: '#999999',
    },
    subtitle: {
        fontSize: 16,
        color: '#000000',
        marginTop: 2,
    },
});
