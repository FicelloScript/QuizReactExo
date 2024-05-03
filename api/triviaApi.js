import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';

export const fetchCategories = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api_category.php');
    return response.data.trivia_categories;  // Assurez-vous que la structure de réponse est correcte
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


export const fetchQuestions = async (amount, category, difficulty) => {
  try {
    const params = {
      amount,
      category,
      difficulty,
      type: 'multiple'
    };
    const response = await axios.get(BASE_URL, { params });
    const data = response.data;
    if (data.response_code !== 0) {
      throw new Error('Failed to get questions from the API');
    }
    return data.results;  // 'results' est la propriété contenant les questions
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
};
