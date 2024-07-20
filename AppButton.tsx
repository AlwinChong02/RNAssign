import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
}

const AppButton: React.FC<Props> = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#1E90FF",
        height: 50,
        width: 150,
        borderColor: "gray",
        borderRadius: 200,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default AppButton;
