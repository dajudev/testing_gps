import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

export function MapView({ latitud, longitud }){


  const initialCenter = [4.628032, -74.110942];
  const initialZoom = 6;
  
  
  var position = [0, 0];
  if(latitud !== 0 && longitud !== 0){
    position = [latitud, longitud];
  }
  
    const customIcon = new Icon({
      iconUrl : require("../images/marker.png"),
      iconSize : [38,38]
    });


    return (
        <MapContainer center={initialCenter} zoom={initialZoom}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />
          {position !== 0 && 
            <Marker position={position} icon={customIcon}> 
              <Popup>
                  Punto Localizado
              </Popup>
            </Marker>
          }
          
        </MapContainer>
    );
}
