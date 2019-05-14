export default function ({ store, redirect }) {
  if (!store.state.User.authUser) {
    redirect('/login')
  }
} 