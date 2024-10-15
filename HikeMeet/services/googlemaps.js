import axios from 'axios';

const apiKey = 'AIzaSyAqkAoPnQoiXechdKGAyT2ba_lvNb1uddw'; // API KEY שלך

export const fetchAttractions = async (location, categoryQuery) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${categoryQuery}+in+${location}&key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
};
