---
title: "Context API - React"
description: "The only context API(react) resource you will need"
slug: "/blog2"
date: "21-03-2021"
---

![random](https://images.unsplash.com/photo-1612533923019-b532b3131212?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

Before digging in lets first try to understand what problem is the Context API trying to solve. Given a parent component and a child component. Whenever the child component requires to access some data available to its parent, we can very naturally pass down props to the child.

```js
import React from "react";

export const Dashboard = () => {
  const user = { name: "David", hobby: "sleeping" };
  return <Profile user={user} />;
};
```

But, what if we want to access some data in a compoment who is not a child of component having that data. This is where Context API comes in to picture.

## How does Context API work?

![demonstration of context API](https://i.ibb.co/f8m0PN6/Group-7.png)
Context API lifts the state up to a certain level depending on what all components wants to access its state, what I mean by this can be made easier to understand by building a mental model. Consider data that we want to access in say 10 different components as water in clouds, and consider each of those components as container which require water. The cloud now acts as a "Provider" and the container down on surface acts as "Consumer". This is all that Context API does in simplest terms. This also saves us from the tedious work of threading props to a deeply nested component or access child's data in parent component.

## API

Let's take a very common scenario where we want to access user object in two components Profile and Dashboard. First of all we create a context using createContext function of react.

```js
import { createContext } from "react";

/**
 * Although createContext expects a
 * default value, but it is used only when
 * the component trying to access
 * context does not have a corresponding Provider
 */
const UserContext = createContext();
```

Now we need to set up our Context Provider (<i>'clouds'</i> according to our mental model). The Context object that we created above ships with a Provider component on it. The placement of this Provider component in DOM tree depends on which are the components who needs to access user(<i>'water'</i> by our mental model).

```js
/**
 * The provider conponent takes a value props
 * which expects the latest state of user object
 */
<UserContext.Provider value={/* current state of user object */} />
```

The last thing which is left according to our mental model are those <i>containers</i> that will be consuming user object or data in general(<i>'water'</i> by mental model).

```js
/**
 * The Counsumer component of UserContext(Context)
 * object, it requires a function as child having
 * current state as paramenter and which return a
 * react node.
 */
<UserContext.Consumer>
  {(value) => <SomeComponent value={value} />}
</UserContext.Consumer>
```

### Example:

```jsx
import { createContext, Fragment } from "react";

// Creating Context
const UserContext = createContext();

// Consuming Context
const Navbar = () => {
  return (
    <Fragment>
      <UserContext.Consumer>
        {(value) => <nav>Logged user: {value.name}</nav>}
      </UserContext.Consumer>
    </Fragment>
  );
};

// Providing Context
function App() {
  const initialState = { name: "David", hobby: "sleeping" };
  return (
    <div className="App">
      <UserContext.Provider value={initialState}>
        <Navbar />
      </UserContext.Provider>
    </div>
  );
}

export default App;
```

The manipulation of state can be handled by using [useState](https://reactjs.org/docs/hooks-state.html) hook, by passing the local state in value of Provider component while keeping the initialState as the initial state of our Context. For eg. In this example to change the hobby of user from "sleeping" to "football" on click of a button.

> In case of handling states which are quite complex in terms of the number of changes they go through and has a bunch of properties(if its an object), it is recommended to use hooks to modify state(instead of useState) and access context(instead of Consumer) which are discussed later.

```js
import { useState, createContext, Fragment } from "react";
import "./App.css";
const UserContext = createContext();

const Navbar = () => {
  return (
    <Fragment>
      <UserContext.Consumer>
        {(value) => (
          <nav>
            <div>Logged user: {value.name}</div>
            <div>Hobby: {value.hobby}</div>
          </nav>
        )}
      </UserContext.Consumer>
    </Fragment>
  );
};

function App() {
  const initialState = { name: "David", hobby: "sleeping" };
  const [user, setUser] = useState(initialState);
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Navbar />
        <button
          onClick={() =>
            setUser((prev) => ({
              ...prev,
              hobby: "Football",
            }))
          }
        >
          Change hobby
        </button>
      </UserContext.Provider>
    </div>
  );
}

export default App;
```

## Handling more complex states

In case the state you want to manage is to undergo a bunch of changes often, its better to use the useReducer hook and we use the useContext hook to consume this state. The useReducer hook is used to manipulate the state depending on various actions that will be dispatched to make these changes. Long story, useReducer replaces useState hook in case of managing more sophisticated states. An example of this state could be a user object.

```ts
// user
type User = {
  username: string;
  name: string;
  age: number;
  posts: Array<Post>;
  createdAt: string;
  following: number;
  followers: number;
  isAuthenticated: boolean;
  profile_img: string;
  bio: string;
};
```

These types of complex states may be required to undergo various action like, CHANGE _ NAME, UPDATE _ FOLLOWERS, IS _ AUTH, UPDATE _ BIO etc.

Here's a file structure that I tend to follow while handling such states.

![file structure](https://i.ibb.co/N34wtC3/fg.png)

### Creating context

```jsx
// src/context/user/UserContext.js

import { createContext } from "react";

const userContext = createContext();

export default userContext;
```

### Creating Provider Component

useReducer hook takes two parameters first is the reducer function which determines the action to dispatch depending upon its type and second is the initial state. It return an array with its first value at index 0 as the current state and second value is a function which is used to dispatch the action defined in the types.js. Here the changeBio function updates the bio of user by taking a string named bio as a parameter and runs the dispatch function triggering the useReducer function to execute the CHANGE \_ BIO action.

```jsx
// src/context/user/UserState.js

import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
// Actions
import { CHANGE_BIO } from '../types'

const UserState = ({ children }) => {
  const initialState = {
    username: null;
    bio: null;
  };

  const [state, dispatch] = useReducer(initialState, UserReducer);

  const changeBio = (bio) => {
    dispatch({type: CHANGE_BIO, payload: bio});
  }

  return (
    <UserContext.Provider value={{
      username: state.username,
      bio: state.bio,
      changeBio
    }}>
    {children}
    </UserContext.Provider>
  )
}

export default UserState
```

UserReducer is simply a function which takes two parameters state and action and return the new state.

```js
// src/context/user/UserReducer.js

import { CHANGE_BIO } from "../types";

export default (state, action) => {
  switch (state.action) {
    case CHANGE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    default:
      return state;
  }
};
```

```js
// src/context/types.js

export const CHANGE_BIO = "CHANGE_BIO";
```

## Consuming the context

![consuming context](https://i.ibb.co/M6bCf6T/hahaha.gif)

To consume the context we wrap all the components in the UserState components so that UserState can access each child component as its child component. Each component which is wrapped in it can access its context by using the useContext hook which takes the context object as its only parameter and returns the current state.

### Wrapping children components in Provider component

```js
import Profile from "./components/Profile";
import UserState from "./context/user/UserState";

function App() {
  return (
    <UserState>
      <div className="App">
        <div>
          <Profile />
        </div>
      </div>
    </UserState>
  );
}

export default App;
```

Once the components that needs to have access to user context are a child of UserState component, they can access the userState by simply using the context with useContext hook, irrespective of its level in the DOM tree inside its provider(UserState component in this case).

```js
import React, { useContext } from "react";
import UserContext from "../context/user/UserContext";

const Profile = () => {
  const userContext = useContext(UserContext);

  return (
    <div>
      <div>username: {userContext.username}</div>
      <div>bio: {userContext.bio}</div>

      <div>
        <button onClick={() => userContext.changeBio("JS is great!")}>
          change bio
        </button>
      </div>
    </div>
  );
};

export default Profile;
```

## Final Demo

![demo](https://i.ibb.co/7pTwvYV/ezgif-com-gif-maker.gif)

This is a pattern that I personally like to use, whenever I use context API, but you are free to modify it into a pattern that you feel suits your way of doing stuff.
