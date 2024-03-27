import { useState } from "react";
import MiApi from "./components/miApi/MiApi";
import Pantalla from "./components/pantalla/Patalla";
import Buscador from "./components/buscador/Buscador";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  // estado resultados de las conversiones y el historial
  const [resultadoDolar, setResultadoDolar] = useState("");
  const [resultadoEuro, setResultadoEuro] = useState("");
  const [resultadoUF, setResultadoUF] = useState("");
  //eestado del historial
  const [historial, setHistorial] = useState([]);

  //funcion para agregar una conversion al historial
  const agregarConversion = (conversion) => {
    setHistorial([conversion, ...historial.slice(0, 9)]);
    console.log("Agregando conversión:", conversion);
  };

    // filtrar el historial tipo moneda
    const filtrarHistorialPorTipoMoneda = (tipoMoneda) => {
      return historial.filter((item) => item.moneda === tipoMoneda);
    };
  return (
    <>
      <div className="card p-3">
        <div className="d-flex justify-content-center">
          <div className="w-100">
            <Pantalla
              resultadoDolar={resultadoDolar}
              resultadoEuro={resultadoEuro}
              resultadoUF={resultadoUF}
              agregarConversion={agregarConversion}
            />
            <MiApi
              setResultadoDolar={setResultadoDolar}
              setResultadoEuro={setResultadoEuro}
              setResultadoUF={setResultadoUF}
              agregarConversion={agregarConversion}
            />
            <Buscador
              resultados={historial}
              filtrarHistorialPorTipoMoneda={filtrarHistorialPorTipoMoneda}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
