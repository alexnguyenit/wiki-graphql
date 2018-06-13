const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connect database
mongoose.connect('mongodb://admin:dmin123@ds257590.mlab.com:57590/gql-wiki');
mongoose.connection.once('open',()=>{
	console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql:true
}));

app.listen(4000, () => {
	console.log('now listening request on port 4000');
});