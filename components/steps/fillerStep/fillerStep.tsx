import { Entries, Entry, Location, Stop, Trip } from "../../../types";
import GoogleMapReact from "google-map-react";
import React from "react";
import { FilledInMarker } from "../../misc/marker/filledInMarker";
import style from "./fillerStep.module.css";
import { Box, Typography } from "@mui/material";
import { List } from "../..";

interface Props {
  trip: Trip;
  center: Location;
  zoom: number;
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
  const [route, setRoute] = React.useState<google.maps.DirectionsRoute | null>(
    null
  );

  const onClickAddStop = React.useCallback(
    (event: GoogleMapReact.ClickEventValue) => {
      if (
        route &&
        route.overview_path.some((p) =>
          arePointsNear(
            { lat: event.lat, lng: event.lng },
            { lat: p.lat(), lng: p.lng() },
            0.01
          )
        )
      ) {
        const newTrip = {
          Name: `Stop Over ${stopOvers.length + 1}`,
          Time: { start: new Date(), end: new Date() },
          Location: { lat: event.lat, lng: event.lng },
        };
        setStopOver([...stopOvers, newTrip]);
      }
    },
    [route, stopOvers]
  );

  const handleGoogleMapApi = React.useCallback(
    (api: { map: google.maps.Map; ref: Element | null }) => {
      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(api.map);

      const directionsRequest: google.maps.DirectionsRequest = {
        origin: {
          lat: trip.Stops[0].Location.lat,
          lng: trip.Stops[0].Location.lng,
        },
        destination: {
          lat: trip.Stops[trip.Stops.length - 1].Location.lat,
          lng: trip.Stops[trip.Stops.length - 1].Location.lng,
        },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: trip.Stops.slice(1, trip.Stops.length - 1).map((stop) => {
          const stopOver: google.maps.DirectionsWaypoint = {
            location: new google.maps.LatLng(
              stop.Location.lat,
              stop.Location.lng
            ),
            stopover: true,
          };

          return stopOver;
        }),
      };

      directionsService.route(directionsRequest, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          result.routes[0].summary;
          console.log(result.routes[0]);
          directionsDisplay.setDirections(result);
          setRoute(result.routes[0]);
        }
      });
    },
    [trip.Stops]
  );

  const entries =
    (route &&
      route.legs.map((leg, i) => {
        const entry: Entries = [
          {
            header: `Stop ${i + 1}`,
            content: `${leg.start_address} to ${leg.end_address}`,
          },
          {
            header: "Duration",
            content: `${leg?.duration?.text}`,
          },
          {
            header: "Distance",
            content: `${leg?.distance?.text}`,
          },
        ];

        return entry;
      })) ??
    [];

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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        ></div>
        <List title="Stops" entries={entries} />
      </div>
    </>
  );
};
