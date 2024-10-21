import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.RENDER_DB_URL!, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,     
      rejectUnauthorized: false, 
    },
  },
  logging: false,
});

export default sequelize;
