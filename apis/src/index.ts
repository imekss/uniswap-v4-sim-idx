import { eq, sql } from "drizzle-orm";
import { poolInitialized, poolSwap, liquidityModified } from "./db/schema/Listener"; // Adjust the import path as necessary
import { types, db, App, middlewares } from "@duneanalytics/sim-idx"; // Import schema to ensure it's registered

// const filterToken0 = types.Address.from(
//   "7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"
// );

const app = App.create();
app.use("*", middlewares.authentication);


app.get("/api/hooks/adoption", async (c) => {
  try {
    const result = await db.client(c)
    .select({
      hook: poolInitialized.hooks,
      poolsCount: sql<number>`count(distinct ${poolInitialized.id})`.as("poolsCount"),
      firstSeenBlock: sql<number>`min(${poolInitialized.blockNumber})`.as("firstSeenBlock"),
      firstSeenTs: sql<number>`min(${poolInitialized.blockTimestamp})`.as("firstSeenTs"),
    })
    .from(poolInitialized);

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
      // .where(eq(poolCreated.token0, filterToken0))
      .limit(5);

    return Response.json({
      result: result,
    });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});

export default app;
