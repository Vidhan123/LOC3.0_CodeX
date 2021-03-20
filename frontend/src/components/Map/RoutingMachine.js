import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map, pickUp, drop } = this.props;
    let leafletElement = L.Routing.control({
      waypoints:[L.latLng(pickUp.lat,pickUp.lng),L.latLng(drop.lat,drop.lng)],
      position: 'topleft',
      routeWhileDragging: false,
      lineOptions: {
        styles: [{color: '#4A89F3', opacity: 1, weight: 5}]
     }
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}

export default withLeaflet(Routing);