
class PupilDataService {
  pupils = [
    {firstName: 'John', lastName: 'Doe'},
  ];

  getAll() {
    return this.pupils;
  }

  get(id) {
    return this.pupils[id];
  }

  create(data) {
    this.pupils = [
      ...this.pupils,
      data,
    ];
  }

  update(id, data) {
    this.pupils[id] = data;
  }

  delete(id) {
    this.pupils = this.pupils.splice(id, 1);
  }

  deleteAll() {
    this.pupils = [];
  }

  findByTitle(name) {
    return this.pupils.find((pupil) => pupil.name === name);
  }
}

export default new PupilDataService();
