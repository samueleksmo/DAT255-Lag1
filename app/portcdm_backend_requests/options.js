  exports.setOptions = function (thePath, theMethod, content) {
    return {
    host: 'dev.portcdm.eu',
    port: 8080,
    path: thePath,
    method: theMethod,
    headers: {
      'X-PortCDM-Userid': 'viktoria',
      'X-PortCDM-Password': 'vik123',
      'X-PortCDM-APIKey': 'dhc',
      'Content-Type': content
    }
  }
  };