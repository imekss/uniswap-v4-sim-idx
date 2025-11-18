import { eq, sql , ne, and } from "drizzle-orm";
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

// Total hooks
app.get("/totalHooks", async (c) => {
  try {

    const result = await db.client(c)
    .select({

       hook: poolInitialized.hooks
    })
    .from(poolInitialized)
    // .where(eq(poolInitialized.hooks, Address.from(hook.toLowerCase())))
    .limit(100);

    return Response.json({ data: result });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});

// Total Swap by Id, Chain
app.get("/totalPool", async (c) => {
  try {

    const poolInit = await db.client(c)
    .select({ 
      chainId: poolInitialized.chainId
      // ,
      // totPool: sql<number>`count(distinct ${poolInitialized.id})`.as("totPool")
      // chainId: poolInitialized.chainId,
      // totPool: sql<number>`count(*)`
    })
    .from(poolInitialized)
    .groupBy(poolInitialized.chainId)
    .limit(100);

    return Response.json( { data: poolInit } );

  }
  catch(e){
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
);



// Pool swaps by pool ID
app.get("/poolswap1", async (c) => {
  try {
    // const { id } = c.req.param();  

        // Hex without 0x
    const rawHex =
      "0x9bdd72519ad7e2b5f0d5441d7af389771cc04a8406cd577fac0c68a8b6b396bd";

    const idBytes = Buffer.from(rawHex, "hex") as unknown as Bytes;


    const result = await db.client(c)
    .select({
       id:  poolSwap.id,
       chain: poolSwap.chainId,
      //  txnHash: poolSwap.txnHash,
       volumeToken0: sql<string>`sum(abs(${poolSwap.amount0}))`.as("volumeToken0"),
       volumeToken1: sql<string>`sum(abs(${poolSwap.amount0}))`.as("volumeToken1"),
      //  amount0: poolSwap.amount0,
      //  amount1: poolSwap.amount1
    })
    .from(poolSwap)
    // .where(eq(poolSwap.id, Address.from('0x9bdd72519ad7e2b5f0d5441d7af389771cc04a8406cd577fac0c68a8b6b396bd')))
    // .where(eq(poolSwap.id, idBytes))
    .groupBy(poolSwap.id, poolSwap.chainId)
    .limit(10);

    return Response.json({ data: result });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});

// Pool swaps by pool ID
app.get("/poolswap", async (c) => {
  try {
    
    const result = await db.client(c)
    .select({
       id:  poolSwap.id,
       chain: poolSwap.chainId,
       txnHash: poolSwap.txnHash,
       amount0: poolSwap.amount0,
       amount1: poolSwap.amount1
    })
    .from(poolSwap)
    .groupBy(poolInitialized.chainId, poolInitialized.hooks)
    .limit(10);

    return Response.json({ data: result });
  } catch (e) {
    console.error("Database operation failed:", e);
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
});
    // .where(eq(poolSwap.id, '0x9bdd72519ad7e2b5f0d5441d7af389771cc04a8406cd577fac0c68a8b6b396bd'))



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
    

    // const swaps = await db.client(c)
    // .select({
    //   chain: poolSwap.id,
    //   swapsCount: sql<number>`count(*)`.as("swapsCount"),
    //   volumeToken0: sql<string>`sum(abs(${poolSwap.amount0}))`.as("volumeToken0"),
    //   volumeToken1: sql<string>`sum(abs(${poolSwap.amount1}))`.as( "volumeToken1"),
    // })
    // .from(poolSwap)
    // // .where(eq(poolSwap.id, hook.toLowerCase()))
    // .groupBy(poolSwap.id)
      

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



// // Test API for liquidityModified
// app.get("/liquidityModified", async (c) => {
//   try {
//     const result = await db
//       .client(c)
//       .select()
//       .from(liquidityModified)
//       .limit(5);

//     return Response.json({
//       result: result,
//     });
//   } catch (e) {
//     console.error("Database operation failed:", e);
//     return Response.json({ error: (e as Error).message }, { status: 500 });
//   }
// });


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
