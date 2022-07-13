export const selectorAccount = state => {
    return {
        token: state.account.token,
        id: state.account.id,
        role: state.account.role,
    }
}