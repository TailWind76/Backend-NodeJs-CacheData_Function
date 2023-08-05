// Connecting to Redis
const redis = require('redis');
const client = redis.createClient();

// Function for Caching Results
const cachedFunction = (key, callback) => {
  client.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      callback(JSON.parse(data));
    } else {
      // Your operation execution code here
      const result = { message: 'This is cached function data!' };

      client.setex(key, 3600, JSON.stringify(result));
      callback(result);
    }
  });
};

// Using Cached Function
const myFunction = (params) => {
  const cacheKey = `myFunction:${JSON.stringify(params)}`;
  cachedFunction(cacheKey, (result) => {
    // Handle the result here
    console.log(result);
  });
};
