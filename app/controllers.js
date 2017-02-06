homeApp.controller("homeCtrl", ["$scope", "homeService", function ($scope, homeService){
              
    $scope.searchValue = "";
    $scope.searchActiveVal = "firstName";
    var self = this;
    this.contacts = homeService.getContacts();
    this.removeContact = homeService.removeContact;
    self.contact = {
        firstName: "",
        lastName: "",
        number: ""
    };
    this.addContact = function(){
        if(self.contact.firstName != ""){
            homeService.addContact(self.contact);
        self.contact = {
                firstName: "",
                lastName: "",
                number: ""
            };
        }
        
    };
    
    this.activateSearchingVal = function(val){
        if(!val){
            $scope.searchActiveVal = "firstName";
        } else{
             $scope.searchValue = "";
            $scope.searchActiveVal = val;
        }
    }
    
    this.changeContact = function(index){
        self.currentComment = {};
        for(var i in self.contacts[index]){
            self.currentComment[""+i] = self.contacts[index][""+i];
        }
        self.currentIndex = index;
    };
    
    this.SaveChanges = function(){
        self.contacts[self.currentIndex] = self.currentComment;
    }   
    
    }]);
    
//filter that will sort
homeApp.filter("filtrName", function(){
    return function(arr, str){
        if(angular.isArray(arr) && angular.isString(str) && (str!=="")){
            var newArr = [];
            var retArr = [];
            for(var i = 0; i<arr.length; i++){
                
                newArr[i] = arr[i][''+str];
                newArr.sort();
            };
            for(var j = 0; j<arr.length; j++){
                for(var z = 0; z< arr.length; z++){
                    if(arr[j][str] === newArr[z]){
                        retArr[z] = arr[j];
                    }
                }
            }
            return retArr;
        } else{
            return arr;
        }
    }
});

//filter that will serch Matches
homeApp.filter("serchMatches", function(){
    return function(arr, str){
        if(angular.isArray(arr) && angular.isString(str)){
            var newArr = [];
            for (var i=0; i<arr.length; i++){
                var regexp = new RegExp(str, "i");
                if((arr[i]["firstName"].search(regexp)!=-1)||(arr[i]["lastName"].search(regexp)!=-1)||arr[i]["number"].search(regexp)!=-1){
                    newArr.push(arr[i]);
                }
            }
            return newArr
        } else{
            return arr
        }
    }
})

homeApp.filter("serchMatchesfiltrName", function($filter){
    return function(arr, serchVal, sortName){
        if(angular.isArray(arr) && angular.isString(serchVal) && angular.isString(sortName)){
            if(serchVal !== ""){
                var newArr = $filter("serchMatches")(arr, serchVal);
                return newArr
            } else{
                var Arr = $filter("filtrName")(arr, sortName);
                return Arr
            }
        } else{
            return arr
        }
    }
})
homeApp.filter("takeItems", function(){
    return function(arr, from, to){
        if(angular.isArray(arr) && angular.isNumber(from) && angular.isNumber(to)){
            if(from > to || from<0) return arr;
            var newArr = arr.slice(from, to);
            return newArr;
        } else{
            return arr;
        }
    }
});
homeApp.filter("superFilter", function($filter){ 
    return function (arr , from, to, step){ 
if(angular.isArray(arr) && angular.isNumber(from) && angular.isNumber(to) && angular.isNumber(step)){ 
if(from > to || from <0 || step< 0) return arr; 
var newArr = $filter("takeItems")(arr, (from+step), (to+step)); 
return newArr; 
} else{ 
return arr 
} 
} 
});