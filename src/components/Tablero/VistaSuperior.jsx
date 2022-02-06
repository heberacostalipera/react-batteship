import React from "react";

// Context
import { useFlotas } from "../../context/FlotasProvider";

// Components
import Tabla from "../Tabla/Tabla";

const VistaSuperior = () => {
  const { attackMap, doFire } = useFlotas();
  return (
    <div>
      <Tabla map={attackMap} onClick={doFire} color="secondary" />
    </div>
  );
};

export default VistaSuperior;
