import app from "./apicalls.js";
import { openDbConn } from "./mongodb.js";

(async () => {
  try {
    await openDbConn();
    app.listen(3000, () => {
      console.log("✅ Mongo-yhteys auki — kuuntelen porttia 3000");
    });
  } catch (err) {
    console.error("❌ MongoDB-yhteyden avaaminen epäonnistui:", err);
    process.exit(1);
  }
})();
