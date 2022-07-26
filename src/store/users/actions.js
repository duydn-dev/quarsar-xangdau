export function userLoginAction (context, currentUser) {
    context.commit('userLogin', currentUser);
}
