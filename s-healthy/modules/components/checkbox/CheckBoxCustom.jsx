import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Checkbox = ({ label, onChange }) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = () => {
        const newValue = !checked;
        setChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleToggle}>
            <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
            <Text>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 10,
    },
    checkboxChecked: {
        backgroundColor: '#c89595',
    },
});

export default Checkbox;