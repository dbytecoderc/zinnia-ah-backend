import { hashPassword } from '../../utils/helpers.utils';
import { ADMIN, AUTHOR } from '../../utils/constants';

export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          username: 'igbominadeveloper',
          first_name: 'igbomina',
          last_name: 'developer',
          email: 'igbominadeveloper@ah.com',
          role: AUTHOR,
          password: await hashPassword('password1'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '4c6fab4c-3926-4be5-166c-4a911165cd35',
          username: 'superadmin',
          email: 'admin@ah.com',
          password: await hashPassword('password1'),
          role: ADMIN,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '34745e2c-772c-41df-916c-375958882184',
          username: 'gentlejane',
          first_name: 'gentle',
          last_name: 'jane',
          email: 'giant@gmail.com',
          role: AUTHOR,
          password: await hashPassword('smiley007'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '3231983a-b944-4c53-a549-f561f7474428',
          username: 'janesmith',
          first_name: 'jane',
          last_name: 'smith',
          email: 'jsmith@gmail.com',
          role: AUTHOR,
          password: await hashPassword('hhrtuyhgty5t678'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '856423fd-9c61-40e6-a72c-bd4cc9bdd880',
          username: 'Dctester',
          email: 'Dctester@gmail.com',
          role: AUTHOR,
          password: await hashPassword('testseeder'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '18651989-732f-4c04-9ddc-ea1f73818fd1',
          username: 'nedyudombat',
          first_name: 'nedy',
          last_name: 'udombat',
          email: 'nedyudombat@ah.com',
          role: AUTHOR,
          password: await hashPassword('nedyudombat'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
          username: 'tinawhatsgood',
          first_name: 'tina',
          last_name: 'whatsgood',
          email: 'tinawhatsgood@ah.com',
          role: AUTHOR,
          password: await hashPassword('newtyronne'),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
