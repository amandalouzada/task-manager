import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { hash } from 'bcryptjs';

export class CreateUserRoleManyToMany1593331976568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_roles',
                columns: [
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'role_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'users_roles',
            new TableForeignKey({
                name: 'User',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'users_roles',
            new TableForeignKey({
                name: 'Role',
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        const roleAdmin = await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into("roles")
            .values({
                name: 'admin',
                description: 'Administrador'
            })
            .execute()
        await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into("roles")
            .values({
                name: 'backoffice',
                description: 'Backoffice'
            })
            .execute()

        const userAdmin = await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into("users")
            .values({
                name: 'Administrador',
                email: 'emailadmin@email.com',
                password: await hash('123456', 8),
            })
            .execute()


        await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into("users_roles")
            .values({
                user_id: userAdmin.identifiers[0].id,
                role_id: roleAdmin.identifiers[0].id
            })
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_roles', 'User');
        await queryRunner.dropForeignKey('users_roles', 'Role');
        await queryRunner.dropTable('users_roles');
    }

}
