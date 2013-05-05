// Pearson API Settings
var pearsonAPIKey = 'aac3c31fec0797148cb1a68b469282ce';
var pearsonUrl = 'https://api.pearson.com/kitchen-manager/v1/';

// Yummly API Settings
var yummlyRecipesUrl = 'http://api.yummly.com/v1/api/recipes';
var yummlyRecipeUrl = 'http://api.yummly.com/v1/api/recipe';
var yummlyClientID = '0997bef7';
var yummlySecret = 'a0ea6f194eda7a4d0baf4f4f223657f1';
var yummlyHeaders = {
  'X-Yummly-App-ID': yummlyClientID,
  'X-Yummly-App-Key': yummlySecret
};

// Instagram API Settings
var instagramUrl = 'https://api.instagram.com/v1/tags/';
var instagramClientID = '9da20f6b166e474a8b70cb396aa87da7';
var instagramSecret = '587de29c36b4471d8df52e2fe61afc4e';

// Yummly Max Results
// breakfast - 9955
// lunch - 17811
// dinner - 43510
var yummlyCategoryMax = {
  'breakfast': 6157,
  'lunch': 12362,
  'dinner': 22312
};

// Get the recipe and store it in the database
var getAndStoreRecipe = function(category, recipeId) {
  console.log('Getting recipe: ' + recipeId);
  var url = yummlyRecipeUrl + '/' + recipeId;
  var response = Meteor.http.get(url, {headers: yummlyHeaders});
  response.data['yummlyId'] = recipeId;
  response.data['category'] = category;

  console.log('Inserting/Updating recipe into database');
  if(Recipes.findOne({'yummlyId': recipeId}))
    Recipes.update({'yummlyId': recipeId}, response);
  else
    Recipes.insert(response.data);

  return response.data;
};

Meteor.methods({
  'getYummlyRecipe': function(category) {
    console.log('Running Yummly API query');
    var params = {
      'requirePictures': true,
      'q': category,
      'maxTotalTimeInSeconds': 1800,
      'maxResult': 1,
      'start': Math.floor(Math.random() * yummlyCategoryMax[category])
    };
    var response = Meteor.http.get(yummlyRecipesUrl, {params: params, headers: yummlyHeaders});
    console.log(response);
    var result = response.data.matches[0];
    var bigImageUrl = 'http://i.yummly.com/' + result.smallImageUrls[0].match(/yummly.com\/(.+)\..\./)[1] + '.card.jpg';
    result = getAndStoreRecipe(category, result.id);
    result['bigImageUrl'] = bigImageUrl;

    return result;
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
