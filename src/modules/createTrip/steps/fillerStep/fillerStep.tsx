import {
  Addresses,
  AddressRequest,
  getStopsPerDay,
  Location,
  Stop,
  Trip,
} from "common/types";
import GoogleMapReact from "google-map-react";
import React, { ReactElement, useEffect, useState } from "react";
import { SC } from "common/components";
import { FilledInMarker, ScrollableStops } from "modules/createTrip/components";
import { RequestAddressEndpoint } from "common/utilities";
import { IsError, useGet } from "common/hooks";
import { CircularProgress } from "@mui/material";
import { SSC } from "modules/createTrip/steps";

interface Props {
  trip: Trip;
  center: Location;
  apiKey: string;
  handleNewStopAdded: (stop: Stop) => void;
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

export const FillerStep = ({
  apiKey,
  center,
  trip,
  handleNewStopAdded,
}: Props) => {
  const [route, setRoute] = useState<google.maps.DirectionsRoute | null>(null);
  const [zoom, setZoom] = React.useState<number>(15);
  const [index, setIndex] = React.useState<number>(0);

  // const {
  //   request: requestSuggestion,
  //   payload: suggestions,
  //   loading: suggestionsLoading,
  // } = usePost<Trip, Places>(GetSuggestionsEndpoint);

  const {
    loading: addressLoading,
    payload: addressResult,
    request: addressRequest,
  } = useGet<Addresses>(RequestAddressEndpoint);

  const dayToStopMap = getStopsPerDay(trip.stops);
  const days = Object.keys(dayToStopMap);
  const stopsForDay = Object.values(dayToStopMap)[index];

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
          var request: AddressRequest = {
            lat: nearestLocationOnPath.lat(),
            lng: nearestLocationOnPath.lng(),
          };

          addressRequest(request);
        }
      }
    },
    [addressRequest, route]
  );

  const handleGoogleMapApi = React.useCallback(
    (api: { map: google.maps.Map; ref: Element | null }) => {
      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();

      directionsDisplay.setMap(api.map);

      const directionsRequest: google.maps.DirectionsRequest = {
        origin: {
          lat: stopsForDay[0].location.lat,
          lng: stopsForDay[0].location.lng,
        },
        destination: {
          lat: stopsForDay[stopsForDay.length - 1].location.lat,
          lng: stopsForDay[stopsForDay.length - 1].location.lng,
        },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: stopsForDay.slice(1, stopsForDay.length - 1).map((stop) => {
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
          directionsDisplay.setDirections(result);
          setRoute(result.routes[0]);
        }
      });
    },
    [stopsForDay, trip.stops]
  );

  useEffect(() => {
    if (!IsError(addressResult)) {
      const address = addressResult.data.results[0];

      const startDate = stopsForDay[0].time.start;
      startDate.setDate(startDate.getDate() - 1);

      const endDate = stopsForDay[0].time.end;
      endDate.setDate(endDate.getDate() - 1);

      const newStop: Stop = {
        name: `Stop Over at ${address.formattedAddress}`,
        time: { start: startDate, end: endDate },
        location: {
          lat: address.geometry.location.latitude,
          lng: address.geometry.location.longitude,
        },
        address: address.formattedAddress,
      };

      handleNewStopAdded(newStop);
    }
  }, [addressResult]);

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

  if (addressLoading) {
    return (
      <SC.Container>
        <CircularProgress color="inherit" />
      </SC.Container>
    );
  }

  return (
    <SC.Container>
      <SSC.MapContainer>
        <SSC.Map>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: apiKey,
            }}
            key={index}
            defaultCenter={{ lat: center.lat, lng: center.lng }}
            defaultZoom={zoom}
            onClick={onClickAddStop}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {mapMarkers}
          </GoogleMapReact>
        </SSC.Map>

        {trip.stops.length > 0 && (
          <ScrollableStops
            setIndex={setIndex}
            index={index}
            dayToStopsMap={dayToStopMap}
          />
        )}
      </SSC.MapContainer>
    </SC.Container>
  );
};
