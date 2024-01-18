import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Service{

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    isDeleted: false;
}


