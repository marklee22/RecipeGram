// Template.hello.greeting = function () {
//   return "Welcome to RecipeGram.";
// };
Ingredients = new Meteor.Collection('ingredients');

Template.meals.events({
  'click input#breakfast' : function () {
  	Session.set('show_breakfast',true);
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the breakfast button");
  },
  'click input#lunch' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the lunch button");
  },
  'click input#dinner' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the dinner button");
  }
});
// Template.ingredients.ingredients = function(){
//     return Ingredients.find({}, { sort: {time: 1} });
// };

Session.set('show_breakfast', false);

Template.router.breakfast = function () { 
	return Session.equals('show_breakfast',true);
};



