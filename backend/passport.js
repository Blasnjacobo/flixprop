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
    },
    async (profile, done) => {
      const start = performance.now();
      try {
        const startFindUser = performance.now();
        let user = await User.findOne({ id: profile.id });
        const endFindUser = performance.now();
        console.log(`Find User: ${endFindUser - startFindUser} ms`);

        if (user) {
          const end = performance.now();
          console.log(`Total: ${end - start} ms`);
          return done(null, user, { message: "User already exists" });
        }

        const startSaveUser = performance.now();
        user = new User({
          id: profile.id,
          name: profile.name.givenName,
          username: profile.emails[0].value,
          photos: [{ value: profile.photos[0].value }],
          provider: profile.provider,
        });
        await user.save();
        const endSaveUser = performance.now();
        console.log(`Save User: ${endSaveUser - startSaveUser} ms`);

        const startCreateCart = performance.now();
        const newCart = new Cart({
          userID: user.id,
          name: profile.name.givenName,
          username: profile.emails[0].value,
          items: [],
        });
        await newCart.save();
        const endCreateCart = performance.now();
        console.log(`Create Cart: ${endCreateCart - startCreateCart} ms`);

        const end = performance.now();
        console.log(`Total: ${end - start} ms`);
        return done(null, user);
      } catch (error) {
        const end = performance.now();
        console.log(`Error Total: ${end - start} ms`);
        return done(error);
      }
    }
  )
);