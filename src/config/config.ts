import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'nest_project',
    entities: [],
    synchronize: true,
  }