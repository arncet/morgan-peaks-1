
class PupilDataService {
  pupils = [
    {id: 0, firstName: 'John', lastName: 'Doe'},
  ];

  getAll() {
    return {data: this.pupils};
  }

  get(id) {
    return {data: this.pupils[id]};
  }

  create(data) {
    const pupil = {...data, id: this.pupils.length};
    this.pupils = [
      ...this.pupils,
      pupil,
    ];
    return {data: this.pupils};
  }

  update(id, data) {
    this.pupils[id] = data;
    return {data: this.pupils};
  }

  delete(id) {
    this.pupils.splice(id, 1);
    return {data: this.pupils};
  }

  deleteAll() {
    this.pupils = [];
    return {data: this.pupils};
  }

  findByWholeName(name) {
    const searchedName = name.toLowerCase();
    const result = this.pupils.find((pupil) => {
      const firstName = pupil.firstName.toLowerCase();
      const lastName = pupil.lastName.toLowerCase();
      return firstName.includes(searchedName) || lastName.includes(searchedName);
    });
    if (result === undefined) {
      return {data: []};
    }
    return {data: [result]};
  }
}

export default new PupilDataService();
