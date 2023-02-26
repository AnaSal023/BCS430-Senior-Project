
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCboO05ASTNAeFOWdUARGE7MZYj7ZzxcEs",
    authDomain: "uni-thrift.firebaseapp.com",
    databaseURL: "https://uni-thrift-default-rtdb.firebaseio.com",
    projectId: "uni-thrift",
    storageBucket: "uni-thrift.appspot.com",
    messagingSenderId: "562171645836",
    appId: "1:562171645836:web:6c89d0a08fb9c35ab4d0a9"
  };
  //initialize firebase
  const firebaseApp = initializeApp(firebaseConfig);

  //initialize variables
  const auth = getAuth(firebaseApp);
  const database = getFirestore(firebaseApp);

  /*const  signup = () => {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password);
    //firebase code
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    });
  }
*/
  //set up signup function
  function signup() {
    //get unput fields
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    //validate input fields
    function validate(form)
      {
        fail = validateFirst(firstname)
        fail += validateLast(lastname)
        fail += validatePassword(password)
        fail += validateEmail(email)
		fail += validateCPassword(cpass, password)
      
        if (fail == "")     return true
        else { alert(fail) }
      }

    //autherization
    auth.createUserWithEmailAndPassword(email, password).then(function() {
        //declare user variable
        var user = auth.currentUser

        //add this user to firebase database
        var database_ref = database.ref()

        //create user data
        var user_data = {
            email : email, 
            firstname : firstname,
            lastname : lastname,
            last_login : Date.now()
        }

        database_ref.child('users/' + user.uid).set(user_data)

        console.log('User created')
        alert('User Created!')
    })
    .catch(function(error) {
        //firebase will use this alert to show its errors
        var error_code = error.code
        var error_message = error.message
        alert(error_message)
    })

  }

  function validate(form)
      {
        fail = validateFirst(form.first.value)
        fail += validateLast(form.last.value)
        fail += validatePassword(form.password.value)
        fail += validateEmail(form.email.value)
		fail += validateCPassword(form.cpass.value, form.password.value)
      
        if (fail == "")     return true
        else { alert(fail); return false }
      }
      function validateFirst(field)
      {
        if (field == "") alert("No first name was entered.\n")
        
        return true
      }
      function validateLast(field)
      {
        if (field == "") alert("No last name was entered.\n")
        
        return true
      }

      function validatePassword(field)
      {
        if (field == "") return "No Password was entered.\\n"
        else if (field.length < 6)
          alert("Passwords must be at least 6 characters.\\n")
        else if (!/[a-z]/.test(field) || ! /[A-Z]/.test(field) ||
                 !/[0-9]/.test(field))
          alert("Passwords require one each of a-z, A-Z and 0-9.\\n")
        return true
      }
 
      function validateEmail(field)
      {
        if (field == "") alert("\\n No Email was entered.\\n")
          else if (!((field.indexOf(".edu") > 0) &&
                     (field.indexOf("@") > 0)) ||
                    /[^a-zA-Z0-9.@_-]/.test(field))
            alert("The Email address is invalid.\\n")
        return true
      }
	  
	  function validateCPassword(field1, fiedl2){
		  if (field == "") alert("No Confirm Password was entered.\\n")
		  else if (field1 != field2) alert("Passwords are not the same.\\n")
		  else return true
	  }










  //document.getElementById('signup').addEventListener('submit', signupForm);

  function signupForm(e) {
    e.preventDefault();
    var firstname = getElementVal('firstname');
    var lastname = getElementVal('lastname');
    var email = getElementVal('email');
    var password = getElementVal('password');

  }

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  }
