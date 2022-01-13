export default function({ route,redirect }) {
    if(!route.query.user_tk || route.query.user_tk.length <= 0) {
        return redirect('/redirectToBlueSwan')
    }
}