// step 1: first we need to make a UserContext using createContext

import React from "react";

const  UserContext = React.createContext()

export default UserContext;

// every context is a provider
//provider means that every component inside the userContext will get the access of the global user context 
// context is basically considered as the global variable 

// step 2: create a provider in a new file userContextProvider.jsx
