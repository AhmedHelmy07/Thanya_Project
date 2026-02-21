import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

/* ===========================
   STORE ENDPOINT
=========================== */
server.get("/api/products", (req, res) => {
  const db = router.db; 
  const products = db.get("products").value();

  res.json({
    status: "success",
    products: products,
  });
});

/* ===========================
   SOS HISTORY
=========================== */
server.get("/api/sos/history", (req, res) => {
  const db = router.db;
  const history = db.get("history").value();

  res.json({
    status: "success",
    history: history,
  });
});

/* ===========================
   SOS ALERT (POST)
=========================== */
server.post("/api/sos/alert", (req, res) => {
  const db = router.db;

  const newAlert = {
    id: `alert_${Date.now()}`,
    device_name: "جهاز المستخدم",
    time: new Date().toLocaleString(),
    resolved: false,
    details: "تم إرسال تنبيه طوارئ جديد",
  };

  db.get("history").push(newAlert).write();

  res.status(201).json({
    status: "success",
    message: "SOS alert created successfully",
  });
});

server.use(router);

server.listen(3001, () => {
  console.log("Fake API running on http://localhost:3001");
});