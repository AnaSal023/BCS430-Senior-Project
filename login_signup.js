
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
import { getDatabase, set, get, update, remove, ref} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js';


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
  connectAuthEmulator(auth, 'http://localhost:9099');

  const db = getDatabase(firebaseApp);

  //get unput fields
  var firstname = document.querySelector('#firstname');
  var lastname = document.querySelector('#lastname');
  var email = document.querySelector('#email');
  var password = document.querySelector('#password');
  var cpass= document.querySelector('#cpass');

  var signUp = document.querySelector("#signUp");
  signUp.addEventListener('click', signup);

  //set up signup function
  function signup() {
    
    set(ref(db, "Users/" + email.value), {
      Name: firstname.value + " " + lastname.value,
      Email: email.value,
      Password: password.value
    })
    .then(()=>{
      alert("User added successfully!")
    })
    .catch((error)=>{
      alert("Could not added user because" + error)
    })

    /*
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
      createUserWithEmailAndPassword(auth, email, password).then(function() {
        //declare user variable
        var user = auth.currentUser

        //add this user to firebase database
        var database_ref = db.ref()

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
        console.log("error")
    })
*/
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
