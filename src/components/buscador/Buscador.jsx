import React, { useState } from "react";

const Buscador = ({ resultados, filtrarHistorialPorTipoMoneda }) => {
  const [tipoMoneda, setTipoMoneda] = useState("");
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);

  const handleTipoMonedaChange = (event) => {
    const tipoSeleccionado = event.target.value;
    setTipoMoneda(tipoSeleccionado);

    const historialFiltrado = filtrarHistorialPorTipoMoneda(tipoSeleccionado);
    setResultadosFiltrados(historialFiltrado);
  };

  return (
    <>
      <label className="container d-flex" htmlFor="tipoMoneda">Selecciona moneda:</label>
      <select
        id="tipoMoneda"
        value={tipoMoneda}
        onChange={handleTipoMonedaChange}
      >
        <option value="">Todos</option>
        <option value="Dólar">Dólar</option>
        <option value="Euro">Euro</option>
        <option value="UF">UF</option>
      </select>

      <ul>
        {resultadosFiltrados.map((resultado, index) => (
          <li key={index}>
            {resultado.monto} CLP - {resultado.moneda} - {resultado.conversion}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Buscador;
