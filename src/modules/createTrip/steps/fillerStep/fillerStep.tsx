import {
  Addresses,
  AddressRequest,
  Entries,
  getStopsPerDay,
  Location,
  Stop,
  Trip,
} from "common/types";
import GoogleMapReact from "google-map-react";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SC } from "common/components";
import {
  FilledInMarker,
  Map,
  ScrollableStops,
} from "modules/createTrip/components";
import { RequestAddressEndpoint } from "common/utilities";
import { IsError, useGet } from "common/hooks";
import { CircularProgress } from "@mui/material";
import { SSC } from "modules/createTrip/steps";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
interface Props {
  trip: Trip;
  center: Location;
  apiKey: string;
  handleNewStopAdded: (stop: Stop) => void;
  onMoveMap: (lat: number, lng: number) => void;
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
  onMoveMap,
}: Props) => {
  const [zoom, setZoom] = React.useState<number>(15);
  const [index, setIndex] = React.useState<number>(0);
  const [route, setRoute] = useState<google.maps.DirectionsRoute | null>(null);
  const [allRoutes, setAllRoutes] =
    useState<google.maps.DirectionsResult | null>(null);

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
            lat: nearestLocationOnPath.lat().toString(),
            lng: nearestLocationOnPath.lng().toString(),
          };

          addressRequest(request);
        }
      }
    },
    [addressRequest, route]
  );

  const directionsRequest = useMemo(() => {
    return {
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
  }, [stopsForDay]);

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (result && status === google.maps.DirectionsStatus.OK) {
        setRoute(result.routes[0]);
        setAllRoutes(result);
      }
    },
    [setRoute]
  );

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

  const onDragEnd = (lat: number, lng: number) => {
    onMoveMap(lat, lng);
  };

  const onZoomEnd = (zoom: number) => {
    setZoom(zoom);
  };

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
        <Map
          key={stopsForDay.length.toString()}
          center={center}
          zoom={zoom}
          onClick={onClickAddStop}
          onDrag={onDragEnd}
          onZoom={onZoomEnd}
          apiKey={apiKey}
        >
          {mapMarkers}
          {allRoutes !== null && (
            <DirectionsService
              options={{ ...directionsRequest }}
              callback={directionsCallback}
            />
          )}
          {allRoutes && (
            <DirectionsRenderer
              options={{
                directions: allRoutes,
                suppressMarkers: true,
              }}
            />
          )}
        </Map>

        {trip.stops.length > 0 && (
          <ScrollableStops
            setIndex={setIndex}
            index={index}
            dayToStopsMap={dayToStopMap}
            entries={entries}
          />
        )}
      </SSC.MapContainer>
    </SC.Container>
  );
};
