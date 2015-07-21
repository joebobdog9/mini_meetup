import Backbone from 'backbone'

export const PetEvent = Parse.Object.extend({
	className:'petEvent',
	defaults: {
		title: null,
		date: null,
		description: null
	}
})

export const PetEventGroup = Parse.Collection.extend({
	model: PetEvent
})