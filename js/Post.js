import Backbone from 'backbone'

export const Post = Parse.Object.extend({
	className:'Post',
	defaults: {
		title: ('no title'),
		date: null,
		location: null,
		description: ('no description')
	}
})

export const Post = Parse.Collection.extend({
	model: Post
})