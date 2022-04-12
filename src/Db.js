const Db = {
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  exists(key) {
    if (localStorage.getItem(key) === null) {
      return false;
    }
    return true;
  },

  set(key, value) {
    if (this.exists(key)) {
      alert("A record already exists for this username ");
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
    return true;
  },

  delete(key) {
    if (this.exists(key)) {
      localStorage.removeItem(key);
    } else {
      alert("No record exists for this username ");
    }
  },
};

export default Db;
