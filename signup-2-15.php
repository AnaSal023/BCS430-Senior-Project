<?php
echo <<<_INIT
<!doctype html>
<html lang="en-US">
<head>
  <link rel="stylesheet" href="styles1.css">
  <link href="https://fonts.cdnfonts.com/css/bebas-neue" rel="stylesheet">
</head>

_INIT;

  
  
require_once('phpfunctions.php');//requires 

$hn = 'localhost';
  $db = 'mystic';
  $un = 'mystic';
  $pw = 'mypasswd';
  $connection = new mysqli($hn, $un, $pw, $db);
  if ($connection->connect_error) { die("Fatal Error" . $connection->connect_error); }

	$email = $firstname = $lastname = $password = $cpass = "";//makes the field blank

	
	 echo <<<_END
	  
	<!-- JavaScript section -->
    <script>
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
        if (field == "") return "No first name was entered.\n"
        
        return ""
      }
      function validateLast(field)
      {
        if (field == "") return "No last name was entered.\n"
        
        return ""
      }

      function validatePassword(field)
      {
        if (field == "") return "No Password was entered.\\n"
        else if (field.length < 6)
          return "Passwords must be at least 6 characters.\\n"
        else if (!/[a-z]/.test(field) || ! /[A-Z]/.test(field) ||
                 !/[0-9]/.test(field))
          return "Passwords require one each of a-z, A-Z and 0-9.\\n"
        return ""
      }
 
      function validateEmail(field)
      {
        if (field == "") return "No Email was entered.\\n"
          else if (!((field.indexOf(".") > 0) &&
                     (field.indexOf("@") > 0)) ||
                    /[^a-zA-Z0-9.@_-]/.test(field))
            return "The Email address is invalid.\\n"
        return ""
      }
	  
	  function validateCPassword(field1, fiedl2){
		  if (field == "") return "No Confirm Password was entered.\\n"
		  else if (field1 != field2) return "Passwords are not the same.\\n"
		  else return ""
	  }
	</script>

_END; 

if (isset($_SESSION['email'])) destroy_session_and_data();//if the user is login in, it logs out



$checkuser ="";

//sanitize the data that the user entered
  if (isset($_POST['email']))
    $email = fix_string($_POST['email']);
    if (isset($_POST['firstname']))
    $firstname = fix_string($_POST['firstname']);
  if (isset($_POST['lastname']))
    $lastname = fix_string($_POST['lastname']);
  if (isset($_POST['password']))
    $password = fix_string($_POST['password']);
  if (isset($_POST['cpass']))
    $cpass = fix_string($_POST['cpass']);
//validates the input data with php functions
  $fail  = validate_email($email);
  $fail .= validate_first($firstname);
  $fail .= validate_last($lastname);
  $fail .= validate_password($password);
  $fail .= validate_cpassword($cpass, $password);

	//if it passed the php validations
	if ($fail == "")
	{
		$result = queryMysql("SELECT * from users WHERE email='$email'");
		//checks that the username does not exist
		if(mysqli_num_rows($result)>0){
			$checkuser =  "<span color='red'><br>Sorry, the following errors were found<br>
			  in your form: That email account already exists</span><br><br>";
			  
		}
		else {//if it doesnt exist it addes it to the database with a hash and salted password
			$hash = password_hash($password, PASSWORD_DEFAULT);
			add_user($connection, $firstname, $lastname, $email, $hash);
			die("<html><body><br><h4>Account created</h4><br>
			Please Log In<br><a data-transition='slide'
      href='login.php?view=$email'> Click here </a>to continue.</div><p></body></html> ");
			exit;
		}
		
	}
echo <<<_END
<br><img src="signup_image.jpg" alt="signup">
<!-- registration form is print in the form of a table --> 
			<table class="center">

			  <th colspan="2" align="center">Welcome to Uni-Thrift</th>
			
			  <form method="post" action="signup.php" onSubmit="return validate(this)" ><!-- validate(this) checks the input data with javascript functions -->
				
        <tr><td>First Name</td><div data-role='fieldcontain'>
				  <td><input type="text" maxlength="16" name="firstname" value="$firstname" >
				<tr><td>Last Name</td><div data-role='fieldcontain'>
				  <td><input type="text" maxlength="16" name="lastname" value="$lastname" >
          <tr><td>Email</td>
				<td><input type="text" maxlength="64" name="email" value="$email">
				</td></tr>
				</td><br><td>$checkuser</td></tr>
				<tr><td>Password</td>
				  <td><input type="password" maxlength="12" name="password" value="$password" >
				</td><td><div data-role='fieldcontain'></tr>
				<tr><td>Confirm Password</td>
				  <td><input type="password" maxlength="12" name="cpass" value="$cpass">
				</td></tr><tr><td colspan="2" align="center"><input type="submit"
				  value=" Create Account  " ></td></tr>
			  </form>
		</table><br><br><br><br><br>
    <p float='none'><font color='white' size='1em'><i>$fail</i></font></p><br>
		</body>
		</html>
_END;

  ?>
