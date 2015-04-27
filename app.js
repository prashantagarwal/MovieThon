var app = angular.module('app',['ui.bootstrap']);
app.controller("ListCtrl", function ($scope, $http) {
     // Search submit
    $scope.submit = function () {
        $scope.loading = true;
        $scope.error = false;
        $http.get('http://www.omdbapi.com/?s=' + $scope.search + '&r=json')
               .then(function (res) {
                    var titles = [];
                    var count = res.data.Search.length;
                    angular.forEach(res.data.Search, function(item){
                       $http.get('http://www.omdbapi.com/?t=' + item.Title + '&y=&plot=full&r=json').then(function(res){
                       if (res.data.Poster === "N/A") {
                         res.data.Poster = "http://placehold.it/350x450/FF6F59/FFFFFF&text=Image+not+Available!!";
                       }
                        titles.push(res.data); 
                        if (!count-- && !titles.length) {
                          $scope.results = false;
                          $scope.error = true;
                        }
                      });  
                   $scope.movie = titles;
                   $scope.results = true;
                   $scope.error = false;
                   $scope.loading = false;
                    });
                    


               })
               .catch(function (err) {
                   $scope.results = false;
                   $scope.loading = false;
                   $scope.error = true;
               });
    };

    $scope.saveMovie = function (imdbID) {
        $http.get(' http://www.omdbapi.com/?i=' + imdbID + '&plot=short&r=json')
         .then(function (res) {
             if (res.data.Poster === "N/A") {
                res.data.Poster = "http://placehold.it/350x450/FF6F59/FFFFFF&text=Image+not+Available!!";
             }
             $scope.savedMovies.push(res.data);
         });
    };

    $scope.remove = function (item) {
        var index = $scope.savedMovies.indexOf(item)
        $scope.savedMovies.splice(index, 1);
    }

    $scope.savedMovies = [];

    
    $scope.predicate='';
    $scope.isCollapsed = true;


});