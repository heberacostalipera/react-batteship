import React from "react";

// Context
import { useFlotas } from "../../context/FlotasProvider";

// Components
import Tabla from "../Tabla/Tabla";

const VistaInferior = () => {
  const { allyMap } = useFlotas();

  return (
    <div>
      <Tabla displayShips map={allyMap} alwaysEnabled />
    </div>
  );
};

export default VistaInferior;
