const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { User } = require("./models/user");
const Cart = require("./models/cart");
require("dotenv").config();
const { performance } = require('perf_hooks');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://flixprop-production.up.railway.app/auth/google/callback",
      // callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const start = performance.now();
      try {
        const userId = profile.id;

        // Buscar el usuario en la base de datos
        const startFindUser = performance.now();
        let user = await User.findOne({ id: userId });
        const endFindUser = performance.now();
        console.log(`Find User: ${endFindUser - startFindUser} ms`);

        if (user) {
          const end = performance.now();
          console.log(`Total: ${end - start} ms`);
          return done(null, { user }, { message: "User already exists" });
        }

        // Crear un nuevo usuario y un nuevo carrito en paralelo
        const startSaveUser = performance.now();
        user = new User({
          id: userId,
          name: profile.name.givenName,
          username: profile.emails[0].value,
          photos: [{ value: profile.photos[0].value }],
          provider: profile.provider,
        });

        const newCart = new Cart({
          userID: userId,
          name: profile.name.givenName,
          username: profile.emails[0].value,
          items: [],
        });

        await Promise.all([user.save(), newCart.save()]);
        const endSaveUser = performance.now();
        console.log(`Save User and Create Cart: ${endSaveUser - startSaveUser} ms`);

        const end = performance.now();
        console.log(`Total: ${end - start} ms`);
        return done(null, { user });
      } catch (error) {
        const end = performance.now();
        console.log(`Error Total: ${end - start} ms`);
        return done(error);
      }
    }
  )
);

module.exports = passport;
