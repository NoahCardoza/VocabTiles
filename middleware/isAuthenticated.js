export default function ({ store, redirect, route }) {
  // if the user is not logged and not on the authenticate
  // page, redirect them there
  if (store.state.user === null && route.name !== 'authenticate') {
    redirect('/authenticate');
  }

  // if the user is logged in and is at the authentication
  // page redirect, them to the index route
  if (store.state.user !== null && route.name === 'authenticate') {
    redirect('/');
  }
}
