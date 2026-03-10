const router = require("express").Router()
const auth = require("../MIddlewares/authMiddleware")
const controller = require("../Controllers/taskControlller")

router.get("/", auth, controller.getTasks)
router.post("/", auth, controller.createTask)
router.put("/:id", auth, controller.updateTask)
router.delete("/:id", auth, controller.deleteTask)

module.exports = router