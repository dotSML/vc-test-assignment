# VisionCraft Test Assignment
This is a test assignment for VisionCraft.

Assignment was to create a simple application consisting of a Node backend with MySQL database and a React client app.

<h2>Backend</h2> <br>
This application is using Node with Express server framework, which gives the developer tools, to develop applications fast and efficiently <br>
For authentication, JWT is used, which gives you simple and secure authentication flow. <br>
All data, that should be out of sight for everyone else, is stored in an environment variable using dotenv package. <br>
For schema creation, Sequelize is used, which is well known ORM for Node and SQL databases and gives you easy way to manipulate and utilize your database models. <br>
<h4>Testing</h4>
Using Jest for testing. 
Tests performed for user endpoints. 

<h2>Client App</h2>
The React application was generated with <code>npx create-react-app --template typescript</code> builder. <br>
The application uses TypeScript, which gives the developer the safety net of validating the types and also provides you with awesome autocomplete on your models while developing. <br>
For global state management - Redux is used. <br> Being an overkill for an application of this size, sure, but saves the developer from some headache associated with passing down endless props and of course, vastly improves the scalability of the application should new features need to be implemented. <br>
The authentication stores the JWT received from backend in localstorage and assumes it's valid - real validation of token is done on the backend upon requesting from protected routes. <br>
<h4>Testing</h4>
Using Jest for testing.
Tests performed to ensure Redux actions are performing as expected.


<h2>Installation</h2>
In your local MySQL database instance, create a database called <code>test_assignment</code><br>
After doing so, navigate to <code>vc-test-assignment/backend</code>. First run the command <code>npm install</code> to install all the necessary dependencies. <br>
Then, use <code>sequelize db:migrate</code> to update your database according to the schema. <br>
Once it's done, you can run <code>nodemon app</code>