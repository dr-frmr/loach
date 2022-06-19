import Urbit from "@urbit/http-api"
const api = new Urbit("", "", "loach")
api.ship = window.ship
window.api = api
export default api
