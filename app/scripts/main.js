'use strict';

window.onload = function() {
  initApp();

};

//get contacts
function loadContacts(){
  //fetch contact objects from database
  var userId = firebase.auth().currentUser.uid;
  var contactsRef = firebase.database().ref('users/' + userId + '/contacts/');

  contactsRef.off();

  //set contact data
  var setContact = function(data){
    var val = data.val();
    displayContacts(data.key,val.name);

  }

  //save changes
  contactsRef.on('child_added', function(snap){
    setContact(snap);

  });

}

//create tabs for contacts
function displayContacts(key,name){
  var div = document.getElementById(key);
  var contacts_list = document.getElementById('contacts_list');
  //if element does not exist create it
  if (!div){
    var div = document.createElement('div');
    div.setAttribute('class','contact');
    div.setAttribute('id',key);
    var a = document.createElement('a');
    a.textContent = name;
    a.setAttribute('href','#popUp');
    a.setAttribute('id',key);
    a.className += 'contact_link';
    a.addEventListener('click',function(){expandContact(key);},false);
    div.appendChild(a);
    contacts_list.appendChild(div);
  }
}

//create delete function
function deleteContact(deleteRef,key){
  deleteRef.remove();
  var div = document.getElementById(key);
  div.parentNode.removeChild(div);
};

//populate modal with contact data
function expandContact(key){

  //set deleteButton event handler
  var userId = firebase.auth().currentUser.uid;
  var contactRef = firebase.database().ref('users/' + userId + '/contacts/' + key);
  var deleteButton = document.getElementById('deleteContact');
  deleteButton.removeEventListener('click',function(){
    deleteContact(contactRef,key);
  });
  deleteButton.addEventListener('click',function(){
    deleteContact(contactRef,key);
  }, false);


  var popup = document.getElementsByClassName('contact_data')[0];
  var p1 = document.createElement('p');
  var p2 = document.createElement('p');
  var p3 = document.createElement('p');
  var p4 = document.createElement('p');

  contactRef.off();
  contactRef.on('value',function(data){
    var contact = data.val();
    if(contact){
      p1.textContent = 'Name: ' + contact.name;
      p2.textContent = 'Email: ' + contact.email;
      p3.textContent = 'Week of Meeting: ' + contact.date;
      p4.textContent = 'Contact Cycle: ' + contact.frequency;
    }

  });

  popup.appendChild(p1);
  popup.appendChild(p2);
  popup.appendChild(p3);
  popup.appendChild(p4);

}
