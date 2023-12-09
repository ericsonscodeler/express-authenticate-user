import { Router } from 'express'
import { authenticateUser } from '../controller/authenticate-user'
import { createUser } from '../controller/create-user'

export default (router: Router) => {
  router.post('/user', createUser)
  router.post('/authenticate', authenticateUser)
}
