import guestRoutes from "./GuestRoutes"
import loginRoutes from "./LoginRoutes"

const applicationRoutes = [...guestRoutes, ...loginRoutes]

export default applicationRoutes