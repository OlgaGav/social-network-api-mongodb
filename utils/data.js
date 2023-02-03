const username = [
  'Dexter',
  'Stanley',
  'Louise',
  'Susan',
  'Rohonda',
  'Alexander',
  'Daniel',
  'Jose',
  'Steve',
  'Linda',
  'Paul',
  'Angela',
  'Johnson',
  'Vaca',
  'Farr',
  'Randall',
  'Smith',
  'Brown',
  'Smirnoff',
  'Wright',
  'Oliphant',
  'May',
  'Berry',
  'Robinson',
  'Lewis',
];

const thoughts = [
  'Programming is the process of creating instructions that a computer can execute.',
  'The key to becoming a good programmer is practice and perseverance.',
  'Learning to code can open up a world of opportunities for career advancement.',
  'Understanding data structures and algorithms is essential for efficient programming.',
  'Debugging is an important skill for any programmer to master.',
  'Collaboration and communication are crucial in software development teams.',
  'The ability to think logically and solve problems is crucial for success in programming.',
  'Object-oriented programming is a popular programming paradigm that organizes code into reusable objects.',
  'Good code documentation helps others understand and maintain your code.',
  'Continuously learning and staying up-to-date with the latest technologies is important for a programmer.',
  'Test-driven development is a powerful technique for ensuring code quality.',
  'Learning a variety of programming languages can broaden your skillset and make you more versatile as a programmer.',
  'Agile development methodologies are widely used to manage and deliver software projects.',
  'Version control systems like Git are essential tools for managing and tracking code changes.',
  'The ability to think creatively is essential for coming up with new solutions to programming challenges.',
  'Understanding how to optimize code for performance is important for creating efficient software.',
  'The use of open-source libraries and frameworks can save time and effort in programming.',
  'Good software design principles can make code more maintainable and scalable.',
  'The ability to work well under pressure is crucial for meeting deadlines in software development.',
  'Programming is both an art and a science, requiring both creativity and logical thinking.',
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// generate random name
const getRandomName = () => `${getRandomArrItem(username)}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

// pickup random thought
const getRandomThought = () => getRandomArrItem(thoughts);

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThought };