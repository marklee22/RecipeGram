// Pearson API Settings
var pearsonAPIKey = 'aac3c31fec0797148cb1a68b469282ce';
var pearsonURL = 'https://api.pearson.com/kitchen-manager/v1/';

// Instagram API Settings
var instagramURL = 'https://api.instagram.com/v1/';
var instagramClientID = '9da20f6b166e474a8b70cb396aa87da7';
var instagramSecret = '587de29c36b4471d8df52e2fe61afc4e';

Meteor.methods({
  'foodQuery': function() {
    console.log('Running food query');
    var url = pearsonURL + 'recipes.json?offset=2&limit=2&apikey=' + pearsonAPIKey;
    var results = Meteor.http.get(url);
    console.log(results);
    return results;
  },

  'getInstagramFoodPics': function(tagName) {
    console.log('Running Instagram query');
    var url = instagramURL + 'media/popular?client_id=' + instagramClientID;
    var results = Meteor.http.get(url);
    console.log(results);
    return results;
  }
});
