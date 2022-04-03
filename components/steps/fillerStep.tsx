import { Entries, Location, Stop, Trip } from "types";
import GoogleMapReact from "google-map-react";
import React from "react";
import { FilledInMarker, List } from "components";
import { getFromStorage } from "utilities";
import { Map, MapContainer } from "./steps.styles";
import { Container } from "components/misc/container";

interface Props {
  trip: Trip;
  center: Location;
  zoom: number;
  addStopOver: (lat: number, lng: number) => void;
}

export const FillerStep = ({ center, zoom, trip, addStopOver }: Props) => {
  const [route, setRoute] = React.useState<google.maps.DirectionsRoute | null>(
    null
  );

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

  const onClickAddStop = React.useCallback(
    (event: GoogleMapReact.ClickEventValue) => {
      if (route) {
        const nearestLocationOnPath = route.overview_path.find((p) =>
          arePointsNear(
            { lat: event.lat, lng: event.lng },
            { lat: p.lat(), lng: p.lng() },
            0.02
          )
        );
        if (nearestLocationOnPath) {
          addStopOver(nearestLocationOnPath.lat(), nearestLocationOnPath.lng());
        }
      }
    },
    [addStopOver, route]
  );

  const handleGoogleMapApi = React.useCallback(
    (api: { map: google.maps.Map; ref: Element | null }) => {
      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(api.map);

      const directionsRequest: google.maps.DirectionsRequest = {
        origin: {
          lat: trip.stops[0].location.lat,
          lng: trip.stops[0].location.lng,
        },
        destination: {
          lat: trip.stops[trip.stops.length - 1].location.lat,
          lng: trip.stops[trip.stops.length - 1].location.lng,
        },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: trip.stops.slice(1, trip.stops.length - 1).map((stop) => {
          const stopOver: google.maps.DirectionsWaypoint = {
            location: new google.maps.LatLng(
              stop.location.lat,
              stop.location.lng
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
    [trip.stops]
  );

  const key = getFromStorage<string>("apiKey");

  return (
    <Container>
      <MapContainer>
        <Map>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: key ?? "",
            }}
            defaultCenter={{ lat: center.lat, lng: center.lng }}
            defaultZoom={zoom}
            onClick={onClickAddStop}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {trip.stops.map((stop, i) => (
              <FilledInMarker
                key={i}
                lat={stop.location.lat}
                lng={stop.location.lng}
                stop={stop}
              />
            ))}
          </GoogleMapReact>
        </Map>

        <List
          title="Stops"
          entries={
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
            []
          }
        />
      </MapContainer>
    </Container>
  );
};
