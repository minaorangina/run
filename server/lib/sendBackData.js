function sendBackData(io, { data = [], mode, direction, destination }) {
  const origin =
    direction === "away"
      ? process.env.AWAYWARDS_ORIGIN_TRAIN_NAME
      : process.env.AWAYWARDS_DESTINATION_TRAIN_NAME;
  parseTrainData(data)
    .then((parsed = []) => {
      io.emit(`${mode}:arrivals`, {
        android_data: parsed,
        data,
        direction,
        origin,
        destination,
        last_updated: new Date().toISOString()
      });
    })
    .catch(console.error);
}

function parseTrainData(trainData, mode = "train") {
  return new Promise(resolve => {
    if (trainData.length === 0) {
      return resolve();
    }
    const mapped = trainData.map(arrival => {
      const terminus = arrival.destination.location[0].locationName;
      return {
        std: arrival.std,
        etd: arrival.etd,
        terminus: normaliseStationName(terminus, mode),
        cancelReason: arrival.cancelReason,
        delayReason: arrival.delayReason
      };
    });
    resolve(mapped);
  });
}
function normaliseStationName(stationName, mode) {
  if (mode === "dlr" && stationName.length > 0) {
    return stationName.replace(" DLR Station", "");
  }
  if (mode === "train" && stationName !== "London Bridge") {
    return stationName.replace("London ", "");
  }
}

module.exports = sendBackData;
