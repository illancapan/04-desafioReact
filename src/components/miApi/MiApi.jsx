import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//mapea nombres de las moneda
const nombresMonedas = {
  dolar: "Dólar",
  euro: "Euro",
  uf: "UF",
};

const MiApi = ({
  setResultadoDolar,
  setResultadoEuro,
  setResultadoUF,
  agregarConversion,
}) => {
  // estado monto CLP moneda seleccionada estado de carga, el error y el historial
  const [montoCLP, setMontoCLP] = useState("");
  const [moneda, setMoneda] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historial, setHistorial] = useState([]);

  // funcion realiza la conversion
  const convertir = async () => {
    if (moneda === "") {
      // verifica si se ha seleccionado una moneda
      alert("Debes seleccionar una moneda");
      return;
    }

    try {
      setIsLoading(true);
      //peticion a la API
      const res = await fetch(`https://mindicador.cl/api/${moneda}`);
      const data = await res.json();

      const pesosCLP = Number(montoCLP);
      const valorMoneda = Number(data.serie[0].valor); //valor de la moneda desde API

      //conversion formatea el resultado a moneda local
      const conversion = (pesosCLP * valorMoneda).toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
      });

      // agregahistorial
      agregarConversion({
        monto: montoCLP,
        moneda: nombresMonedas[moneda],
        conversion,
      });

      switch (moneda) {
        case "dolar":
          setResultadoDolar(conversion);
          break;
        case "euro":
          setResultadoEuro(conversion);
          break;
        case "uf":
          setResultadoUF(conversion);
          break;
        default:
          break;
      }

      // agregar la conversion al historial 10 conversiones
      setHistorial([
        { monto: montoCLP, moneda: nombresMonedas[moneda], conversion },
        ...historial.slice(0, 9),
      ]);
    } catch (error) {
      setError(error.message); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMontoCLP("");
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // caso de error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // orden historial de conversiones por a ---> z
  const historialOrdenado = [...historial].sort((a, b) => {
    const nombreMonedaA = a.moneda.toUpperCase();
    const nombreMonedaB = b.moneda.toUpperCase();
    if (nombreMonedaA < nombreMonedaB) {
      return -1;
    }
    if (nombreMonedaA > nombreMonedaB) {
      return 1;
    }
    return 0;
  });
  return (
    <>
      <div className="card p-3">
        <div className="form-group">
          <label className="mb-2" htmlFor="clp">
            Monto en Pesos CLP:
          </label>
          <div className="mb-2">
            <input
              type="text"
              id="clp"
              className="form-control"
              placeholder="Ingrese monto en CLP"
              value={montoCLP}
              onChange={(e) => setMontoCLP(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="mb-2" htmlFor="moneda">
            Moneda a convertir:
          </label>
          <select
            id="moneda"
            className="form-control mb-2"
            value={moneda}
            onChange={(e) => setMoneda(e.target.value)}
          >
            <option value="" disabled>
              Seleccione moneda a cambiar
            </option>
            {Object.keys(nombresMonedas).map((key) => (
              <option key={key} value={key}>
                {nombresMonedas[key]}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block mb-2 mt-2 w-100"
          onClick={convertir}
        >
          Convertir
        </button>

        <div className="historial">
          <h2>Historial de Conversiones</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Monto CLP</th>
                <th>Moneda</th>
                <th>Conversion</th>
              </tr>
            </thead>
            <tbody>
              {/* <Buscador /> */}
              {historialOrdenado.map((item, index) => (
                <tr key={index}>
                  <td>{item.monto}</td>
                  <td>{item.moneda}</td>
                  <td>{item.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MiApi;
