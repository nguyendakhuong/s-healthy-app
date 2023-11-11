import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native'

const InputCustom = ({
    label,
    err,
    icon,
    iconErr,
    secureTextEntry,
    validate,
    name,
    placeholder,
    onChange = () => { },
    styleErr,
    value,
    iconUnhidePass,
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isChecked, setIsChecked] = useState(secureTextEntry)
    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.InputCustom}>
                <View style={styles.input}>
                    <Image style={styles.icon} source={icon} />
                    <TextInput
                        autoFocus={true}
                        style={[
                            styles.TextInput,
                            isFocused && styles.inputFocused,
                            styleErr && styles.inputError,
                        ]}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        secureTextEntry={isChecked}
                        name={name}
                        validate={validate}
                        onChangeText={(value) => {
                            onChange(value, validate, name),
                                setInputValue(value)
                        }}
                        placeholder={placeholder}
                        value={value}
                    />
                    <Text
                        style={[
                            styles.label,
                            inputValue && styles.labelWithValue,
                            isFocused && styles.textFocused,
                            styleErr && styles.labelError,
                        ]}
                    >
                        {label}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.iconErr}
                    onPress={() =>
                        isChecked ? setIsChecked(false) : setIsChecked(true)
                    }
                >
                    <Image
                        style={styles.iconErr}
                        source={isChecked ? iconErr : iconUnhidePass}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.error}>{err}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    InputCustom: {
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'flex-end',
        position: 'relative',
    },
    TextInput: {
        width: 331,
        height: 56,
        borderWidth: 1,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 10,
    },
    error: {
        color: '#FF0000',
        marginLeft: 10,
    },
    input: {
        display: 'flex',
        justifyContent: 'center',
    },
    label: {
        position: 'absolute',
        left: 40,
        zIndex: -2,
    },
    labelWithValue: {
        top: -10,
        fontSize: 14,
        // color: '#00f',
        backgroundColor: '#FFF',
        paddingRight: 5,
        paddingLeft: 5,
        fontWeight: '500',
        zIndex: 2,
        // opacity: 0.4,
    },
    icon: {
        width: 20,
        height: 20,
        position: 'absolute',
        margin: 10,
    },
    iconErr: {
        width: 22,
        height: 22,
        position: 'absolute',
        right: 10,
    },
    inputFocused: {
        borderColor: '#00f',
    },
    textFocused: {
        color: '#00f',
    },
    inputError: {
        borderColor: '#FF0000',
    },
    labelError: {
        color: '#FF0000',
    },
})

export default InputCustom
