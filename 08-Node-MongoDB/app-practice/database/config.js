const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
    });
    console.log("Database ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Problems to connecta database");
  }
};

module.exports = {
  dbConnect,
};
