import React from "react";

// Material
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Context
import { useFlotas } from "../../context/FlotasProvider";

// Utils
import { getAlphabetArray, getRandomInt, states } from "../../utils/utils";

const alphabet = getAlphabetArray();

const hitMessages = ["IT'S A HIT!", "Strike!", "Got 'em!", "Nice shot, sir!"];
const destroyMessages = [
  "Is history!",
  "Ship down!",
  "Detroyed!",
  "Enemy down!",
  "We're not gonna see them around anymore, cap!",
];
const missMessages = [
  "There's nothing there...",
  "Water",
  "Nothing...",
  "That's a miss",
  "Missed",
  "Nope, nothing yet",
  "That was a fish...",
];

const VistaLateral = ({ onClick }) => {
  const {
    target: [row, col, status],
    enemyTarget: [enemyRow, enemyCol, enemyStatus],
  } = useFlotas();
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>
          <b>
            MY TARGET:
            <Typography component="span" color="primary">
              <b>{row > -1 && col > -1 && ` ${alphabet[row]}; ${col + 1}`}</b>
            </Typography>
          </b>
        </Typography>
        {status === states.MISSED && (
          <Typography>
            {missMessages[getRandomInt(missMessages.length - 1)]}
          </Typography>
        )}
        {status === states.TOUCHED && (
          <Typography color="primary">
            <b>{hitMessages[getRandomInt(hitMessages.length - 1)]}</b>
          </Typography>
        )}
        {status === states.SINKED && (
          <Typography color="secondary">
            <b>{destroyMessages[getRandomInt(destroyMessages.length - 1)]}</b>
          </Typography>
        )}
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <b>
            ENEMY TARGET:
            <Typography component="span" color="secondary">
              <b>
                {enemyRow > -1 &&
                  enemyCol > -1 &&
                  ` ${alphabet[enemyRow]}; ${enemyCol + 1}`}
              </b>
            </Typography>
          </b>
        </Typography>
        {enemyStatus === states.MISSED && <Typography>Missed</Typography>}
        {enemyStatus === states.TOUCHED && (
          <Typography color="secondary">Hit</Typography>
        )}
        {enemyStatus === states.SINKED && (
          <Typography color="secondary">
            <b>Destroyed</b>
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default VistaLateral;
