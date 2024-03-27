import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//muestra resultados de las conversiones
const Pantalla = ({ resultadoDolar, resultadoEuro, resultadoUF }) => {
  return (
    <>
      <div className="card">
        <div className="col">
          <div className="card-header">
            <h3>Convertidor de Monedas</h3>
          </div>
          <div className="card-body d-flex justify-content-between">
            <p className="font-weight-bold">Dólar: {resultadoDolar}</p>
            <div className="d-flex justify-content-between">
              <p className="font-weight-bold">Euro: {resultadoEuro}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="font-weight-bold">UF: {resultadoUF}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pantalla;