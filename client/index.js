Template.hello.greeting = function () {
  return "Welcome to RecipeGram.";
};

Template.hello.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
  },

  'click #getRecipes': function() {
    console.log('test complete!');
    Meteor.call('foodQuery', function(err, results) {
      console.log(results);
    });
  },

  'click #getInstagramPhotos': function() {
    console.log('get Instagram Photos');
    Meteor.call('getInstagramFoodPics', function(err, results) {
      console.log(results);
    });
  }
});