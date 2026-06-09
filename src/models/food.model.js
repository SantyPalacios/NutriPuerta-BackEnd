const foods = [
  {
    id: 'food-123',
    name: 'Avena',
    category: 'Cereales',
    serving_size_g: 50,
    calories: 190,
    protein_g: 6,
    carbs_g: 32,
    fat_g: 4,
    fiber_g: 5,
    description_myth: 'La avena no engorda si se consume en porciones controladas.',
  },
  {
    id: 'food-456',
    name: 'Pollo a la plancha',
    category: 'Proteínas',
    serving_size_g: 100,
    calories: 165,
    protein_g: 31,
    carbs_g: 0,
    fat_g: 4,
    fiber_g: 0,
    description_myth: 'El pollo blanco es siempre la mejor opción para bajar de peso.',
  },
  {
    id: 'food-789',
    name: 'Brócoli',
    category: 'Verduras',
    serving_size_g: 100,
    calories: 34,
    protein_g: 3,
    carbs_g: 7,
    fat_g: 0.4,
    fiber_g: 2.6,
    description_myth: 'El brócoli quema grasa por sí mismo.',
  },
];

const generateFoodId = () => `food-${Date.now()}`;

export const FoodModel = {
  findAll: async () => {
    return [...foods];
  },

  findById: async (id) => {
    return foods.find((food) => food.id === id) || null;
  },

  create: async (data) => {
    const newFood = {
      id: generateFoodId(),
      name: data.name || '',
      category: data.category || '',
      serving_size_g: data.serving_size_g || 0,
      calories: data.calories || 0,
      protein_g: data.protein_g || 0,
      carbs_g: data.carbs_g || 0,
      fat_g: data.fat_g || 0,
      fiber_g: data.fiber_g || 0,
      description_myth: data.description_myth || '',
    };

    foods.push(newFood);
    return newFood;
  },

  update: async (id, data) => {
    const index = foods.findIndex((food) => food.id === id);
    if (index === -1) return null;

    const existing = foods[index];
    const updatedFood = {
      ...existing,
      name: data.name ?? existing.name,
      category: data.category ?? existing.category,
      serving_size_g: data.serving_size_g ?? existing.serving_size_g,
      calories: data.calories ?? existing.calories,
      protein_g: data.protein_g ?? existing.protein_g,
      carbs_g: data.carbs_g ?? existing.carbs_g,
      fat_g: data.fat_g ?? existing.fat_g,
      fiber_g: data.fiber_g ?? existing.fiber_g,
      description_myth: data.description_myth ?? existing.description_myth,
    };

    foods[index] = updatedFood;
    return updatedFood;
  },

  remove: async (id) => {
    const index = foods.findIndex((food) => food.id === id);
    if (index === -1) return false;

    foods.splice(index, 1);
    return true;
  },
};
