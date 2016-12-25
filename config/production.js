module.exports = {
  name: 'prod',

  server: {
    host: '0.0.0.0',
    port: '80',
    protocol: 'http://',
  },

  s3: {
    accessKeyId: 'AKIAJCL2NDFAROJFA64Q',
    secretAccessKey: '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',
  },

  cdn: {
    one: 'assets1.adrienboulle.com',
    two: 'assets2.adrienboulle.com',
    three: 'assets3.adrienboulle.com',
  },
};
