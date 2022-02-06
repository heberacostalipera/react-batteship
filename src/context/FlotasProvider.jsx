import React, { createContext, useContext, useEffect, useState } from "react";

// utils
import {
  generateGrid,
  getRandomPosition,
  getShips,
  orientations,
  parseArray,
  states,
} from "../utils/utils";

const FlotaContext = createContext();

export const useFlotas = () => useContext(FlotaContext);

const FlotasProvider = ({ children }) => {
  // Attack
  const [target, setTarget] = useState([]);
  const [attackMap, setAttackMap] = useState(generateGrid());

  // User
  const [myShips, setMyShips] = useState(getShips());
  const [allyMap, setAllyMap] = useState(generateGrid());

  // Enemy
  const [enemyMap, setEnemyMap] = useState(null);
  const [enemyShips, setEnemyShips] = useState(null);

  useEffect(() => {
    let newEnemyMap = generateGrid();

    const newEnemyShips = getShips().map((ship) => {
      const { newMap, positions } = getRandomPosition(ship, newEnemyMap);
      newEnemyMap = newMap;
      return { ...ship, positions };
    });

    setEnemyMap(newEnemyMap);
    setEnemyShips(newEnemyShips);
  }, []);

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

  const sinkShip = (positions) => {
    const newAttackMap = parseArray(attackMap);
    positions.forEach(({ row, col }) => {
      newAttackMap[row][col].status = states.SINKED;
    });
    setAttackMap(newAttackMap);
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

  return (
    <FlotaContext.Provider
      value={{
        allyMap,
        attackMap,
        doFire,
        myShips,
        target,
        placeShip,
      }}
    >
      {children}
    </FlotaContext.Provider>
  );
};

export default FlotasProvider;
