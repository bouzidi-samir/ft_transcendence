"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'postgres',
    entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
    migrations: [
        'dist/src/migrations/*.js'
    ],
    cli: {
        migrationsDir: 'src/migrations'
    }
};
exports.default = config;
//# sourceMappingURL=orm.js.map