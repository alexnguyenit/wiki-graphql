const graphql = require('graphql');
const _ = require('lodash');

const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphql;

// data
var books = [
	{name:'Code Of PHP', genre:'PHP', id:'1', authorId:'1'},
	{name:'Zero to Hero NodeJs', genre:'NodeJs', id:'2', authorId:'2'},
	{name:'Database with Mysql', genre:'MySql', id:'3', authorId:'3'},
	{name:'Ecommerce with PHP', genre:'PHP', id:'4', authorId:'1'},
	{name:'Code of NodeJs', genre:'NodeJs', id:'5', authorId:'1'},
	{name:'Basic PHP', genre:'PHP', id:'6', authorId:'2'},
];

var authors = [
	{name:'Hoang Nguyen', age:27, id:'1'},
	{name:'Bay Nguyen', age:22, id:'2'},
	{name:'Cuong Phan', age:29, id:'3'},
];

const BookType = new GraphQLObjectType({
	name:'Book',
	fields:() => ({
		id: {type:GraphQLID},
		name: {type:GraphQLString},
		genre: {type:GraphQLString},
		author:{
			type:AuthorType,
			resolve(parent, args){
				return _.find(authors, {id:parent.authorId});
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name:'Author',
	fields: () => ({
		id: {type:GraphQLID},
		name: {type:GraphQLString},
		age: {type:GraphQLInt},
		books:{
			type:new GraphQLList(BookType),
			resolve(parent, args){
				return _.filter(books,{authorId:parent.id})
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		books:{
			type:new GraphQLList(BookType),
			resolve(parent, args){
				return books;
			}
		},
		book:{
			type: BookType,
			args:{id:{type:GraphQLID}},
			resolve(parent, args){
				// code to get data from db / other source
				return _.find(books, {id:args.id});
			}
		},
		authors:{
			type: new GraphQLList(AuthorType),
			resolve(parent, args){
				return authors;
			}
		},
		author:{
			type: AuthorType,
			args:{id:{type:GraphQLID}},
			resolve(parent, args){
				// code to get data from db / other source
				return _.find(authors, {id:args.id});
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});