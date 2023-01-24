import { promises as fs } from 'fs';
import { randomUUID } from 'crypto' 
import { Api, ApiWithOutIdAndDate } from './types';

const filename = './db.json';

let data: Api[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },

  async getItems() {
    return data;
  },

  async addItem(item: ApiWithOutIdAndDate) {
    const date = new Date
    const _id = randomUUID();

    const message = {
        _id,
        datetime: date.toISOString(),
        ...item, 
    };

    data.push(message);

    await this.save();

    return message;
  },

  async save() {
    await fs.writeFile(filename, JSON.stringify(data));
  }, 
};

export default fileDb;