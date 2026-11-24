const test = require("node:test");
const assert = require("node:assert/strict");
const { createRequestStore } = require("../request-store.js");

const sample = { name: "Sam", email: "sam@example.com", issue: "Order status" };

function memoryStorage(requests = []) {
  let data = JSON.stringify(requests);
  return {
    getItem: () => data,
    setItem: (_key, value) => { data = value; }
  };
}

test("migrates identical Sprint 1 requests and deletes only the selected entry", () => {
  const storage = memoryStorage([sample, sample]);
  let sequence = 0;
  const store = createRequestStore(storage, () => String(++sequence));
  const [first, second] = store.load();
  assert.notEqual(first.id, second.id);
  assert.deepEqual(createRequestStore(storage).load(), [first, second]);
  assert.deepEqual(store.remove(second.id), { requests: [first], removed: true });
  assert.deepEqual(createRequestStore(storage).load(), [first]);
});

test("leaves saved requests intact when the selected ID is absent", () => {
  const store = createRequestStore(memoryStorage());
  const saved = store.add(sample);
  assert.deepEqual(store.remove("missing"), { requests: saved, removed: false });
  assert.deepEqual(store.load(), saved);
});

test("keeps the saved request when storage rejects deletion", () => {
  const saved = [{ ...sample, id: "1" }];
  const storage = memoryStorage(saved);
  storage.setItem = () => { throw new Error("Storage unavailable"); };
  const store = createRequestStore(storage);
  assert.throws(() => store.remove("1"), /Storage unavailable/);
  assert.deepEqual(store.load(), saved);
});
