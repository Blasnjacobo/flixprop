const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const { User } = require("./models/user");
const Cart = require("./models/cart");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        // "http://localhost:5000/auth/google/callback",
        "https://flixprop-production.up.railway.app/auth/google/callback",
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exist in the database
        let user = await User.findOne({ id: profile.id });
        if (user) {
          return done(null, { user: user }, { message: "User already exist" });
        } else {
          // Create a new user in the database
          const newUser = new User({
            id: profile.id,
            name: profile.name.givenName,
            username: profile.emails[0].value,
            photos: [{ value: profile.photos[0].value }],
            provider: profile.provider,
          });
          await newUser.save();
          // Create a new cart for the user
          const newCart = new Cart({
            userID: newUser.id,
            name: profile.name.givenName,
            username: profile.emails[0].value,
            items: [],
          });
          await newCart.save();
          return done(null, { user: newUser });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
