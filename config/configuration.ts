export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 8000,
  token: {
    publickey: process.env.PUBLIC_KEY,
    privatekey: process.env.PRIVATE_KEY,
  },
});
