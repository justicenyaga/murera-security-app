import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

export default useLocation = () => {
  const [location, setLocation] = useState({
    longitude: null,
    latitude: null,
  });

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        Alert.alert(
          "Location Permission",
          "Please enable location services to continue.",
        );
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
