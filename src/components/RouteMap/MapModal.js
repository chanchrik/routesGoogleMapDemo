import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import RouteMap from "../RouteMap/RouteMap";
import mapStyles from "./RouteMap.module.css";

const MapModal = () => {
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const routeStopsList = useSelector(
    (state) => state.mapSelection.routesStopsList
  );
  const routeOptionsList = useSelector(
    (state) => state.mapSelection.routesSelectList
  );
  const currentRoute = useSelector((state) => state.mapSelection.route);
  const dispatch = useDispatch();
  const closeCurrentRoute = () => {
    dispatch({ type: "closeMap", payLoad: false });
  };
  const addRouteToMaps = (event) => {
    const routeStops = [];
    let stopList = [];
    event.forEach((routeItem) => {
      stopList = [];
      routeItem.value.stopsList.forEach((stop) => {
        stopList.push(stop.location);
      });
      routeStops.push({
        id: routeItem.value.id,
        name: routeItem.value.name,
        stopsList: stopList
      });
    });
    routeStops.length &&
      dispatch({
        type: "addRouteToMap",
        payLoad: routeStops
      });
    setSelectedRoutes(event);
  };
  useEffect(() => {
    setSelectedRoutes(
      routeOptionsList.filter((option) => option.value.id === currentRoute.id)
    );
  }, []);
  return (
    <div className={mapStyles.mapModalWrapper}>
      <div className={mapStyles.mapModalBody}>
        <button className={mapStyles.mapCloseBtn} onClick={closeCurrentRoute}>
          <i className="fa fa-close" />
        </button>
        <div className={mapStyles.actionsWrapper}>
          <label htmlFor="name">Add routes to map</label>
          <Select
            options={routeOptionsList}
            isMulti={true}
            onChange={addRouteToMaps}
            value={selectedRoutes}
          ></Select>
        </div>
        <div className={mapStyles.mapWrapper}>
          <RouteMap routeList={routeStopsList}></RouteMap>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
