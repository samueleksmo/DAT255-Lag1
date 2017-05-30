//Sets options for connectiing to the back end
exports.setOptions = function (thePath, theMethod, content) {
  "use strict";
  return {
    host: 'sandbox-5.portcdm.eu',
    port: 8080,
    path: thePath,
    method: theMethod,
    headers: {
      'X-PortCDM-Userid': 'viktoria',
      'X-PortCDM-Password': 'vik123',
      'X-PortCDM-APIKey': 'dhc',
      'Content-Type': content
    }
  };
};