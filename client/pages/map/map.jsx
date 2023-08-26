import 'dotenv/config';
import { useState, useCallback, memo, useRef } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 42.8757,
  lng: 74.6036,
};

function Map({
  a,
  b,
  setShowPopup,
  pickUpAddressSelected,
  dropOffAddressSelected,
  setAddresses,
  addresses,
}) {
  const [pointA, setPointA] = useState(a || {});
  const [pointB, setPointB] = useState(b || {});
  const [response, setResponse] = useState(null);
  const DirectionsServiceOption = {
    origin: pointA,
    destination: pointB,
    travelMode: 'DRIVING',
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDYWEs65yBtu51Wd3DG9_DJbl0FaydXasY',
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  function pickDestinations(event) {
    if (!pickUpAddressSelected) setPointA({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    else {
      setPointB({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      // setPointB(() => {
      //   const secondPoint = {
      //     lat: event.latLng.lat(),
      //     lng: event.latLng.lng(),
      //   };
      //   setAddresses([pointA, secondPoint]);
      //   return secondPoint;
      // });
    }
    setShowPopup(true);
    if (pickUpAddressSelected && dropOffAddressSelected) setAddresses([pointA, pointB]);
  }

  let count = useRef(0);
  const directionsCallback = (response) => {
    if (response !== null && count.current < 2) {
      if (response.status === 'OK') {
        count.current += 1;
        setResponse(response);
      } else {
        count.current = 0;
        console.log('Response: ', response);
      }
    }
  };

  return isLoaded ? (
    <>
      <GoogleMap
        id="maps"
        mapContainerStyle={containerStyle}
        zoom={13}
        onClick={pickDestinations}
        center={center}
        onLoad={onMapLoad}
      >
        {dropOffAddressSelected && (
          <>
            {response !== null && (
              <DirectionsRenderer
                options={{
                  directions: response,
                  polylineOptions: {
                    strokeOpacity: 1,
                    strokeColor: '#FF0000',
                  },
                }}
              />
            )}
            <DirectionsService
              options={DirectionsServiceOption}
              callback={directionsCallback}
            />
          </>
        )}
        {Object.keys(pointA).length >= 1 && !dropOffAddressSelected && (
            <Marker
              position={{
                lat: pointA.lat,
                lng: pointA.lng,
              }}
            />
        )}
        {pickUpAddressSelected && !dropOffAddressSelected && (
            <Marker
              position={{
                lat: pointB.lat,
                lng: pointB.lng,
              }}
            />
          )}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default memo(Map);
