export default function({ route,redirect }) {
    if(!route.query.token || route.query.token.length <= 0) {
        return redirect('/redirectToBlueSwan')
    }
}