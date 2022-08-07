import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';


const config: TypeOrmModuleOptions = {

        
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'user',
        password: 'password',
        database: 'postgres',
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
        migrations: [
            'dist/src/migrations/*.js'
        ],
        cli: {
            migrationsDir: 'src/migrations'
        }

}

export default config;