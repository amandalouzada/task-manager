import { createConnections } from 'typeorm';
createConnections();

import { getMongoRepository, MongoRepository } from "typeorm";
import Role from '@modules/acl/infra/typeorm/entities/Role';

const seedRoleRepository: MongoRepository<Role> = getMongoRepository(Role, 'mongo');

const runSeed = async () => {
  const role = seedRoleRepository.create({
    name: 'Admin2',
    description: 'Adiministrador do sistema'
  })
  await seedRoleRepository.save(role);
}

runSeed();


