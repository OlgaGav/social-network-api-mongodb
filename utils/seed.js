const connection = require("../config/connection");
const { User, Thoughts } = require("../models");
const { getRandomName, getRandomThought } = require("./data");
const ObjectId = require("mongodb").ObjectId;

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  //clear collections from db
  await Thoughts.deleteMany({});
  await User.deleteMany({});

  // Create empty array to hold new users and thoughts
  const users = [];

  // Loop 10 times -- add users to the users array
  for (let i = 0; i < 10; i++) {
    const username = getRandomName();
    const email = `${username}@test.com`;

    users.push({
      username,
      email,
      thoughts: [],
      friends: [],
    });
  }

  await User.collection.insertMany(users);

  console.log(users);
  console.log(`Seed completed!`);

  process.exit(0);
});
