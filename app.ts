import express from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import cors from "cors";

export const prismaClient = new PrismaClient();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/form", require("./routes/form"));
app.use("/api/cards", require("./routes/cards"));
app.use("/api/card", require("./routes/basket"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/addons", require("./routes/addons"));
app.use("/api/users", require("./routes/user"));
app.get("/uploads/:path", function (req, res) {
  res.sendFile(path.join(__dirname, req.path));
});

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
