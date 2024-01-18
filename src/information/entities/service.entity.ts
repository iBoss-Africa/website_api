import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Service{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    isDeleted: false;
}


