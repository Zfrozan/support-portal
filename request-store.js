function createRequestStore(storage, makeId = () => crypto.randomUUID()) {
  const key = "northstar-requests";

  function save(requests) {
    storage.setItem(key, JSON.stringify(requests));
    return requests;
  }

  function load() {
    const requests = JSON.parse(storage.getItem(key) ?? "[]");
    if (!Array.isArray(requests) || requests.some(request =>
      !request || typeof request !== "object" || Array.isArray(request)
    )) {
      throw new Error("Invalid saved requests");
    }

    const ids = new Set();
    let migrated = false;
    const normalized = requests.map(request => {
      if (typeof request.id === "string" && request.id && !ids.has(request.id)) {
        ids.add(request.id);
        return request;
      }

      const id = makeId();
      ids.add(id);
      migrated = true;
      return { ...request, id };
    });
    return migrated ? save(normalized) : normalized;
  }

  return {
    load,
    add(fields) {
      return save([...load(), { ...fields, id: makeId() }]);
    },
    remove(id) {
      const requests = load();
      const remaining = requests.filter(request => request.id !== id);
      if (remaining.length === requests.length) {
        return { requests, removed: false };
      }
      return { requests: save(remaining), removed: true };
    }
  };
}

if (typeof module !== "undefined") {
  module.exports = { createRequestStore };
}
