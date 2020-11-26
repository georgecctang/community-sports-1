// Using browser geolocation, gets users lat/long
// Set position into state
export const GetPosition = (setPos) => {
  const userCoords = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async success => {
      const pos = [
        success.coords.latitude,
        success.coords.longitude
      ];
      console.log('pos', pos)
      await setPos(pos)
      resolve()
    }, failure => {
      reject()
    });
  })
  return userCoords
};