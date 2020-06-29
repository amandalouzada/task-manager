export default {
  jwt: {
    secret: process.env.SECRET_KEY || 'default',
    expiresIn: '1d',
  },
};
