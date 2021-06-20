const mongoose = require("mongoose");

const lidhumeDb = async () => {
  // if (mongoose.connections[0].readyState) {
  //   console.log("Already connected");
  //   return;
  // }
  // const config = {
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("database u lidh");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = lidhumeDb;
