// from https://github.com/leerob/next-self-host/blob/main/cache-handler.mjs

// import chalk from 'chalk';
// import { promises as fs } from 'fs';
// import path from 'path';

// const CACHE_DIR = path.resolve('.cache'); // Adjust the cache directory as needed
// const TAGS_MANIFEST = path.join(CACHE_DIR, 'tags-manifest.json');

// // Initialize cache directory and tags manifest outside the class
// (async () => {
//   try {
//     await fs.mkdir(CACHE_DIR, { recursive: true });
//     console.log(chalk.blue('🔧 Cache directory initialized'));
//   } catch (err) {
//     console.error('Failed to initialize cache directory', err);
//   }
// })();

// async function loadTagsManifest() {
//   try {
//     const data = await fs.readFile(TAGS_MANIFEST, 'utf8');
//     return JSON.parse(data);
//   } catch (err) {
//     if (err.code === 'ENOENT') {
//       return { items: {} };
//     }
//     throw err;
//   }
// }

// async function updateTagsManifest(tag, revalidatedAt) {
//   const manifest = await loadTagsManifest();
//   manifest.items[tag] = { revalidatedAt };
//   await fs.writeFile(TAGS_MANIFEST, JSON.stringify(manifest));
// }

// class CacheHandler {
//   constructor() {
//     this.cacheDir = CACHE_DIR;
//   }

//   getFilePath(key) {
//     const sanitizedKey = key.trim();
//     const fileName = encodeURIComponent(sanitizedKey);
//     return path.join(this.cacheDir, fileName);
//   }

//   async get(key) {
//     const filePath = this.getFilePath(key);

//     try {
//       const data = await fs.readFile(filePath, 'utf8');
//       const entry = JSON.parse(data);
//       const { value, lastModified } = entry;

//       let cacheTags = entry.tags;

//       if (
//         (!cacheTags || cacheTags.length === 0) &&
//         value.headers &&
//         value.headers['x-next-cache-tags']
//       ) {
//         cacheTags = value.headers['x-next-cache-tags'].split(',');
//       }

//       const tagsManifest = await loadTagsManifest();

//       // Check if any tags have been revalidated after the cache entry
//       let isStale = false;
//       for (const tag of cacheTags || []) {
//         const tagData = tagsManifest.items[tag];
//         if (tagData && tagData.revalidatedAt > lastModified) {
//           isStale = true;
//           console.log(
//             chalk.red(
//               `♻️ Cache entry for key ${chalk.bold(
//                 key
//               )} is stale due to tag ${chalk.bold(tag)} revalidation`
//             )
//           );
//           break;
//         }
//       }

//       if (isStale) {
//         console.log(
//           chalk.yellow(
//             `⚠️ Cache entry for key ${chalk.bold(
//               key
//             )} is stale due to stale tags`
//           )
//         );
//         return null;
//       }

//       console.log(chalk.green(`✅ Cache hit for key: ${chalk.bold(key)}`));
//       return {
//         lastModified,
//         value,
//       };
//     } catch (err) {
//       console.log("err >>", err)
//       console.log(chalk.yellow(`⚠️ Cache miss for key: ${chalk.bold(key)}`));
//       return null;
//     }
//   }

//   async set(key, data, ctx = {}) {
//     let tags = ctx.tags || [];

//     if (data && data.headers && data.headers['x-next-cache-tags']) {
//       const headerTags = data.headers['x-next-cache-tags'].split(',');
//       tags = [...new Set([...tags, ...headerTags])];
//     }

//     const entry = {
//       value: data,
//       lastModified: Date.now(),
//       tags,
//     };

//     const filePath = this.getFilePath(key);

//     try {
//       await fs.writeFile(filePath, JSON.stringify(entry));
//       console.log(chalk.cyan(`📥 Set cached data for key: ${chalk.bold(key)}`));
//       if (tags.length > 0) {
//         console.log(chalk.gray(`   Tags: ${tags.join(', ')}`));
//       }
//     } catch (err) {
//       console.error(`Failed to write cache entry for key ${key}`, err);
//     }
//   }

