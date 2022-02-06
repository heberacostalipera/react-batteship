import React, { createContext, useContext, useEffect, useState } from "react";

// utils
import {
  generateGrid,
  getRandomInt,
  getRandomPosition,
  getShips,
  orientations,
  parseArray,
  players,
  states,
} from "../utils/utils";

const FlotaContext = createContext();

export const useFlotas = () => useContext(FlotaContext);

const emptyGrid = generateGrid();
const emptyShips = getShips();

const FlotasProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  // Attack
  const [target, setTarget] = useState([]);
  const [attackMap, setAttackMap] = useState(emptyGrid);

  // User
  const [myShips, setMyShips] = useState(emptyShips);
  const [allyMap, setAllyMap] = useState(emptyGrid);

  // Enemy
  const [enemyTarget, setEnemyTarget] = useState([]);
  const [enemyMap, setEnemyMap] = useState(null);
  const [enemyShips, setEnemyShips] = useState([]);
  const [availableStrikes, setAvailableStrikes] = useState(null);

  // Ending
  const [sinkedAllies, setSinkedAllies] = useState(0);
  const [sinkedEnemies, setSinkedEnemies] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!initialized) {
      let newEnemyMap = emptyGrid;

      const newEnemyShips = emptyShips.map((ship) => {
        const { newMap, positions } = getRandomPosition(ship, newEnemyMap);
        newEnemyMap = newMap;
        return { ...ship, positions };
      });

      setEnemyMap(newEnemyMap);
      setEnemyShips(newEnemyShips);

      // generate strikes for AI
      const newStrikes = [];
      emptyGrid.forEach((rows, rowIndex) => {
        rows.forEach((_, colIndex) => {
          newStrikes.push({ row: rowIndex, col: colIndex });
        });
      });

      setAvailableStrikes(newStrikes);
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    // Check end of game
    if (enemyShips.length > 0) {
      if (sinkedEnemies === enemyShips.length) setWinner(players.PLAYER);
      else if (sinkedAllies === myShips.length) setWinner(players.PC);
    }
  }, [sinkedEnemies, sinkedAllies, myShips.length, enemyShips.length]);

  if (!enemyMap) return null;

  const hitEnemyShip = (id) => {
    const newEnemyShips = parseArray(enemyShips);
    const index = newEnemyShips.findIndex((item) => item.id === id);
    const { size, hits, positions } = newEnemyShips[index];

    const newHits = hits + 1;
    newEnemyShips[index].hits = newHits;
    setEnemyShips(newEnemyShips);

    return [newHits === size ? states.SINKED : states.TOUCHED, positions];
  };

  const hitAllyShip = (id) => {
    const newAllyShips = parseArray(myShips);
    const index = newAllyShips.findIndex((item) => item.id === id);
    const { size, hits, positions } = newAllyShips[index];

    const newHits = hits + 1;
    newAllyShips[index].hits = newHits;
    setMyShips(newAllyShips);

    return [newHits === size ? states.SINKED : states.TOUCHED, positions];
  };

  const sinkShip = (positions) => {
    const newAttackMap = parseArray(attackMap);
    positions.forEach(({ row, col }) => {
      newAttackMap[row][col].status = states.SINKED;
    });
    setAttackMap(newAttackMap);
    setSinkedEnemies(sinkedEnemies + 1);
  };

  const sinkAllyShip = (positions) => {
    const newAllyMap = parseArray(allyMap);
    positions.forEach(({ row, col }) => {
      newAllyMap[row][col].status = states.SINKED;
    });
    setAllyMap(newAllyMap);
    setSinkedAllies(sinkedAllies + 1);
  };

  const doEnemyFire = () => {
    let sinked = false;
    const newAllyMap = parseArray(allyMap);
    const newStrikes = parseArray(availableStrikes);

    const index = getRandomInt(newStrikes.length - 1);
    const { row, col } = newStrikes[index];

    newStrikes.splice(index, 1);
    setAvailableStrikes(newStrikes);

    const hitTarget = allyMap[row][col];

    let status = states.MISSED;
    if (hitTarget.status !== states.EMPTY) {
      const [result, positions] = hitAllyShip(hitTarget.id);
      if (result === states.SINKED) {
        sinkAllyShip(positions);
        sinked = true;
      }
      status = result;
    }

    setEnemyTarget([row, col, status]);

    if (!sinked) {
      newAllyMap[row][col].status = status;
      setAllyMap(newAllyMap);
    }
  };

  const doFire = (row, col) => {
    let sinked = false;
    const newAttackMap = parseArray(attackMap);

    const hitTarget = enemyMap[row][col];

    let status = states.MISSED;
    if (hitTarget.status !== states.EMPTY) {
      const [result, positions] = hitEnemyShip(hitTarget.id);
      if (result === states.SINKED) {
        sinkShip(positions);
        sinked = true;
      }
      status = result;
    }

    setTarget([row, col, status]);

    if (!sinked) {
      newAttackMap[row][col].status = status;
      setAttackMap(newAttackMap);
    }

    doEnemyFire();
  };

  const placeShip = (row, col, orientation, shipIndex) => {
    const newAllyMap = parseArray(allyMap);
    const newShips = parseArray(myShips);
    const currentShip = newShips[shipIndex];

    if (currentShip.positions && currentShip.positions.length > 0) {
      // remove old ship from map if user moving an already placed ship
      currentShip.positions.forEach((prevPos) => {
        newAllyMap[prevPos.row][prevPos.col] = { status: states.EMPTY };
      });
    }

    let positions = [];
    let overlapped = false;

    const updatePos = (newPos) => {
      if (newAllyMap[newPos.row][newPos.col].status === states.EMPTY) {
        positions.push(newPos);
        newAllyMap[newPos.row][newPos.col] = {
          id: currentShip.id,
          status: states.OCCUPIED,
        };
      } else {
        overlapped = true;
      }
    };

    if (orientation === orientations.VERTICAL) {
      for (let i = 0; i < currentShip.size; i++) {
        const newPos = { row: row + i, col };
        updatePos(newPos);
      }
    } else if (orientation === orientations.HORIZONTAL) {
      for (let i = 0; i < currentShip.size; i++) {
        const newPos = { row, col: col + i };
        updatePos(newPos);
      }
    }

    if (!overlapped) {
      currentShip.positions = positions;
      setAllyMap(newAllyMap);
      setMyShips(newShips);
    }
  };

  const resetGame = () => {
    setInitialized(false);
    setTarget([]);
    setAttackMap(emptyGrid);
    setMyShips(emptyShips);
    setAllyMap(emptyGrid);
    setEnemyTarget([]);
    setEnemyMap(null);
    setEnemyShips([]);
    setAvailableStrikes(null);
    setSinkedAllies(0);
    setSinkedEnemies(0);
    setWinner(0);
  };

  return (
    <FlotaContext.Provider
      value={{
        allyMap,
        attackMap,
        doFire,
        enemyTarget,
        myShips,
        placeShip,
        target,
        winner,
        resetGame,
      }}
    >
      {children}
    </FlotaContext.Provider>
  );
};

export default FlotasProvider;
