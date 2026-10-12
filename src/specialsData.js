import greekSalad from './assets/greek-salad.jpg';
import bruschetta from './assets/bruschetta.jpg';
import lemonDessert from './assets/lemon-dessert.jpg';

const specials = [
  {
    id: 'greek-salad',
    name: 'Greek salad',
    price: '$12.99',
    image: greekSalad,
    description: 'The famous Greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
  },
  {
    id: 'bruschetta',
    name: 'Bruschetta',
    price: '$5.99',
    image: bruschetta,
    description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
  },
  {
    id: 'lemon-dessert',
    name: 'Lemon Dessert',
    price: '$5.00',
    image: lemonDessert,
    description: 'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
  },
];

export default specials;
