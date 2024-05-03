import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function ResultScreen({ route, navigation }) {
  const { score, total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Votre score est {score} sur {total}</Text>
      <Button
        title="Recommencer le Quiz"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3BAC6',
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
  }
});

export default ResultScreen;
