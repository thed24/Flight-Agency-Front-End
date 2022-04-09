import { Entries, Location, Stop, Trip } from "common/types";
import GoogleMapReact from "google-map-react";
import React, { ReactElement, useEffect } from "react";
import { FilledInMarker, List } from "common/components";
import { GetSuggestionsEndpoint } from "common/utilities";
import { Container } from "common/components/container";
import { SC } from "modules/createTrip";
import { IsError, usePost } from "common/hooks";

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

  const {
    request: requestSuggestion,
    payload: suggestions,
    loading: suggestionsLoading,
  } = usePost<Trip, Stop[]>(GetSuggestionsEndpoint);

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

  useEffect(() => {
    if (trip.stops.length > 1) {
      requestSuggestion(trip);
    }
  }, [trip]);

  const mapMarkers: ReactElement<any, any>[] = React.useMemo(
    () =>
      trip.stops.map((stop, i) => (
        <FilledInMarker
          key={i}
          lat={stop.location.lat}
          lng={stop.location.lng}
          stop={stop}
        />
      )),
    [trip.stops]
  );

  return (
    <Container>
      <SC.MapContainer>
        <SC.Map>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "",
            }}
            defaultCenter={{ lat: center.lat, lng: center.lng }}
            defaultZoom={zoom}
            onClick={onClickAddStop}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {mapMarkers}
          </GoogleMapReact>
        </SC.Map>

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

        {!IsError(suggestions) && suggestions.data.length > 0 && (
          <List
            title="Suggestions"
            entries={suggestions.data.map((stop) => {
              const entry: Entries = [
                {
                  header: "Name",
                  content: stop.name,
                },
                {
                  header: "Address",
                  content: stop.address,
                },
                {
                  header: "Latitude",
                  content: stop.location.lat.toString(),
                },
                {
                  header: "Longitude",
                  content: stop.location.lng.toString(),
                },
              ];

              return entry;
            })}
          />
        )}
      </SC.MapContainer>
    </Container>
  );
};
