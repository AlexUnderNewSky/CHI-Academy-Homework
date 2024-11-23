import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
// import { NewsPost } from './entity/NewsPost';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "lesson13",
    password: "password",
    database: "lesson13",
    migrations: ['./src/migrations/*.ts'],
    synchronize: false,
    entities: [User]
});