<?php


require_once('phpfunctions.php');// functions, database connection, and menu come from header file
$error = $email = $password = "";//sets the values to default value
echo <<<_INIT
	<!doctype html>
	<html lang="en-US">
	<head>
	<link rel="stylesheet" href="styles2.css">
	<link href="https://fonts.cdnfonts.com/css/bebas-neue" rel="stylesheet">
	</head>
_INIT;

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
	//sanitize data
	$email= fix_string($_POST['email']);
	$password = fix_string($_POST['password']);
	//if email and password are empty
	if($email == "" || $password == "")
	{
		$error = 'Not all fields were entered';
	}
	else {//if a username and password has been entered it checks the users table 
		$query = "SELECT * FROM users WHERE email='$email'";
		$result = queryMysql($query);
		if (!$result) { $error = "Invalid login attempt"; }//if the email was not found
		elseif ($result->num_rows){//if the username was found it gets the username and password
			$row = $result->fetch_array(MYSQLI_NUM);
			$result->close();
			if (password_verify($password, $row[3])){//if the password is correct
				$_SESSION['email'] = $email;//starts session
				setcookie('email', $email, time()+60*60*24*7, '/');//sets cookie to email
				die("<p><br>You are now logged in. </div><p></body></html>");
				/**Please <a data-transition='slide'
				href='index.php?view=$email'> click here </a>to continue.</div><p></body></html>");	*/ //gives user a link to go to the main page		
			}
			else //if the password/email is invalid it lets user try again
				die("Invalid email/password combination<br><br>
				<a data-transition='slide'
				href='login.php?'>Try Again</a>");
			
		}
	}
}
	//login form
	echo <<<_END
      <br><form class='center' method='post' action='login.php'>
        <div data-role='fieldcontain'>
          <label></label>
          <span class='error'>$error</span><!-- prints error message-->
        </div>
        <div data-role='fieldcontain'>
          <label></label>
          <p>Welcome back to &ensp;<img src="logo.png" alt="logo"></p>
        </div><br>
        <div data-role='fieldcontain'>
          <label>Email</label><br><br>
          <input type='text' maxlength='64' name='email' value='$email'>
        </div><br><br><br>
        <div data-role='fieldcontain'>
          <label>Password</label><br><br>
          <input type='password' maxlength='16' name='password' value='$password'>
        </div><br><br><br>
        <div data-role='fieldcontain'>
          <label></label>
          <input data-transition='slide' type='submit' value='	Login	'>
        </div>
      </form>
    </div>
  </body>
</html>
_END;

  ?>
