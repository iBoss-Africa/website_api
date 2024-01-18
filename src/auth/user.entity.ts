import { Column, Entity, PrimaryGeneratedColumn,BeforeInsert,BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcrypt';

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
}


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.EDITOR,
    })
    role: UserRole;

    @Column()
    isDeleted: false;
}