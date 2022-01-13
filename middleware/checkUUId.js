export default function({ route,redirect }) {
    if(!route.query.tk || route.query.tk.length <= 0) {
        return redirect('/redirectToBlueSwan')
    }
}