const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const config = require("./config");
const middleware = require("./middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(middleware.reqOmitWithNull);

app.get("/products", async function (req, res, next) {
  try {
    const data = await fetch(`${config.SHEET_API_URL}?path=/products`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error Response: ${response.status}`);
        }

        return response.json();
      }
    );

    let text = "รายการสินค้า";
    data.items.forEach((item) => {
      text += "\n " + item.name + " ";
    });

    res.json({
      success: true,
      messages: [{ text }]
    });
  } catch (error) {
    // handle error
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

app.post("/game", async function (req, res, next) {
  try {
    const data = await fetch(`${config.SHEET_API_URL}?path=/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error Response: ${response.status}`);
      }

      return response.json();
    });

    console.log(data);
    console.log(req.body);
    res.json({
      success: true
    });
  } catch (error) {
    // handle error
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error("Not fOUND");
  error.status = 404;
  next(error);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

app.listen(config.PORT);
