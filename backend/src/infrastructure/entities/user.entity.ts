import { EntityBase } from "src/domain/entity/entity-base.entity";
import { Column, CreateDateColumn, Entity, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity extends EntityBase {
    @Column({nullable: false, type: "varchar", length: 100})
    name: string;
    
    @Column({nullable: false, type: "varchar", length: 100})
    email: string;
    
    @Column({nullable: false, type: "varchar", length: 20})
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}