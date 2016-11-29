window.onload = function() {
  initApp();
};

function loadContacts(){
  //fetch contact objects from database
  var userId = firebase.auth().currentUser.uid;
  var contactsRef = firebase.database().ref('users/' + userId + '/contacts/');
  console.log('here');

  //set contact data
  var setContact = function(data){
    var val = data.val();
    // for (var contact in val){
    //   console.log(contact);
    //   displayContacts(contact,val.name,val.date,val.frequency,val.email);
    // }
    displayContacts(data.key,val.name);

  }

  //save changes
  contactsRef.on('child_added', function(snap){
    console.log(snap.val());
    setContact(snap);

  });


  // contactsRef.off();
  // contactsRef.on('child_added',setContact(snap));
}

function displayContacts(key,name){
  var div = document.getElementById(key);
  var contacts_list = document.getElementById('contacts_list');
  //if element does not exist create it
  if (!div){
    var div = document.createElement('div');
    div.setAttribute('class','contact');
    div.setAttribute('id',key);
    var p = document.createElement('p');
    p.textContent = name;
    div.appendChild(p);
    contacts_list.appendChild(div);
  }
}

function setContactListener() {
  var contacts = document.getElementsByClassName("contact");
  contacts.forEach(function(contact){
    contact.addEventListener('click',expandContact,false);
  });
}

function expandContact(){

}
