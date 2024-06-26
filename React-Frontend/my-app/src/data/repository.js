const USERS_KEY = "users";
const USER_KEY = "user";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialised.
  if (localStorage.getItem(USERS_KEY) !== null) return;

  const users = []; // Initialize with empty array

  // Set data into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  // Extract user data from local storage.
  let data = localStorage.getItem(USERS_KEY);
 
  if (data === null) {
    initUsers();
    // Retrieve the initialized data.
    data = localStorage.getItem(USERS_KEY);
  }
  // Convert data to objects.
  return JSON.parse(data);
}

function verifyUser(email, password) {
  const users = getUsers();
  for(const user of users) {
    if(email === user.email && password === user.password)
    {
      setUser(email);
      return true;
    }
  }

  return false;
}

function setUser(email) {
  localStorage.setItem(USER_KEY, email);
}

function createUser(email, password,name,dateOfJoining) {
  const users = getUsers();
  if (!users) {
    console.error("Error: getUsers() returned null");
    return false; // or handle the error in an appropriate way
  }
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return false; // User already exists
  }

  // Add new user
  const newUser = { name, email, password, dateOfJoining };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return true;
}

//update user INFORMATION WHEN EDITED
function updateUser(updatedUserData) {
  const users = getUsers();
  const updatedUsers = users.map(user => {
    if (user.email === updatedUserData.email) {
      return updatedUserData;
    }
    return user;
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  return true; // Return true upon successful update
}

function getUser() {
  
  return localStorage.getItem(USER_KEY);
}

//EDITED FUNCTION TO REMOVE OF THE LOCAL STORAGE
function removeUser() {
  const userEmail = getUser(); 
    const users = getUsers(); 
    //checks users for matching email to remove user
    const updatedUsers = users.filter(user => user.email !== userEmail); 
    localStorage.setItem("users", JSON.stringify(updatedUsers)); 
    localStorage.removeItem("user"); 
    return true; 
  }

export { createUser, getUser, getUsers, initUsers, removeUser, updateUser, verifyUser };

