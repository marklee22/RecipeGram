Template.hello.greeting = function () {
  return "Welcome to RecipeGram.";
};

Template.food_photos.photos = function() {
  return Session.get('photos').images;
};

Template.recipes.recipes = function() {
  return Session.get('recipes').data.matches;
};

Template.hello.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
  },

  'click #getRecipes': function() {
    console.log('test complete!');
    Meteor.call('getPearsonRecipes', 'breakfast', function(err, results) {
      console.log(results);
      Session.set('recipes', results);
    });
  },

  'click #getYummlyRecipes': function() {
    console.log('yummly');
    Meteor.call('getYummlyRecipes', function(err, results) {
      console.log(results);
      Session.set('recipes', results);
    });
  },

  'click #getInstagramPhotos': function() {
    console.log('get Instagram Photos');
    Meteor.call('getInstagramFoodPics', 'chickenTeriyaki', function(err, results) {
      console.log(results);
      Session.set('photos', results);
    });
  }
});