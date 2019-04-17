import Router from "express-promise-router"
import list from "../../utils/list-routes"

// Import all routes
import authRoutes from "./auth"
import baseRoutes from "./base"
import questionRoutes from "./question"
import statsRoutes from "./stats"
import userRoutes from "./user"
import usersRoutes from "./users"

const router = Router()

router.use("/", baseRoutes)
list("", "baseRoutes", baseRoutes)

router.use("/user", userRoutes)
list("/user", "userRoutes", userRoutes)

router.use("/users", usersRoutes)
list("/users", "usersRoutes", usersRoutes)

router.use("/auth", authRoutes)
list("/auth", "authRoutes", authRoutes)

router.use("/question", questionRoutes)
list("/question", "questionRoutes", questionRoutes)

router.use("/stats", statsRoutes)
list("/stats", "statsRoutes", statsRoutes)

export default router
