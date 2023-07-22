const express = require("express");
const router = express.Router();

const {
  createTournament,
  editTournament,
  getTournaments,
  getTournament,
  joinRequestTournament,
  getOpenTournaments,
  joinConfirmTournament,
  declineRequestTournament,
  joinOpenTournament,
  leaveTournament,
  cancelRequestTournament,
} = require("../controllers/tournament.controller");

const userExtractor = require("../middlewares/userExtractor");

router.get("/torneos", userExtractor, getTournaments);

router.get("/torneos/explorar", userExtractor, getOpenTournaments);

router.get("/torneos/:tournament", userExtractor, getTournament);

router.post("/torneos/crear", userExtractor, createTournament);

router.post(
  "/torneo-abierto/unirse/:tournament",
  userExtractor,
  joinOpenTournament
);

router.post("/torneo/unirse/:tournament", userExtractor, joinRequestTournament);

router.post(
  "/torneo/unirse-confirmacion/:tournament/:user/:notification",
  userExtractor,
  joinConfirmTournament
);

router.post(
  "/torneo/declinar-invitacion/:tournament/:user/:notification",
  userExtractor,
  declineRequestTournament
);

router.post(
  "/torneo/cancelar-invitacion/:tournament/:user",
  userExtractor,
  cancelRequestTournament
);

router.post("/torneo/abandonar/:tournament", userExtractor, leaveTournament);

router.put("/torneos/modificar", userExtractor, editTournament);

module.exports = router;
