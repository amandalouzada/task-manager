import { validate } from "class-validator";
import AppError from "@shared/errors/AppError";
import { Repository  } from "typeorm";
export default class BaseRepository<T> {
  protected ormRepository: Repository<T>;

  constructor() {
  }
  async validate(data: T) {
    const errors = await validate(data);
    const listErrors: { [key: string]: any } = errors.map(e => {
      return {
        property: e.property,
        errors: e.constraints
      }
    });
    if (errors.length > 0) throw new AppError(`Validation failed!`, 409, listErrors);
  }
}