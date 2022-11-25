const crypto = require("crypto");

////////////////// REFACTOR   ////////////////////

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if(event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
      if(typeof candidate !== 'string') {
        candidate = JSON.stringify(candidate)
      }
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
    if(candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
    return candidate;
  } else {
    return TRIVIAL_PARTITION_KEY
  }
}


/// OLD CODE //////
/*
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  //if there is an event. give candidate a value.
  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  //check if candidate exisits, which only happens if event exisits
  if (candidate) {
    //if candidiate is not a string, make it into a string.
    //could only not be a string if event.partitionKey was not a string
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } 

  //if there is not a candidite(there is no event), candidate = "0"
  else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  //if candidate length > 256, candidate = hashed candidate.
  //could only happen if there is an event
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
*/



