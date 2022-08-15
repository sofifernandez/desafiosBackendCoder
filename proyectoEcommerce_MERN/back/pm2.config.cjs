module.exports = {
  apps : [{
    name: 'srv_1',
    script: './server.js',
    watch: true,
    args: '8082',
    autorestart: true
  },
  {
    name: 'srv_2',
    script: './server.js',
    watch: true,
    args: '8083',
    autorestart: true
  },
  {
    name: 'srv_3',
    script: './server.js',
    watch: true,
    args: '8084',
    autorestart: true
  },
  {
    name: 'srv_4',
    script: './server.js',
    watch: true,
    args: '8085',
    autorestart: true
  }]
};