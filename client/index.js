Deps.autorun(function() {
  var currentRecipe = Session.get('recipe');
  if(currentRecipe) {
    console.log('get Instagram Photos for: ' + currentRecipe.name);
    // console.log(currentRecipe.name);
    // console.log(currentRecipe.name.replace(/ /g, ''));
    // Meteor.call('getInstagramFoodPics', currentRecipe.name, function(err, results) {
    //   console.log(results);
    //   Session.set('userPhotos', results);
    // });
  }
});


// Server side queries
var getRecipe = function(category) {
  Meteor.call('getYummlyRecipe', category, function(err, result) {
    console.log(result);
    Session.set('recipe', result);
  });
};

Meteor.Router.add({
  '/': 'splash_page',
  '/recipe': 'recipe_page',
  '/photos': 'photos_page'
});

/*************
*** PHOTOS ***
*************/

Template.photos_page.photos = function() {
  if(Session.get('photos'))
    return Session.get('photos').images;
  else
    return;
};

/*************
*** RECIPE ***
*************/

Template.recipe_page.title = function() {
<<<<<<< HEAD
  if(Session.get('category'))
    return Session.get('category').toUpperCase();
  else
    return 'No Category';
=======
  if(Session.get('category')){
    return Session.get('category').toUpperCase();
  } else
    return "No Category";
>>>>>>> 772636c3261112eeb4bd18925d2ccaf434b9c703
};

Template.recipe_page.recipe = function() {
  return Session.get('recipe');
};

<<<<<<< HEAD
Template.recipe_info.printIngredients = function(ingredients) {
  console.log(ingredients);
=======
Template.recipe_info.printIngredients = function(ingredients){
>>>>>>> 772636c3261112eeb4bd18925d2ccaf434b9c703
  return _.map(ingredients, function(ingredient, index) {
    return {value: ingredient};
  });
};

/*************
*** SPLASH ***
*************/

Template.splash_page.events({
  'click input.btn': function(e) {
    var category = e.target.id;
    console.log('Category picked: ' + category);
    if(category) {
      getRecipe(category);
      Session.set('category', category);
      Meteor.Router.to('/recipe');
    }
  }
});

