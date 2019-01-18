import Router from "express-promise-router"
import list from "../../utils/list-routes"

// Import all routes
import authRoutes from "./auth"
import baseRoutes from "./base"
import questionRoutes from "./question"

const router = Router()

router.use("/", baseRoutes)
list("", "baseRoutes", baseRoutes)

router.use("/auth", authRoutes)
list("/auth", "authRoutes", authRoutes)

router.use("/question", questionRoutes)
list("/question", "questionRoutes", questionRoutes)

export default router
