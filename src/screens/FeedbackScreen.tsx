import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { storeReport } from '../../util/http';
import { Rating } from 'react-native-ratings';

const FeedbackScreen = ( { route, navigation}: any ) => {
    const [rating, setRating] = useState(0);  // Default rating
    const [issueDescription, setIssueDescription] = useState('');
    
    const submitReport = async () => {
        const reportData = {
            rating: rating,
            description: issueDescription   
        };
    
        try {
            await storeReport(reportData);
            Alert.alert('Feedback Submitted', 'Your feedback has been reported successfully.', [{ text: 'OK' }]);
            setIssueDescription('');
            setRating(3);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            Alert.alert('Error', 'An error occurred while submitting your feedback.', [{ text: 'OK' }]);
        }
    };
    
    return (
        <ScrollView>
            <View style={styles.ratingContainer}>
                <Text style={styles.label}>Rate your experience about this app:</Text>
                <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={30}
                    showRating
                    onFinishRating={setRating}
                    ratingTextColor='orange'
                    tintColor='#f0f0f0'
                />
            </View>
            <Text style={styles.label}>Feedback:</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={setIssueDescription}
                    value={issueDescription}
                    placeholder="Leave your feedback about our app here..."
                    multiline={true}
                    numberOfLines={4}
                />
                <Button title="Submit Feedback" onPress={submitReport} disabled={!issueDescription} />
            </View>
            <View style={styles.feedbackContainer}>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontSize: 16,
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
        borderRadius: 10,
        height: 200,
    },
    ratingContainer: {
        paddingVertical: 0,
    },
    feedbackContainer: {
        padding: 10,
        marginTop: 20,
    },
});


export default FeedbackScreen;
