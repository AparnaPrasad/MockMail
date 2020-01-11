import React, { createContext, useReducer, useContext } from 'react'
import { MapState, initialState, reducer } from './MapState'
import {MapActions} from './MapActions'
type Props = {
    children: React.ReactNode;
  };
  
// By setting the typings here, we ensure we get intellisense in VS Code
const initialMapContext: { mapState: MapState; setMapState: React.Dispatch<MapActions> } = {
    mapState: initialState,
    // will update to the reducer we provide in MapProvider
    setMapState: () => {}
  };
  
  // No need to export this as we use it internally only
  const MapContext = createContext(initialMapContext);
  

  export function MapProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // rename the useReducer result to something more useful
    const mapState = state;
    const setMapState = dispatch;
  
    // pass the state and reducer to the context, dont forget to wrap the children
    return <MapContext.Provider value={{ mapState, setMapState }}>{children}</MapContext.Provider>;
  }

  export const useMapState = () => useContext(MapContext);