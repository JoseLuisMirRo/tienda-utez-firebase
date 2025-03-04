import { StyleSheet, Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'
import React from 'react'

export default function ProductCard({ item }) {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.imageURL }} />
      <Card.Content>
        <Text variant="titleMedium">{item.name}</Text>
        <Text variant="bodyMedium">${item.price}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained">Comprar</Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        backgroundColor: "white",
      },
})