//   async revalidateTag(tags) {
//     const tagsArray = Array.isArray(tags) ? tags : [tags];
//     console.log(
//       chalk.magenta(`🔄 Revalidating tags: ${chalk.bold(tagsArray.join(', '))}`)
//     );

//     const now = Date.now();

//     for (const tag of tagsArray) {
//       await updateTagsManifest(tag, now);
//       console.log(
//         chalk.blue(
//           `   ⏰ Tag ${chalk.bold(tag)} revalidated at ${new Date(
//             now
//           ).toISOString()}`
//         )
//       );
//     }

//     console.log(
//       chalk.magenta(
//         `✨ Revalidation complete for tags: ${chalk.bold(
//           tagsArray.join(', ')
//         )}.`
//       )
//     );
//   }
// }

// export default CacheHandler;

// from https://nextjs.org/docs/app/building-your-application/deploying#configuring-caching

const cache = new Map()
 
module.exports = class CacheHandler {
  constructor(options) {
    this.options = options
  }
  async get(key) {
    // This could be stored anywhere, like durable storage
    return cache.get(key)
  }
  async set(key, data, ctx) {
    // This could be stored anywhere, like durable storage
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    })
  }
 
  async revalidateTag(tags) {
    // tags is either a string or an array of strings
    tags = [tags].flat()
    // Iterate over all entries in the cache
    for (let [key, value] of cache) {
      // If the value's tags include the specified tag, delete this entry
      if (value.tags?.some((tag) => tags.include(tag))) {
        cache.delete(key)
      }
    }
  }
}


// from https://github.com/vercel/next.js/blob/canary/examples/cache-handler-redis/cache-handler.js

// const { CacheHandler } = require("@neshca/cache-handler");
// const createRedisHandler = require("@neshca/cache-handler/redis-stack").default;
// const createLruHandler = require("@neshca/cache-handler/local-lru").default;
// const { createClient } = require("redis");
// const { PHASE_PRODUCTION_BUILD } = require("next/constants");

// import { CacheHandler } from "@neshca/cache-handler";
// import createRedisHandler from "@neshca/cache-handler/redis-stack";
// import createLruHandler from "@neshca/cache-handler/local-lru";
// import { createClient } from "redis";
// // import { PHASE_PRODUCTION_BUILD } from "next/constants";
// const { PHASE_PRODUCTION_BUILD } = require("next/constants");

/* from https://caching-tools.github.io/next-shared-cache/redis */
// CacheHandler.onCreation(async () => {
//   let client;
//   // use redis client during build could cause issue https://github.com/caching-tools/next-shared-cache/issues/284#issuecomment-1919145094

//   if (PHASE_PRODUCTION_BUILD !== process.env.NEXT_PHASE) {
//     try {
//       // Create a Redis client.
//       client = createClient({
//         url: process.env.REDIS_URL ?? "redis://localhost:6379",
//       });

//       // Redis won't work without error handling.
//       // NB do not throw exceptions in the redis error listener,
//       // because it will prevent reconnection after a socket exception.
//       client.on("error", (e) => {
//         if (typeof process.env.NEXT_PRIVATE_DEBUG_CACHE !== "undefined") {
//           console.warn("Redis error", e);
//         }
//       });
//     } catch (error) {
//       console.warn("Failed to create Redis client:", error);
//     }
//   }

//   if (client) {
//     try {
//       console.info("Connecting Redis client...");

//       // Wait for the client to connect.
//       // Caveat: This will block the server from starting until the client is connected.
//       // And there is no timeout. Make your own timeout if needed.
//       await client.connect();
//       console.info("Redis client connected.");
//     } catch (error) {
//       console.warn("Failed to connect Redis client:", error);

