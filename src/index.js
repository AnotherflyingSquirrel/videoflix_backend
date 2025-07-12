import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/index.js";

// configDotenv({
//   path: ".env.sample",
// });

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to MongoDB...", toString(err));
  });
