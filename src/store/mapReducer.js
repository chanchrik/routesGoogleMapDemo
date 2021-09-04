const initialState = {
  viewMap: false,
  routesStopsList: [],
  route: {},
  mapBounds: null,
  routesSelectList: []
};
const mapReducer = (state = initialState, action) => {
  if (action.type === "viewMap") {
    return {
      ...state,
      viewMap: true,
      ...action.payLoad
    };
  }
  if (action.type === "closeMap") {
    return {
      ...state,
      viewMap: false,
      route: {},
      routesStopsList: []
    };
  }
  if (action.type === "setSelectRoutes") {
    return { ...state, routesSelectList: action.payLoad };
  }
  if (action.type === "addRouteToMap") {
    return { ...state, routesStopsList: action.payLoad };
  }
  if (action.type === "loadMap") {
    return { ...state };
  }
  return state;
};
export default mapReducer;
