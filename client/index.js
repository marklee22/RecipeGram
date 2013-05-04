Ingredients = new Meteor.Collection('ingredients');
Meteor.Router.add({
  '/': 'meals',

  '/breakfast': 'breakfast',

  '/lunch': 'lunch',

  '/dinner': 'dinner'
});

Template.meals.events({
  'click input#breakfast' : function () {
    Meteor.Router.to('/breakfast');    
  },
  'click input#lunch' : function () {
    Meteor.Router.to('/lunch');
  },
  'click input#dinner' : function () {
    Meteor.Router.to('/dinner');
  }
});
Template.ingredients.ingredients = function(){
    return Ingredients.find({}, { sort: {time: 1} });
};




