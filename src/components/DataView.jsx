import {useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
/* CSS IMPORTS */
import '../styles/DataView.css'; 
import '../styles/Button.css';
/* COMPONENTS IMPORTS */
import { MapView } from "./MapView";
import { Navigation } from "./Navigation";

export function DataView(){

    const baseUrl = "http://localhost/finanzauto_back/index.php";

    const [data,setData] = useState([]);
    const [mapData, setMapData] = useState({
        latitud : 0,
        longitud : 0,
        info : ""
    });

    /**
     * Funcion encargada de generar una petición a la API para recuperar información gps de una ubicación
     * aletoria dentro de Colombia.
     */
    const generarRandom = async()=>{
        try {
            await axios.get(baseUrl)
            .then(response=>{
                let infoDate =  response.data.timespan.split(" ")[0];
                let hour = response.data.timespan.split(" ")[1];
                response.data.hour = hour;
                response.data.infoDate = infoDate;
                let valores = response.data.gcoord.split(",");
                valores[0] = valores[0].replace("[","");
                valores[1] = valores[1].replace("]","");
                let geoData = {
                    latitud : valores[0],
                    longitud : valores[1]
                };
                setMapData({
                    latitud :  geoData.latitud,
                    longitud : geoData.longitud,
                    mess : "Punto Aletorio"
                })
                setData(response.data);

            });
        } catch (error) {
            alert("Hubo un error al generar la posición intentelo de nuevo.");
        }
        
    }

    /**
     * Funcion encargada de guardar la posición actual mostrada en la interfaz dentro de la base de 
     * datos SQL
     */
    const guardarPosicion = async()=>{
        if(data.length === 0){
            alert("Debe de primero generar una posición aletoria");
        }else{
            await axios.post(baseUrl,data)
            .then(function(response){
                console.log(response.data);
            });
        }
    }

    return (
        <div className="dataview-main">
            <Navigation/>
            <div className="center-container">
                <h1>Random Pointer Generator</h1>
                <div className="map-container">
                    <MapView latitud={mapData.latitud} longitud={mapData.longitud} />
                </div>
            </div>
            <div className="info-container">
                <div className="position-data-container">
                    <h1>Positión</h1>
                    <table>
                    <tbody>
                        <tr>
                            <td className='data'>City:</td>
                            <td className='value'>{data.site} </td>
                        </tr>
                        <tr>
                            <td className='data'>Town:</td>
                            <td className='value'>{data.subsite} </td>
                        </tr>
                        <tr>
                            <td className='data'>Postal Code:</td>
                            <td className='value'>{data.pcode}</td>
                        </tr>
                        <tr>
                            <td className='data'>TimeZone:</td>
                            <td className='value'>{data.timezone}</td>
                        </tr>
                        <tr>
                            <td className='data'>Date:</td>
                            <td className='value'>{data.infoDate}</td>
                        </tr>
                        <tr>
                            <td className='data'>Hour:</td>
                            <td className='value'>{data.hour}</td>
                        </tr>
                        <tr>
                            <td className='data'>Temp:</td>
                            <td className='value'>{data.temp}</td>
                        </tr>
                    </tbody>
                </table>
                </div>

                <Button   className="custom-btn"  variant="warning" size="lg" onClick={generarRandom} >Randomize</Button>
                <Button   className="custom-btn"  variant="dark" size="lg"   onClick={guardarPosicion} >Save</Button>
                <Button   className="custom-btn"  variant="danger" size="lg" >Track</Button>
            </div>
        </div>
        
    );
}