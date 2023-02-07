
  # API for Social Network application with MongoDB

  ![License badge](https://img.shields.io/static/v1?label=license&message=MIT%20License&color=green)

  ## Description
  
  MongoDB is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. This API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. 
  
  Tech Stack: 

    - Express.js for routing;
    - MongoDB database; 
    - Mongoose ODM (Object Data Modeling);

  ![this image display the screenshot of the 'API for Social Network application with MongoDB' application](/assets/images/SocialNet_API_MongoDB.png)

  ## Table of Contents
 
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Questions](#questions)
  - [Contribution](#contribution)
  - [Tests](#tests)
    
  ## Installation
  
  n/a
  
  ## Usage
  
  1. Download the repo 
  2. Install dependencies ``` npm install``` 
  3. Start server ```npm start```

### Implemented API end points

#### Users

- Show all users  ```GET /api/user/```
- Show user by Id ```GET /api/user/:userId```
- Update user by Id ```PUT /api/user/:userId```
- Create user ```POST /api/user/```

```
{
	"username": "MyUsername",
	"email": "email@test.com",
	"friends": [],
	"thoughts": []
}
```

- Delete User ```DELETE /api/user/:userId```

#### Friends

- Add Friend to the user  ```POST /api/user/:userId/friend/:friendId```
- Remove Friend ```DELETE /api/user/:userId/friend/:friendId```
        
#### Thoughts

- Show all thoughts ```GET /api/thoughts/```
- Show Thought by Id  ```GET /api/thoughts/:thoughtId```
- Update Thought by Id  ```PUT /api/thoughts/:thoughtId```
- Create Thought  ```POST /api/thoughts/```

```
{
	"thoughtText": "Programming is the process of creating instructions that a computer can execute.",
	"username": "MyUsername",
	"userId": "_id_of_User"
}
```

- Delete Thought  ```DELETE /api/thoughts/:thoughtId```


#### Reaction

- Add Reaction to the thought ```POST /api/thoughts/:thoughtId/reaction/```

```
{
	"reactionBody": "It's a brilliant idea!",
	"username": "SomeUser"
}
```
- Remove Reaction ```DELETE /api/thoughts/:thoughtId/reaction/:reactionId```

Collection with end points: [assets/collection.json](/assets/collection.json)
  
  ## Credits
  
  <br> - Olga Gavrushenko; <br> - [How to create a Professional README](https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide); <br> - UC Berkley Extension Learning materials
  
  ## License
  
  ![License badge](https://img.shields.io/static/v1?label=license&message=MIT%20License&color=green)

  This application is available under the license: MIT License. 
    See the LICENSE file for more info. Full details available by link https://choosealicense.com/licenses/mit/. 
    
 
  ## Questions
  
  Link to my GitHub profile https://github.com/olgagav/
  
  If you have additional questions or proposals please email me: [ogavby@gmail.com](mailto:ogavby@gmail.com?subject=[GitHub]%20command-line%20password%20generator)
    
  ## Contribution

  Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. <br>Fork the Project <br> - Create your Feature Branch <br> - Commit your Changes <br> - Push to the Branch <br> - Open a Pull Request
  
  ## Tests
  
  n/a
  