const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes.js');
const accountRouter = require('./routes/account.routes.js');
const transactionRouter = require('./routes/transaction.routes.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://apex-wallet-frontend.vercel.app'
    ],
    credentials: true 
}));

app.use("/api/auth", authRouter) ;
app.use("/api/accounts" , accountRouter);
app.use("/api/transactions" , transactionRouter);
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: Object.values(err.errors)
        .map(e => e.message)
        .join(", "),
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});


module.exports = app ;