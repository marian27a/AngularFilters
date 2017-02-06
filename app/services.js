'use strict';

homeApp.service("homeService", function(){
               var contacts = [{
                    firstName: "Andriy",
                    lastName: "Ivanov",
                    number: "0635858774"
                },
                              {
                    firstName: "Sergiy",
                    lastName: "Zondov",
                    number: "0635876894"
                }, 
                              {
                    firstName: "Ivan",
                    lastName: "Petrov",
                    number: "0639158589"
                }, 
                              {
                    firstName: "Vova",
                    lastName: "Kostrikyn",
                    number: "0635897132"
                }, 
                              {
                    firstName: "Zoryana",
                    lastName: "Nashanska",
                    number: "0939900007"
                }, 
                              {
                    firstName: "Kristina",
                    lastName: "Kovtun",
                    number: "0954563981"
                }, 
                              {
                    firstName: "Tjun",
                    lastName: "Fonti",
                    number: "0956358798"
                }];
                
                this.addContact = function(contact){
                    contacts.push(contact);
                };
                
                this.getContacts = function(){
                    return contacts;
                };
                this.getContact = function(index){
                    return contacts[index];
                };
    
                this.removeContact = function(index){
                    contacts.splice(index, 1);
                }
                
                
                
                });