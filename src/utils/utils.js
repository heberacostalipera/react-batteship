export const parseArray = (arr) => JSON.parse(JSON.stringify(arr));

export const players = {
  PLAYER: "player",
  PC: "pc",
};
export const states = {
  TOUCHED: "touched",
  SINKED: "sinked",
  EMPTY: "empty",
  MISSED: "missed",
  OCCUPIED: "occupied",
};

export const orientations = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
};

export const generateGrid = (len = 10) => {
  // generate grid
  // default is 10x10
  const row = new Array(len).fill({ status: states.EMPTY });
  const grid = new Array(len).fill(row);
  return grid;
};

export const getAlphabetArray = (len = 10) => {
  const alpha = Array.from(Array(len)).map((_, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  return alphabet;
};

const ship = {
  hits: 0,
  positions: [],
};

const ships = [
  {
    ...ship,
    size: 2,
    id: "2",
  },
  {
    ...ship,
    size: 3,
    id: "3a",
  },
  {
    ...ship,
    size: 3,
    id: "3b",
  },
  {
    ...ship,
    size: 4,
    id: "4",
  },
  {
    ...ship,
    size: 5,
    id: "5",
  },
];

export const getShips = () => {
  return ships;
};

export const getRandomInt = (max) => Math.floor(Math.random() * (max + 1));

const getRandomOrientation = () =>
  orientations[Object.keys(orientations)[getRandomInt(1)]];

const getRandomPlacement = (shipLen, gridLen = 10) => {
  const orientation = getRandomOrientation();

  // make sure ship stays inside map
  const row = getRandomInt(
    orientation === orientations.VERTICAL ? gridLen - shipLen : gridLen - 1
  );
  const col = getRandomInt(
    orientation === orientations.HORIZONTAL ? gridLen - shipLen : gridLen - 1
  );

  return {
    col,
    row,
    orientation,
  };
};

const updateMap = ({ size, id, row, col, orientation, map }) => {
  const newMap = parseArray(map);
  const positions = [];

  let i = 0;
  let overlapped = false;

  const updatePositions = (row, col) => {
    positions.push({ row, col });
    newMap[row][col] = {
      id,
      status: states.OCCUPIED,
    };
  };

  if (orientation === orientations.HORIZONTAL) {
    while (!overlapped && i < size) {
      const pos = col + i;
      if (map[row][pos].status !== states.EMPTY) {
        overlapped = true;
      } else updatePositions(row, pos);
      i++;
    }
  }

  if (orientation === orientations.VERTICAL) {
    while (!overlapped && i < size) {
      const pos = row + i;
      if (map[pos][col].status !== states.EMPTY) {
        overlapped = true;
      } else updatePositions(pos, col);
      i++;
    }
  }

  return { overlapped, newMap, positions };
};

export const getRandomPosition = ({ size, id }, map) => {
  let repeat;
  let data;
  let i = 0;

  do {
    const { overlapped, ...rest } = updateMap({
      ...getRandomPlacement(size),
      id,
      map,
      size,
    });
    data = rest;

    i++;

    repeat = overlapped;
    if (i === 100) repeat = false;
  } while (repeat);

  return data;
};
