// http://api.yummly.com/v1/api/recipes?_app_id=2CPbgKpt&_app_key=4258f887431c2971b6e9a5fc93850803&your _search_parameters

var myApp = {};

myApp.appId = "f49c0671";
myApp.key = "4258f887431c2971b6e9a5fc93850803";

myApp.init = function(){
	//code to kick off app goes here
	$(window).load(function(){
		$('.container').slideDown(1500);
	});
	$('a.dosha').on("click", function(event){
		event.preventDefault();
		// console.log(" dosha clicked");
		myApp.selectedDosha = $(this).attr('id');
		myApp.getRecipes();
	});
	$('#vegetarian').on("change", function(event){
		event.preventDefault();
		myApp.getRecipes();
	});
};

myApp.doshas = {
	//

	vata: {

		sweet: {
			min: 0.6,
			max: 1
		},
		sour: {
			min: 0.6,
			max: 1
		},
		salty: {
			min: 0.6,
			max: 1
		},
		bitter: {
			min: 0,
			max: 0.4
		},
		piquant : {
			min: 0,
			max: 0.4
		}

	},

	pitta: {

		sweet: {
			min: 0.6,
			max: 1
		},
		sour: {
			min: 0,
			max: 0.4
		},
		salty: {
			min: 0,
			max: 0.4
		},
		bitter: {
			min: 0.6,
			max: 1
		},
		piquant: {
			min: 0,
			max: 0.4
		}

	},

	kapha: {

		sweet: {
			min: 0,
			max: 0.4
		},
		sour: {
			min: 0,
			max: 0.4
		},
		salty: {
			min: 0,
			max: 0.4
		},
		bitter: {
			min: 0.6,
			max: 1
		},
		piquant: {
			min: 0.6,
			max: 1
		}

	}
};


myApp.getRecipes = function(){
	if (typeof myApp.selectedDosha === 'undefined'){
		return;
	}
	var dosha = myApp.doshas[myApp.selectedDosha];
	var searchParams = {
		_app_id: myApp.appId,
      _app_key: myApp.key,
      format: 'jsonp',
      requirePictures: true,
      maxResult: 15,
      allowedCourse: 'course^course-Main Dishes',
      'flavor.sweet.min': dosha.sweet.min,
      'flavor.sweet.max': dosha.sweet.max,
      'flavor.sour.min': dosha.sour.min,
      'flavor.sour.max': dosha.sour.max,
      'flavor.bitter.min': dosha.bitter.min,
      'flavor.bitter.max': dosha.bitter.max,
      'flavor.salty.min': dosha.salty.min,
      'flavor.salty.max': dosha.salty.max,
      'flavor.piquant.min': dosha.piquant.min,
      'flavor.piquant.max': dosha.piquant.max
  };

  if ($('#vegetarian').is(':checked')) {
  	searchParams.allowedDiet = "387^Lacto-ovo vegetarian";
  	// console.log("i did it yeaaaahhhH!!")
  }
	//AJAX request for recipes goes here
  $.ajax({
    url: 'http://api.yummly.com/v1/api/recipes',
    type: 'GET',
    data: searchParams,
    dataType: 'jsonp',
    success: function(result){
      // console.log(result.matches);
      myApp.displayRecipes(result.matches);
    }
  });
};

myApp.displayRecipes = function(recipes){
//put recipes on page
	$(".quizLink").addClass("hasRecipes");
    $('#recipes').slideUp(500, function() {
    	$("#recipes").empty().css('display', 'none');
    	$.each(recipes, function(i, recipe){
			// console.log(recipe);

			var image = $('<img>').attr('src', recipe.imageUrlsBySize['90']);
			var title = $('<h2>').text(recipe.recipeName);
			var fullRecipe = $('<a>').attr('href', 'http://www.yummly.com/recipe/' + recipe.id).html($('<div>').addClass('recipe').append(image, title));
			$('#recipes').append(fullRecipe);
		});
		$('#recipes').slideDown(1500, function() {

			$(".quizLink").removeClass("hasRecipes");
		});
    });
	
};

$(function(){
	myApp.init();
});