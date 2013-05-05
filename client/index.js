Deps.autorun(function() {
  var currentRecipe = Session.get('recipe');
  console.log(Meteor.Router.page());
  if(currentRecipe && Meteor.Router.page() === 'recipe_page') {
    console.log('get Instagram Photos for: ' + currentRecipe.name);
    console.log(currentRecipe.name);
    // Meteor.call('getInstagramFoodPics', currentRecipe.name, function(err, results) {
    //   console.log(results);
    //   Session.set('photos', results);
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

Meteor.Router.filters({
  'clearSession': function(page) {
    Session.set('photos', '');
    Session.set('recipe', '');
    return page;
  }
});

Meteor.Router.filter('clearSession', {only: ['splash_page']});

/*************
*** PHOTOS ***
*************/

Template.photos_page.photos = function() {
  return Session.get('photos');
};

/*************
*** RECIPE ***
*************/

// Template.recipe_page.title = function() {
//   if(Session.get('category')){
//     return Session.get('category').toUpperCase();
//   } else
//     return "No Category";
// };

Template.recipe_page.recipe = function() {
  return Session.get('recipe');
};

Template.recipe_info.printIngredients = function(ingredients){
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
