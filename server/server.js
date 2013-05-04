// Pearson API Settings
var pearsonAPIKey = 'aac3c31fec0797148cb1a68b469282ce';
var pearsonUrl = 'https://api.pearson.com/kitchen-manager/v1/';

// Yummly API Settings
var yummlyUrl = 'http://api.yummly.com/v1/api/recipes';
var yummlyClientID = '0997bef7';
var yummlySecret = 'a0ea6f194eda7a4d0baf4f4f223657f1';

// Instagram API Settings
var instagramUrl = 'https://api.instagram.com/v1/tags/';
var instagramClientID = '9da20f6b166e474a8b70cb396aa87da7';
var instagramSecret = '587de29c36b4471d8df52e2fe61afc4e';

Meteor.methods({
  'getYummlyRecipes': function(category) {
    console.log('Running Yummly API query');
    var url = yummlyUrl + '?_app_id=' + yummlyClientID + '&_app_key=' + yummlySecret;
    // http://i2.yummly.com/[name].s.png -> http://i2.yummly.com/Amish-Breakfast-Casserole-Allrecipes.card.jpg
    console.log(url);
    var params = {
      'requirePictures': true,
      'q': 'breakfast'
    };
    var response = Meteor.http.get(url, {params: params});
    console.log(response);
    _.each(response.data.matches, function(recipe, index) {
      var bigImageUrl = 'http://i.yummly.com/' + recipe.smallImageUrls[0].match(/yummly.com\/(.+)\..\./)[1] + '.card.jpg';
      console.log(bigImageUrl);
      response.data.matches[index]['bigImageUrl'] = bigImageUrl;
    });
    return response;
  },

  'getPearsonRecipes': function(category) {
    console.log('Running food query');
    var url = pearsonUrl + 'recipes.json';
    var params = {
      'apikey': pearsonAPIKey,
      'name-contains': category
    };
    var response = Meteor.http.get(url, {params: params});
    console.log(response);
    var results = {
      recipes: response.data.results
    };
    return results;
  },

  'getInstagramFoodPics': function(tagName) {
    console.log('Running Instagram query');
    var url = instagramUrl + tagName + '/media/recent';
    var params = {
      'client_id': instagramClientID
    };
    var response = Meteor.http.get(url, {params: params});
    console.log(response);
    var results = {
      images: response.data.data,
      pagination: response.pagination
    };
    return results;
  }
});
