import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_roles', 'User');
        await queryRunner.dropForeignKey('users_roles', 'Role');
        await queryRunner.dropTable('users_roles');
    }

}
