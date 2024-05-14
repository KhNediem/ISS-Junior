const fs = require('fs');
const path = require('path');

const getLocalIP = () => {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  for (let iface of Object.values(interfaces)) {
    let alias = iface.find(alias => alias.family === 'IPv4' && !alias.internal);
    if (alias) {
      return alias.address;
    }
  }
  return 'localhost';
};

const ip = getLocalIP();
const filePath = path.join(__dirname, './config.json');
fs.writeFileSync(filePath, JSON.stringify({ ip: `${ip}` }), 'utf8');