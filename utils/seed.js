const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
const { getRandomName, getRandomThought } = require('./data');
const ObjectId = require('mongodb').ObjectId;

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  //clear collections from db
  await Thoughts.deleteMany({});
  await User.deleteMany({});

  // Create empty array to hold new users and thoughts
  const users = [];
  const thoughts = [];

// Loop 10 times -- add users to the users array
for (let i = 0; i < 10; i++) {
  
  const username = getRandomName();
  const thought = getRandomThought();
  const email = `${username}@test.com`;

  users.push({
    username,
    email,
    thoughts: [],
    friends: [],
  });

  thoughts.push({
    thought,
    username,
  })
}

await User.collection.insertMany(users);
await Thoughts.collection.insertMany(thoughts);

console.log(users);
console.log(thoughts);
console.log(`Seed completed!`);

// try {
//   thoughts.forEach(async (thought) => {
//     await User.updateOne({username: thought.username}, {$push: {thoughts: thought._id}}).exec();
//     console.log(`User ${thought.username} updated, thought id is ${thought._id}`);
//   });
// } catch(error) {
//  console.log(error);
// }

process.exit(0);

});
