import { DishReport, Allergen } from '../types';

export async function analyzeDish(dishName: string): Promise<DishReport> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const mockData: Record<string, DishReport> = {
    'pad thai': {
      dishName: 'Pad Thai',
      restaurant: 'Thai Street Kitchen',
      allergens: [
        { name: 'Peanuts', severity: 'high', description: 'Contains crushed peanuts as topping' },
        { name: 'Shellfish', severity: 'medium', description: 'Shrimp in sauce' },
        { name: 'Eggs', severity: 'low', description: 'Used in noodle preparation' },
      ],
      safeAllergens: ['Dairy', 'Gluten', 'Soy', 'Tree Nuts'],
      ingredients: [
        'Rice noodles', 'Shrimp', 'Eggs', 'Peanuts', 'Tamarind sauce',
        'Fish sauce', 'Bean sprouts', 'Green onions', 'Lime',
      ],
      riskLevel: 'HIGH',
      isDairyFree: true,
      isGlutenFree: false,
      isNutFree: false,
      isVegan: false,
      isVegetarian: false,
      recommendations: [
        'Request no peanuts if allergic',
        'Ask for vegetarian version without shrimp',
      ],
      scanTime: new Date().toISOString(),
    },
    'burger': {
      dishName: 'Classic Burger',
      restaurant: 'Burger House',
      allergens: [
        { name: 'Gluten', severity: 'high', description: 'Wheat bun' },
        { name: 'Dairy', severity: 'medium', description: 'Cheese and mayo' },
        { name: 'Eggs', severity: 'low', description: 'In bun and sauce' },
      ],
      safeAllergens: ['Nuts', 'Shellfish', 'Soy'],
      ingredients: [
        'Beef patty', 'Wheat bun', 'Cheddar cheese', 'Lettuce',
        'Tomato', 'Onion', 'Pickles', 'Mayo', 'Ketchup',
      ],
      riskLevel: 'MEDIUM',
      isDairyFree: false,
      isGlutenFree: false,
      isNutFree: true,
      isVegan: false,
      isVegetarian: false,
      recommendations: [
        'Request lettuce wrap instead of bun for gluten-free',
        'Ask for no cheese if dairy-free',
      ],
      scanTime: new Date().toISOString(),
    },
  };

  const normalizedName = dishName.toLowerCase().trim();
  
  return mockData[normalizedName] || {
    dishName: dishName,
    restaurant: 'Unknown Restaurant',
    allergens: [
      { name: 'Gluten', severity: 'medium', description: 'May contain wheat' },
    ],
    safeAllergens: ['Nuts', 'Dairy', 'Shellfish'],
    ingredients: ['Unknown ingredients - please verify with staff'],
    riskLevel: 'MEDIUM',
    isDairyFree: false,
    isGlutenFree: false,
    isNutFree: true,
    isVegan: false,
    isVegetarian: false,
    recommendations: ['Please verify ingredients with restaurant staff'],
    scanTime: new Date().toISOString(),
  };
}