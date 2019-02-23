export default function ({ store, error, redirect }) {
  // console.log('$$$$ store token: ', store.state.user.token)
  if (!store.state.user.token) {
    redirect('/login')
  }
}
