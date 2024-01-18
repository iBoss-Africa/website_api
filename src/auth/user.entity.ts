import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
}


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.EDITOR,
    })
    role: UserRole
}