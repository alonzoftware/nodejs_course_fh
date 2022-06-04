import { Router } from "express";
import { userDel, userGet, userGetById, userPost, userPut } from "../controllers/user";

const router = Router();

router.get('/', userGet)
router.get('/:id', userGetById)
router.post('/', userPost)
router.put('/:id', userPut)
router.delete('/:id', userDel)

export default router;