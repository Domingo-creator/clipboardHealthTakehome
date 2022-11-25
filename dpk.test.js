const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the following string when given empty event object", () => {
    const encryptedKey = deterministicPartitionKey({});
    expect(encryptedKey).toBe("c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns ''  when given event with string partitionKey", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: '12345A'});
    expect(trivialKey).toBe("12345A");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns '' when given event with non-string partitionKey", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 12345});
    expect(trivialKey).toBe("12345");
  });
});


