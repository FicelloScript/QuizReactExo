import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchCategories } from '../api/triviaApi';

function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [difficulty, setDifficulty] = useState('easy');
  const anim = useRef(new Animated.Value(0)).current; // Référence pour la valeur animée


  useEffect(() => {
    fetchCategories().then(categories => {
      setCategories(categories);
      if (categories.length > 0) {
        setSelectedCategory(categories[0].id); // Sélectionnez par défaut la première catégorie chargée
      }
    });

        const startVibration = () => {
      const vibration = Animated.sequence([
        Animated.timing(anim, { toValue: 10, duration: 250, useNativeDriver: true }), // 1ère partie de l'animation
        Animated.timing(anim, { toValue: -10, duration: 500, useNativeDriver: true }), // 2ème partie de l'animation
        Animated.timing(anim, { toValue: 10, duration: 500, useNativeDriver: true }), // 3ème partie de l'animation
        Animated.timing(anim, { toValue: 0, duration: 250, useNativeDriver: true }) // Retour à la position initiale
      ]);

      vibration.start(() => {
        setTimeout(startVibration, 5000);  // Délai de 5 secondes avant de recommencer
      });
    };

    startVibration(); // Lancez la vibration initiale

    return () => {
      anim.setValue(0); // Réinitialiser la valeur de l'animation
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Text style={[styles.title, { transform: [{ translateX: anim }] }]}>
        QuizUp
      </Animated.Text>
  
      <View style={styles.section}>
        <Text style={styles.label}>Choisissez une catégorie:</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
        >
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Choisissez la difficulté:</Text>
        <Picker
          selectedValue={difficulty}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
        >
          <Picker.Item label="Facile" value="easy" />
          <Picker.Item label="Moyen" value="medium" />
          <Picker.Item label="Difficile" value="hard" />
        </Picker>
      </View>
      <Button
        title="Commencer le quiz"
        onPress={() => navigation.navigate('Quiz', { difficulty, category: selectedCategory })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1, // Assurez-vous que le conteneur peut grandir pour prendre tout l'espace disponible
    backgroundColor: '#E3BAC6'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 80,
    textAlign: 'center',
    color: '#333'
  },
  scrollView: {
    backgroundColor: '#E3BAC6',
    flex: 1
  },
  section: {
    marginBottom: 100
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333'
  },
  picker: {
    width: 300,
    height: 44,
    backgroundColor: '#fff',
    marginBottom: 20
  }
});

export default HomeScreen;
