const soap = require("soap");
const _isEqual = require("lodash.isequal");
const sendBackData = require("./sendBackData");

const url =
  "https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2017-02-02";
const accessToken = `<AccessToken><TokenValue>${
  process.env.TOKEN
}</TokenValue></AccessToken>`;

let INTERVAL_ID = "";
let dataCache = {};
const mode = "train";

async function getTrainArrivals(io, direction, useCache) {
  if (INTERVAL_ID) {
    clearInterval(INTERVAL_ID);
  }
  if (Object.keys(io.nsp.connected).length > 0) {
    await pollAPI(io, direction);
    if (useCache && Object.keys(dataCache).length > 0) {
      sendBackData(io, dataCache);
    }
  }
}

function pollAPI(io, direction) {
  INTERVAL_ID = setInterval(() => {
    getTrainArrivals(io, direction);
  }, 10000);
  return new Promise((resolve, reject) => {
    soap.createClient(url, function(err, client) {
      if (err) {
        console.error("Error creating client...");
        io.emit(
          `${mode}:error`,
          new Error(`Error creating soap client ${err.message}`)
        );
        return reject();
      }

      const away = {
        numRows: 9,
        crs: process.env.AWAYWARDS_ORIGIN_TRAIN,
        filterCrs: process.env.AWAYWARDS_DESTINATION_TRAIN,
        filterType: "to",
        timeOffset: 0,
        timeWindow: 120
      };

      const home = {
        numRows: 9,
        crs: process.env.HOMEWARDS_ORIGIN_TRAIN,
        filterCrs: process.env.AWAYWARDS_ORIGIN_TRAIN,
        filterType: "to",
        timeOffset: 0,
        timeWindow: 120
      };

      const args = direction === "home" ? home : away;
      client.addSoapHeader(accessToken);
      client.GetDepartureBoard(args, function(err, result) {
        if (err) {
          console.error("Error getting departures...");
          console.error(`${mode}:error`, err);
          io.emit(`${mode}:error`, err);
          return reject();
        }
        const stationBoard = result.GetStationBoardResult;
        const data = stationBoard.trainServices
          ? stationBoard.trainServices.service.slice(0, 6)
          : [];
        const currentData = {
          data,
          mode: "train",
          direction,
          destination: stationBoard && stationBoard.filterLocationName
        };
        if (!_isEqual(currentData, dataCache)) {
          dataCache = { ...currentData };
          sendBackData(io, dataCache);
        }
        resolve();
      });
    });
  });
}

module.exports = getTrainArrivals;
