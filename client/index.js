// Template.hello.greeting = function () {
//   return "Welcome to RecipeGram.";
// };

Template.meals.events({
  'click input#breakfast' : function () {
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
