import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchQuestions } from '../api/triviaApi'; // Assurez-vous que ce chemin est correct

function QuizScreen({ route, navigation }) {
  const { difficulty, category } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions(10, category, difficulty)
      .then(data => {
        const newQuestions = data.map(question => ({
          ...question,
          answers: shuffleArray([question.correct_answer, ...question.incorrect_answers]),
        }));
        setQuestions(newQuestions);
      })
      .catch(error => {
        console.error("Failed to load questions: ", error);
        alert("Failed to load questions, please check your network and try again.");
      });
  }, [category, difficulty]);
  

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswer = (selectedAnswer) => { 
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      navigation.navigate('Result', { score, total: questions.length });
    }
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 ? (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {questions[currentQuestionIndex].question}
          </Text>
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <TouchableOpacity key={index} style={styles.answerButton} onPress={() => handleAnswer(answer)}>
              <Text style={styles.answerText}>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text>Chargement des questions...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#E3BAC6',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
  },
  answerText: {
    fontSize: 16,
  }
});

export default QuizScreen;
