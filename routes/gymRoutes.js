const express = require('express');
const gymController = require('../controllers/gymController');
const authController = require('../controllers/authController');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

router
  .route('/radius/:zipcode/:distance')
  .get(gymController.getGymsInRadius);

router
  .route('/')
  .get(gymController.getGyms)
  .post(
    authController.protect,
    roleCheck.authorize('gymOwner', 'admin'),
    gymController.createGym
  );

router
  .route('/:id')
  .get(gymController.getGym)
  .put(
    authController.protect,
    roleCheck.authorize('gymOwner', 'admin'),
    gymController.updateGym
  )
  .delete(
    authController.protect,
    roleCheck.authorize('gymOwner', 'admin'),
    gymController.deleteGym
  );

module.exports = router;