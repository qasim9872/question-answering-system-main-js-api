import Router from "express-promise-router"

// Import all routes
import authRoutes from "./auth"
import baseRoutes from "./base"
import questionRoutes from "./question"

const router = Router()

router.use("/", baseRoutes)
router.use("/auth", authRoutes)
router.use("/question", questionRoutes)

export default router
