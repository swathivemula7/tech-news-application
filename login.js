import {auth,googleProvider} from "./firebase.js";

// Validate form inputs
function validateForm() {
  const username = document.querySelector('input[name="txt"]').value;
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="pswd"]').value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  let isValid = true;

  if (username.trim() === "") {
    alert("Username is required.");
    isValid = false;
  }

  if (!emailPattern.test(email)) {
    alert("Invalid email address.");
    isValid = false;
  }

  if (!passwordPattern.test(password)) {
    alert("Password must be 6-20 characters long and include at least one digit, one uppercase letter, and one lowercase letter.");
    isValid = false;
  }

  return isValid;
}

// Handle regular signup form submission
document.querySelector('#signup-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  if (!validateForm()) {
    return; // Stop if validation fails
  }
  
  const username = document.querySelector('input[name="txt"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="pswd"]').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed up successfully
      console.log('User signed up:', userCredential.user);

      // Update the user's profile with the username
      return userCredential.user.updateProfile({
        displayName: username
      }).then(() => {
        // Store custom message and redirect to index.html
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('customMessage', 'Welcome, ' + username + '!' + ' Hope you have a great experience exploring our latest tech news!');
       
        window.location.href = 'index.html';
      });
    })
    .catch((error) => {
      // Handle errors
      console.error('Error signing up:', error);
      alert(error.message);
    });
});

// Handle login (signin)
document.querySelector('#login-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  const email = document.querySelector('input[name="login-email"]').value.trim();
  const password = document.querySelector('input[name="login-pswd"]').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email address.");
    return;
  }

  if (!passwordPattern.test(password)) {
    alert("Password must be 6-20 characters long and include at least one digit, one uppercase letter, and one lowercase letter.");
    return;
  }

  console.log('Submitting email:', email);
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log('User signed in:', userCredential.user);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('customMessage', 'Welcome back '+userCredential.user.displayName + '!' + ' Hope you have a great experience exploring our latest tech news!');
      
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.error('Error signing in:', error);
      console.log(error);
      alert(error.message);
    });
});



// Handle Google Sign-In
document.querySelector('#google-signup').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default button action

  auth.signInWithPopup(googleProvider)
    .then((result) => {
      // User signed in successfully
      console.log('User signed in with Google:', result.user);
      // Redirect or update UI as needed
      localStorage.setItem('isLoggedIn', 'true');
      const displayName = result.user.displayName || result.user.email;
      
      
      localStorage.setItem('customMessage', 'Welcome, ' + displayName + '!' + ' Hope you have a great experience exploring our latest tech news!');
   
      window.location.href = 'index.html';
    })
    .catch((error) => {
      // Handle errors
      console.error('Error signing in with Google:', error);
      alert(error.message);
    });
});

document.querySelector('.skip').addEventListener('click', () => {
  localStorage.setItem('isLoggedIn', 'false'); 
  window.location.href = 'index.html';
});











