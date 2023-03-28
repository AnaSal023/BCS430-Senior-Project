import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
		import { 
			getAuth, 
			createUserWithEmailAndPassword, 
			signInWithEmailAndPassword,
			onAuthStateChanged,
			signOut,
			setPersistence,
			browserSessionPersistence } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
		
		//database configuration
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
		
			//get input fields, button, and form
			const email = document.querySelector('#email');
			const password = document.querySelector('#password');
			const loginForm = document.querySelector('#loginForm');
			const Login = document.querySelector('#login');


			//function when user press login button
			const userLogin = async() => {
				
				//gets value of const
				const loginEmail = email.value;
				const loginPassword = password.value;
				//validate fields
				validateEmailAndPassowrd(loginEmail, loginPassword);
				//user aunthentication to login
				setPersistence(auth, browserSessionPersistence)
				.then(() => {
				return signInWithEmailAndPassword(auth, loginEmail, loginPassword)
				.then((userCredential) => {
					const user = userCredential.user;
					console.log(user);
					alert("Your have successfully logged in!!");
					window.location.href="indexLogin.html";
				})
				//if a error occurs it will display in the browser console
				.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(errorCode + "/n" + errorMessage)
						alert(errorCode + errorMessage);
					});
				}) .catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(errorCode + "/n" + errorMessage)
						alert(errorCode + errorMessage);
					});
			}	

			//when button is click it runs the user login function
			Login.addEventListener('click', userLogin);

			
			//validate input fields (must not be empty)
			function validateEmailAndPassowrd(email, password) {
				if(email == "" || password == "")
				{
					alert('Not all fields were entered');
				}
			}