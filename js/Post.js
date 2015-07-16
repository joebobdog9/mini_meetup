import Backbone from 'backbone'

export const PetEvent = Parse.Object.extend({
	className:'DogEvent',
	defaults: {
		title: null,
		date: null,
		location: null,
		description: null
	}
})

export const PetEventGroup = Parse.Collection.extend({
	model: PetEvent
})