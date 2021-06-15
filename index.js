// Just some DOM manipulation to put a title
// on the page, you can ignore.
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Redux Review</h1><p>Open the console below and follow along with the source code</p>`;

/**
 * REDUX REVIEW
 *
 * The following code is a basic implementation of a Redux
 * store.
 *
 * The purpose of a Redux store is to provide an object that
 * you can store data inside of. This object is referred to as
 * "state". This concept is similar to "this.state" in React
 * Components. The difference is, you can access this "state"
 * object anywhere in your application, and not just within
 * a specific Component.
 *
 * In order for Redux to create this object, you need to
 * provide a template for the state object. This "template" is
 * referred to as the "default state".
 *
 * The most common way to do this is to create an object
 * variable named "defaultState", and create the keys and
 * values that you'd like to start your application with.
 *
 * In this example, we set up our defaultState variable
 * which will keep track of a single value, called "total".
 * The initial value of this total will be 0
 *
 * Redux will use this "template" object to create your "state"
 * object. This "state" object will live _INSIDE_ of Redux.
 * Specifically, the "state" object will live inside of a Redux
 * "store".
 *
 * A Redux "store" is a special object that has...
 *   - A "state" property, which is the object that holds any
 *     data you want. It starts out as a copy of your
 *     "defaultState" object. It protects this "state" property
 *     by only allowing you to change it with specific
 *     instructions
 *   - A "dispatch()" method, which is what you use to make
 *     changes to the "state" object inside of your Redux
 *     store.
 *   - A "getState()" method, which will return whatever is in
 *     the "state" obejct inside of your Redux store. You'll
 *     use this throughout your application to get data from
 *     your "state" object. For example, if you were building
 *     an e-commerce app, you might use getState() to get a
 *     list of items that have been added to the cart.
 *
 *     Ex: const currentState = store.getState();
 *         const cartItems = currentState.itemsInCart
 *                                        ^ an array of items
 *   - A "subscribe()" method, which will allow you to run a
 *     callback function every single time "dispatch()" is
 *     called.
 *
 * In order for Redux to update your "state", you need to give
 * it a Reducer Function. This function is one that your Redux
 * store will use to make changes to the data in the "state"
 * object that it is keeping track of for you.
 *
 * This is important - Redux does not allow you to just access
 * your state object and make changes directly to it. You have
 * to provide specific instructions to your Redux store so that
 * it knows how to manage your "state" object. This is to
 * prevent someone else from writing code that makes an
 * unexpected change to your "state" and potentially break your
 * application.
 *
 * These "instructions" are comprised of two things:
 *
 * - A Reducer Function, which will be called every time you
 *   use the "dispatch()" method on your store.
 *   This function is _NOT_ used directly by you. It is created
 *   by you, and then given to your Redux store when you create
 *   it. Imagine that your store is an actual store, and you
 *   are training a new manager. The Reducer Function is the
 *   operation manual. "When something happens in the store,
 *   find the corresponding instruction and follow it"
 * - Actions - Actions are just objects. But they serve a
 *   specific purpose. Whenever you call the "dispatch()"
 *   method, you will pass it an Action object. This object
 *   _MUST_ have a "type" property that describes what it does.
 *
 * When you need to make a change to the data inside your
 * "state" object, you will create an Action object, and then
 * give it to the "dispatch()" method.
 *
 * When you invoke the "dispatch()" method with an action
 * object, your Redux store will _INTERNALLY_ run the Reducer
 * Function that you provided it when you created it.
 * Specifically, it will pass it two arguments:
 *
 * - state - whatever is inside the current "state" object
 * - action - the Action object you passed to "dispatch()"
 *
 * Your Reducer function will look at the "type" property of
 * the Action object, and return a _NEW_ state object, with the
 * change that you specified. This code that returns the new
 * "state" object is _YOUR_ responsibility to write. You have
 * to figure out the logic here.
 *
 * The thing to remember here:
 *
 * Action Objects are only useful, if...
 *
 * - they have a "type" property
 * - AND that "type" property's value is caught by your
 *   reducerFunction's switch statement
 *
 * It's your job as the developer to define the Actions, AND
 * to write the code that processes them in the Reducer.
 *
 * Follow along with the example below, and then try the practice at the end
 */

// We will use this function later to create our Redux Store
import { createStore } from 'redux';

// The "template" for our state
const defaultState = {
  total: 0
};

// Our Reducer Function - The operation manual we hand to
// our new manager that explain how to manage our "store"
function reducerFunction(state = defaultState, action) {
  /**
   * We allow for any number of Action "types" (instructions),
   *  and use a switch statement to "reduce" this list of
   *  instructions down to a single one, and then follow
   * the instruction by making whatever change we need.
   *
   * In this example, we have 1 instruction to follow, which is
   * to increment the total by one. We can dispatch any action
   * object we like, but we will only have a single instruction
   * to follow, unless we add more.
   */

  // What is the "type" property of the action?
  switch (action.type) {
    // If it is "incrementTotalByOne"
    case 'incrementTotalByOne':
      // Return a new object
      return {
        /**
         * The total will be equal to whatever the current
         * total inside the state is, plus one.
         */
        total: state.total + 1
      };
    case 'decrementTotalByOne':
      return {
        total: state.total - 1
      };
    case 'multiplyByTwo':
      return {
        total: state.total * 2
      };
    case 'multiplyByOneHundred':
      return {
        total: state.total * 100
      };
    case 'reset':
      return {
        total: 0
      };
  }
  /**
   * If the action
   *  - does not have a type property
   *  - has a type property, but it does not match any case
   *    in the switch statement above...
   *
   * ...then we'll just return the state without any changes
   */
  return state;
}

/**
 * We are creating the store, and providing the operation
 * manual. Whenever store.dispatch() is called, it will invoke
 * the reducerFunction
 */
const store = createStore(reducerFunction);

/**
 * The callback function that we pass to
 * store.subscribe() will be invoked any time that
 * store.dispatch() is called. Setting up a
 * subscribe like this isn't necessary for our
 * Redux store to work, we're just doing this
 * so that we can see our changes in the
 * console and help our understanding
 */
store.subscribe(() => {
  console.log('Action has been dispatched');
  const state = store.getState();
  console.log(state);
});

// An action object, with its type set
const actionObject = {
  type: 'incrementTotalByOne'
};

/**
 * This will turn into:
 * reducerFunction(store.getState(), actionObject)
 *
 * Since our actionObject has a type of "incrementTotalByOne"
 * it will be found in the switch statement, and we'll return
 * a new state object that includes the change we wanted.
 *
 * Uncomment the following line to see it work.
 * Note that you'll see it work in the console
 * as a result of our store.subscribe() above.
 */
//store.dispatch(actionObject); // total should now be 1

/**
 * We can dispatch it again! Uncomment the following line,
 * and you'll see that the total should now be 2
 */
//store.dispatch(actionObject);

/**
 * Another action object, with a type that does not match
 * anything in our reducerFunction's "switch" statement.
 * The function will still be called, but it will not change
 * the state object. The total will be 1 and no other changes
 * will occur
 */
const uselessAction = {
  type: 'thisWillNotDoAnything'
};
/**
 * We can dispatch this useless action.
 * Even though our action isn't doing anything, because our
 * reducerFunction was invoked, store.subscribe() picked it up
 *
 * Uncomment the following two lines of code to see for
 * yourself
 */

//console.log('Dispatching a useless action');
//store.dispatch(uselessAction);

/**
 * PRACTICE
 *
 * Using the space below:
 * 1. Create an object variable that has a type of
 * "decrementTotalByOne"
 * 2. Write the line of code that will dispatch the action
 * 3. Scroll up, and modify the reducerFunction to support
 *    this action type by adding a new "case" to the switch
 *    statement
 * 4. Confirm that you see that the total is back down to 1
 *    after your new action is dispatched
 * 5. Repeat steps 1 through 4 to create the following:
 *   - Create and dispatch a "multiplyByTwo" action that
 *     multiplies the total by two
 *   - Create and dispatch a "multiplyByOneHundred" action
 *     that multiplies the total by 100
 *   - Create and dispatch a "reset" action that sets the
 *     total back to 0
 * 6. Repeat steps 1 through 4 and create other mathematical
 *    instructions that do different things to the total. The
 *    purpose here is to repeat until you feel that you have
 *    an understanding.
 */

const decrementByOne = {
  type: 'decrementTotalByOne'
};

store.dispatch(decrementByOne);

const multiplyByTwo = {
  type: 'multiplyByTwo'
};

store.dispatch(multiplyByTwo);

const multiplyByOneHundred = {
  type: 'multiplyByOneHundred'
};

store.dispatch(multiplyByOneHundred);

const reset = {
  type: 'reset'
};

store.dispatch(reset);
