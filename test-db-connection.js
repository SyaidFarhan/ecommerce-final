import mongoose from "mongoose";

const testConnection = async () => {
  try {
    console.log("🔍 Testing MongoDB Connection...");
    
    const connectionUrl = "";
    
    if (!connectionUrl) {
      console.error("❌ ERROR: MONGODB_URL is not defined");
      process.exit(1);
    }

    console.log(`📡 Connecting to MongoDB Atlas...`);

    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully!");
    
    // Get connection details
    const connection = mongoose.connection;
    console.log(`\n📊 Connection Details:`);
    console.log(`   - Database Name: ${connection.name}`);
    console.log(`   - Connection State: ${connection.readyState === 1 ? "✅ Connected" : "❌ Disconnected"}`);

    // List collections
    const collections = await connection.db.listCollections().toArray();
    console.log(`\n📦 Collections Found (${collections.length}):`);
    if (collections.length > 0) {
      collections.forEach((col) => {
        console.log(`   - ${col.name}`);
      });
    } else {
      console.log("   (No collections found)");
    }

    await mongoose.disconnect();
    console.log("\n✅ Connection test completed and disconnected.");
    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed!");
    console.error(`Error: ${error.message}`);
    if (error.message.includes("authentication failed")) {
      console.error("\n💡 Hint: Check your MongoDB credentials in .env.local");
    }
    if (error.message.includes("ENOTFOUND")) {
      console.error("\n💡 Hint: Check your internet connection or MongoDB cluster status");
    }
    process.exit(1);
  }
};

testConnection();
