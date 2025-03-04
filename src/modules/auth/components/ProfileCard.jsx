import { StyleSheet } from 'react-native'
import React from 'react'
import { Card, Text} from 'react-native-paper'

export default function ProfileCard({title, value}) {
  return (
    <Card style={styles.card}>
        <Card.Title title={title}/>
        <Card.Content>
            <Text variant='bodyMedium'>{value}</Text>
        </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
    card: {
        width: "90%",
        marginBottom: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 14,
        color: 'black',
    },
})