import { useSelector, useDispatch } from "react-redux";

import LeftNav from "../LeftNav/LeftNav";
import RouteItem from "../RouteItem/RouteItem";
import CreateRoute from "../RouteItem/CreateRoute";
import MapModal from "../RouteMap/MapModal";
import ConfirmModal from "../Modal/ConfirmModal";
import routeStyles from "./RouteView.module.css";
import { useCallback, useEffect } from "react";
import ExportFile from "../File/ExportFile";

const RouteView = () => {
  const dispatch = useDispatch();

  const activeNav = useSelector((state) => state.navSelection.navItem);
  const isMapView = useSelector((state) => state.mapSelection.viewMap);
  const routesObj = useSelector((state) => state.route.routesList);
  const viewCreateForm = useSelector((state) => state.route.viewCreateForm);
  const viewEditForm = useSelector((state) => state.route.viewEditForm);
  const fetchRoutes = useSelector((state) => state.route.sendRequest);
  const isDelteRoute = useSelector((state) => state.route.deleteRoute);
  const stopsList = useSelector((state) => state.route.stopsList);

  const openAddRouteModal = () => {
    dispatch({ type: "createRoute" });
  };

  const fetchRoutesList = useCallback(async () => {
    try {
      const response = await fetch(
        "https://chalodemo-default-rtdb.firebaseio.com/route.json"
      );
      const data = await response.json();
      const routesList = [];
      const routesSelectList = [];
      Object.entries(data).forEach((route) => {
        routesList.push({ ...route[1], guid: route[0] });
        routesSelectList.push({
          label: route[1].name,
          value: { ...route[1], guid: route[0] }
        });
      });
      dispatch({ type: "setRoutes", payLoad: routesList });
      dispatch({ type: "setSelectRoutes", payLoad: routesSelectList });
      dispatch({ type: "fetchRoutes" });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchRoutes && fetchRoutesList();
  }, [fetchRoutes]);

  const fetchStopsList = useCallback(async () => {
    try {
      const response = await fetch(
        "https://chalodemo-default-rtdb.firebaseio.com/stops.json"
      );
      const stopsList = await response.json();
      const sl = [];
      Object.entries(stopsList).forEach((stop) => {
        sl.push({ label: stop[1].stopName, value: stop[1] });
      });
      dispatch({ type: "setStops", payLoad: sl });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchStopsList();
  }, [fetchStopsList]);

  return (
    <div>
      <div className={routeStyles.routeViewWrapper}>
        <LeftNav></LeftNav>
        {activeNav === "Routes" && (
          <div className={routeStyles.routesWrapper}>
            <div className={routeStyles.headerText}>{activeNav}</div>
            <p className={routeStyles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <div className={routeStyles.displayFlex}>
              <button
                className={routeStyles.createBtn}
                onClick={openAddRouteModal}
              >
                Create New Route
              </button>
              <ExportFile fileName="routes" fileData={routesObj} />
            </div>
            <div>
              {routesObj.map((route, index) => (
                <RouteItem route={route} key={route.id}></RouteItem>
              ))}
            </div>
          </div>
        )}
        {activeNav === "Stops" && (
          <div>
            <div className={routeStyles.headerText}>{activeNav}</div>
            <p className={routeStyles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <div className={routeStyles.displayFlex}>
              <p>All Stops</p>
              <ExportFile fileName="stops" fileData={stopsList} />
            </div>
            {stopsList.map((stop, index) => (
              <div className={routeStyles.stopWrapper} key={stop.value.stopId}>
                {stop.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {isMapView && <MapModal></MapModal>}
      {isDelteRoute && <ConfirmModal></ConfirmModal>}
      {viewCreateForm && <CreateRoute isEditRoute={false}></CreateRoute>}
      {viewEditForm && <CreateRoute isEditRoute={viewEditForm}></CreateRoute>}
    </div>
  );
};

export default RouteView;
