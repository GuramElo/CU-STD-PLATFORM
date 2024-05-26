import { TypeOrmModule } from '@nestjs/typeorm';
import process from 'node:process';

export function generateORMProvider() {
  return process.env.isProd
    ? TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'db', // Use the Docker service name as the host
        port: 5432, // Use the internal Docker port for PostgreSQL
        username: 'jigar',
        password: 'mysecretpassword',
        database: 'mydb', // Ensure this matches the DB name given in Docker Compose
        synchronize: true,
        autoLoadEntities: true,
      })
    : TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 8080,
        username: 'jigar',
        password: 'mysecretpassword',
        database: 'jigar',
        synchronize: true,
        autoLoadEntities: true,
      });
}