//       console.warn("Disconnecting the Redis client...");
//       // Try to disconnect the client to stop it from reconnecting.
//       client
//         .disconnect()
//         .then(() => {
//           console.info("Redis client disconnected.");
//         })
//         .catch(() => {
//           console.warn(
//             "Failed to quit the Redis client after failing to connect.",
//           );
//         });
//     }
//   }

//   /** @type {import("@neshca/cache-handler").Handler | null} */
//   let redisHandler = null;
//   if (client?.isReady) {
//     // Create the `redis-stack` Handler if the client is available and connected.
//     redisHandler = await createRedisHandler({
//       client,
//       keyPrefix: "prefix:",
//       timeoutMs: 1000,
//     });
//   }
//   // Fallback to LRU handler if Redis client is not available.
//   // The application will still work, but the cache will be in memory only and not shared.
//   const LRUHandler = createLruHandler();
//   console.warn(
//     "Falling back to LRU handler because Redis client is not available.",
//   );

//   return {
//     handlers: [redisHandler, LRUHandler],
//   };
// });

// module.exports = CacheHandler;


// AWS S3 Version 

// const { 
//   S3Client, 
//   GetObjectCommand, 
//   PutObjectCommand, 
//   DeleteObjectCommand
// } = require('@aws-sdk/client-s3')

// module.exports = class CacheHandler {
//   constructor(options) {
//     this.options = options

//     this.s3Client = new S3Client({
//       region: options.region || 'us-east-1',  // Define your AWS region
//       credentials: options.credentials        // Optionally pass in AWS credentials
//     })

//     this.bucketName = options.bucketName      // S3 bucket name for cache storage
//   }

//   async get(key) {
//     try {
//       // Get the object from S3
//       const command = new GetObjectCommand({
//         Bucket: this.bucketName,
//         Key: key,
//       })

//       const { Body } = await this.s3Client.send(command)
//       const data = await streamToString(Body)

//       // Parse the JSON data stored in S3
//       return JSON.parse(data)
//     } catch (err) {
//       console.log(err)
//       // Return null or handle errors (like cache miss)
//       return null
//     }
//   }

//   async set(key, data, ctx) {
//     try {
//       const cacheData = {
//         value: data,
//         lastModified: Date.now(),
//         tags: ctx.tags,
//       }

//       const command = new PutObjectCommand({
//         Bucket: this.bucketName,
//         Key: key,
//         Body: JSON.stringify(cacheData),
//         ContentType: 'application/json',
//       })

//       await this.s3Client.send(command)
//     } catch (err) {
//       console.error('Error setting cache:', err)
//     }
//   }

//   async revalidateTag(tags) {
//     // tags is either a string or an array of strings
//     tags = [tags].flat()

//     try {
//       // List all objects in the S3 bucket
//       const listCommand = new ListObjectsV2Command({
//         Bucket: this.bucketName,
//       })
//       const data = await this.s3Client.send(listCommand)

//       // Iterate through each object in the bucket
//       for (let obj of data.Contents) {
//         const getObjectCommand = new GetObjectCommand({
//           Bucket: this.bucketName,
//           Key: obj.Key,
//         })

//         const { Body } = await this.s3Client.send(getObjectCommand)
//         const cacheData = JSON.parse(await streamToString(Body))

//         // If the object's tags include any of the specified tags, delete it
//         if (cacheData.tags.some((tag) => tags.includes(tag))) {
//           const deleteCommand = new DeleteObjectCommand({
//             Bucket: this.bucketName,
//             Key: obj.Key,
//           })
//           await this.s3Client.send(deleteCommand)
//         }
//       }
//     } catch (err) {
//       console.error('Error revalidating tags:', err)
//     }
//   }
// }

// // Helper function to convert stream data to string
// async function streamToString(stream) {
//   return new Promise((resolve, reject) => {
//     const chunks = []
//     stream.on('data', (chunk) => chunks.push(chunk))
//     stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
//     stream.on('error', reject)
//   })
// }