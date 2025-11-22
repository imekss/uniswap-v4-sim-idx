import { eq, sql , ne, and , count} from "drizzle-orm";
// import { poolInitialized, poolSwap, liquidityModified } from "./db/schema/Listener"; // Adjust the import path as necessary
import { poolInitialized, poolSwap } from "./db/schema/Listener"; // Adjust the import path as necessary
import { types, db, App, middlewares } from "@duneanalytics/sim-idx"; // Import schema to ensure it's registered
import { isValidAddress, isValidChainId, zeroAddress, Address } from "./validation"; // Utility functions for validation

const app = App.create();

app.use("*", middlewares.authentication);

// Pool Init by Hook
app.get("/hooks/:hook/poolinit", async (c) => {
  try {
    const { hook } = c.req.param();

    if (!hook || !isValidAddress(hook)) {
      return c.json({ error: "Invalid hook address" }, 400);
    }

    const result = await db.client(c)
    .select({
       id: poolInitialized.id,
       chain: poolInitialized.chainId,
       hook: poolInitialized.hooks
    })
    .from(poolInitialized)
    .where(eq(poolInitialized.hooks, Address.from(hook.toLowerCase())))
    .limit(100);

    return Response.json({ data: result });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});


// Total Pools/Swap/Hooks by Chain
app.get("/totalsByChain", async (c) => {
  try {
    const poolSwapSub =  db.client(c)
    .select({ 
      chainId: poolSwap.chainId,
      totSwaps: count().as("totSwaps")
    })
    .from(poolSwap)
    .groupBy(poolSwap.chainId)
    .as("poolSwap_t");

    const poolInit = await db.client(c)
    .select({ 
      chainId: poolInitialized.chainId,
      totPools: sql<number>`count(distinct ${poolInitialized.id})`.as("totPools"),
      totHooks: sql<number>`count(distinct ${poolInitialized.hooks})`.as("totHooks")
      // ,
      // totSwaps: sql<number>`coalesce(sum(${poolSwapSub.totSwaps}), 0)`.as("totSwaps"),
    })
    .from(poolInitialized)
    //   .leftJoin(
    //     poolSwapSub,
    //       eq(poolInitialized.chainId, poolSwapSub.chainId)
    //   )
    .groupBy(poolInitialized.chainId);

    return Response.json( { data: poolInit } );

  }
  catch(e){
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
);




// API endpoint for hook adoption statisticss
app.get("/hooks/:hook/adoption", async (c) => {
  try {
    const { hook } = c.req.param();
    
    if (!hook || !isValidAddress(hook)) {
      return c.json({ error: "Invalid hook address" }, 400);
    }

    const result = await db.client(c)
    .select({
      chain: poolInitialized.chainId,
      hook: poolInitialized.hooks,
      poolsCount: sql<number>`count(distinct ${poolInitialized.id})`.as("poolsCount"),
      firstSeenBlock: sql<number>`min(${poolInitialized.blockNumber})`.as("firstSeenBlock"),
      firstSeenTs: sql<number>`min(${poolInitialized.blockTimestamp})`.as("firstSeenTs"),
    })
    .from(poolInitialized)
    .where(eq(poolInitialized.hooks, Address.from(hook.toLowerCase())))
    .groupBy(poolInitialized.chainId, poolInitialized.hooks)
    .limit(100);

    return Response.json({ data: result });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});

// API endpoint for hook swaps + volume statistics
app.get("/hooks/:hook/activity", async (c) => {
  try {
    const { hook } = c.req.param();

    if (!hook || !isValidAddress(hook)) {
      return c.json({ error: "Invalid hook address" }, 400);
    }
    

    const result = await db.client(c)
      .select({
        chain: poolInitialized.chainId,
        hook: poolInitialized.hooks,
        swapsCount: sql<number>`count(*)`.as("swapsCount"),
        // raw token volumes (signed int128 -> absolute value)
        volumeToken0: sql<string>`sum(abs(${poolSwap.amount0}))`.as("volumeToken0"),
        volumeToken1: sql<string>`sum(abs(${poolSwap.amount1}))`.as( "volumeToken1"),
      })
      .from(poolInitialized)
      .innerJoin(
        poolSwap,
        and(
          eq(poolInitialized.id, poolSwap.id),
          eq(poolInitialized.chainId, poolSwap.chainId)
        )
      )
      .where(eq(poolInitialized.hooks, Address.from(hook.toLowerCase())))
      .groupBy(poolInitialized.chainId, poolInitialized.hooks)
      .limit(100);

    return Response.json({ data: result });
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
