import { Location, Stop, Trip } from "../../../types";
import GoogleMapReact from "google-map-react";
import React from "react";
import { FilledInMarker } from "../../misc/marker/filledInMarker";
import style from "./fillerStep.module.css";

interface Props {
  trip: Trip;
  center: Location;
  zoom: number;
}

interface DirectionsResult {
  routes: {
    legs: any[];
    overview_path: {
      lat: () => number;
      lng: () => number;
    }[];
  }[];
}

function arePointsNear(
  checkPoint: Location,
  centerPoint: Location,
  km: number
): boolean {
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

export const FillerStep = ({ center, zoom, trip }: Props) => {
  const [stopOvers, setStopOver] = React.useState<Stop[]>([]);
  const [route, setRoute] = React.useState<DirectionsResult | null>(null);

  const onClickAddStop = React.useCallback(
    (event: GoogleMapReact.ClickEventValue) => {
      if (
        route &&
        route.routes[0].overview_path.some((p) =>
          arePointsNear(
            { lat: event.lat, lng: event.lng },
            { lat: p.lat(), lng: p.lng() },
            0.01
          )
        )
      ) {
        const newTrip = {
          Name: "Stop Over",
          Time: new Date(),
          Location: { lat: event.lat, lng: event.lng },
        };
        setStopOver([...stopOvers, newTrip]);
      }
    },
    [route, stopOvers]
  );

  const handleGoogleMapApi = React.useCallback(
    (google: { map: any; maps: any; ref: Element | null }) => {
      let directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(google.map);

      const directionsRequest = {
        origin: {
          lat: trip.Stops[0].Location.lat,
          lng: trip.Stops[0].Location.lng,
        },
        destination: {
          lat: trip.Stops[trip.Stops.length - 1].Location.lat,
          lng: trip.Stops[trip.Stops.length - 1].Location.lng,
        },
        travelMode: "DRIVING",
        waypoints: trip.Stops.slice(1, trip.Stops.length - 1).map((stop) => {
          return {
            location: { lat: stop.Location.lat, lng: stop.Location.lng },
            stopover: true,
          };
        }),
      };
      directionsService.route(
        directionsRequest,
        (DirectionsResult: DirectionsResult, DirectionsStatus: any) => {
          directionsDisplay.setDirections(DirectionsResult);
          setRoute(DirectionsResult);
        }
      );
    },
    [trip.Stops]
  );

  return (
    <>
      <div className={style.stopStep}>
        <div className={style.maps}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.API_KEY ?? "",
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            onClick={onClickAddStop}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {stopOvers.concat(trip.Stops).map((stop, i) => (
              <FilledInMarker
                key={i}
                lat={stop.Location.lat}
                lng={stop.Location.lng}
                stop={stop}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      ></div>
    </>
  );
};
