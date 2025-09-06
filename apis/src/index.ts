import { eq, sql , ne} from "drizzle-orm";
import { poolInitialized, poolSwap, liquidityModified } from "./db/schema/Listener"; // Adjust the import path as necessary
import { types, db, App, middlewares } from "@duneanalytics/sim-idx"; // Import schema to ensure it's registered


const Address = types.Address;

const zeroAddress = Address.from("0000000000000000000000000000000000000000");

const app = App.create();
app.use("*", middlewares.authentication);


// API endpoint for hook adoption statistics
app.get("/api/hooks/adoption", async (c) => {
  try {
    const result = await db.client(c)
    .select({
      hook: poolInitialized.hooks,
      poolsCount: sql<number>`count(distinct ${poolInitialized.id})`.as("poolsCount"),
      firstSeenBlock: sql<number>`min(${poolInitialized.blockNumber})`.as("firstSeenBlock"),
      firstSeenTs: sql<number>`min(${poolInitialized.blockTimestamp})`.as("firstSeenTs"),
    })
    .from(poolInitialized)
    .where(ne(poolInitialized.hooks, zeroAddress))
    .groupBy(poolInitialized.hooks)
    .limit(100);

    return Response.json({ data: result });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});




// Test API for poolInitialized
app.get("/poolInitialized", async (c) => {
  try {
    const result = await db
      .client(c)
      .select()
      .from(poolInitialized)
      .limit(5);

    return Response.json({
      result: result,
    });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});

// Test API for poolSwap
app.get("/poolSwap", async (c) => {
  try {
    const result = await db
      .client(c)
      .select()
      .from(poolSwap)
      .limit(5);

    return Response.json({
      result: result,
    });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});

// Test API for liquidityModified
app.get("/liquidityModified", async (c) => {
  try {
    const result = await db
      .client(c)
      .select()
      .from(liquidityModified)
      .limit(5);

    return Response.json({
      result: result,
    });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});


app.get("/*", async (c) => {
  try {
    const result = await db
      .client(c)
      .select()
      .from(poolInitialized)
      .where(ne(poolInitialized.hooks, zeroAddress))
      .limit(10);

    return Response.json({
      result: result,
    });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});

export default app;
