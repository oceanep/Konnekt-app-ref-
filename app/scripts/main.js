window.onload = function() {
  initApp();
};

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

function displayContacts(key,name,email,date,frequency){
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
    a.className += "contact_link";
    a.addEventListener("click",function(){expandContact(key);},false);
    div.appendChild(a);
    contacts_list.appendChild(div);
  }
}

function deleteContact(ref){
  console.log('deleting contact...');
  ref.remove();

}

function expandContact(key){
  //set deleteButton event handler
  var userId = firebase.auth().currentUser.uid;
  var deleteRef = firebase.database().ref('users/' + userId + '/contacts/' + key);
  var deleteButton = document.getElementById('deleteContact');
    console.log(key,userId);
  deleteButton.removeEventListener("click",function(){deleteRef.set(null);});
  deleteButton.addEventListener("click",function(){deleteRef.remove();},false);


  var popup = document.getElementById("contact_data");
  var p1 = document.createElement('p');
  var p2 = document.createElement('p');
  var p3 = document.createElement('p');
  var p4 = document.createElement('p');
  var contactRef = firebase.database().ref('users/' + userId + '/contacts/' + key);

  contactRef.off();
  contactRef.on('value',function(data){
    console.log(data.val());
    var contact = data.val();
    p1.textContent = contact.name;
    p2.textContent = contact.email;
    p3.textContent = contact.date;
    p4.textContent = contact.frequency;
  });

  popup.appendChild(p1);
  popup.appendChild(p2);
  popup.appendChild(p3);
  popup.appendChild(p4);

}
