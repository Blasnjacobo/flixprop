const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { User } = require("./models/user");
const Cart = require("./models/cart");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://flixprop-production.up.railway.app/auth/google/callback",
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in the database
        let user = await User.findOne({ id: profile.id });

        if (user) {
          return done(null, user, { message: "User already exists" });
        }

        // Create a new user in the database
        user = new User({
          id: profile.id,
          name: profile.name.givenName,
          username: profile.emails[0].value,
          photos: [{ value: profile.photos[0].value }],
          provider: profile.provider,
        });
        await user.save();

        // Create a new cart for the user
        const newCart = new Cart({
          userID: user.id,
          name: profile.name.givenName,
          username: profile.emails[0].value,
          items: [],
        });
        await newCart.save();

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
