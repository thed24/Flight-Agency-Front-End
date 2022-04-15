import GoogleMapReact from "google-map-react";
import { memo } from "react";
import * as SSC from "./map.style";

interface Props {
  center: { lat: number; lng: number };
  zoom: number;
  children: any;
  apiKey: string;
  key: string;
  onClick?: (any: any) => void;
  onDrag?: (any: any) => void;
  onZoom?: (any: any) => void;
  onLoad?: (any: any) => void;
}

const MapInternal = ({
  center,
  zoom,
  children,
  apiKey,
  key,
  onClick,
  onDrag,
  onZoom,
  onLoad,
}: Props) => {
  return (
    <SSC.MapBox>
      <GoogleMapReact
        key={key}
        bootstrapURLKeys={{
          key: apiKey,
        }}
        center={{ lat: center.lat, lng: center.lng }}
        zoom={zoom}
        onClick={onClick}
        onGoogleApiLoaded={onLoad}
        onDragEnd={onDrag}
        onZoomAnimationEnd={onZoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {children}
      </GoogleMapReact>
    </SSC.MapBox>
  );
};

export const Map = memo(MapInternal);
