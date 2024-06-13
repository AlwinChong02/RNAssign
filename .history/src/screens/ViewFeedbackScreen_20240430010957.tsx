import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { fetchReports } from '../../util/http';
import { Rating } from 'react-native-ratings';
//import { RootStackParamList } from '../Types';
// import type { StackScreenProps } from '@react-navigation/stack';

// export type Props = StackScreenProps<RootStackParamList, 'ViewFeedback'>;

const ViewFeedbackScreen = ({route, navigation}: any) => {
    const [fetchedReports, setFetchedReports] = useState<{ id: string; rating: any; description: any; }[]>([]);
    
    useEffect(() => {
        fetchAllReports();
    }, []);
    
    const fetchAllReports = async () => {
        const reports = await fetchReports();
        setFetchedReports(reports);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Feedback</Text>
            <FlatList
            style={{ height: '80%'}}
                data={fetchedReports}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reportItem}>
                        <Text style={styles.reportText}>{item.description}</Text>
                        <Rating
                            type="star"
                            imageSize={20}
                            readonly
                            startingValue={item.rating}
                            tintColor='white'
                        />
                    </View>
                )}
            />
            <View style={{ top: 20, height: 100 }}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reportItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    reportText: {
        fontSize: 14,
        marginBottom: 3,
    }
});

export default ViewFeedbackScreen;
