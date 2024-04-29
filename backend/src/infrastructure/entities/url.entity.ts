import { EntityBase } from "src/domain/entity/entity-base.entity";
import { Column, CreateDateColumn, Entity, Index, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class UrlEntity extends EntityBase {
    @Index({unique: true})
    @Column({nullable: false, type: "varchar", length: 100})
    path: string;
    
    @Column({nullable: false, type: "numeric", default: 0})
    accesses: number;
    
    @Column({nullable: true, type: "numeric"})
    statusCode: number;

    @Column({nullable: true, type: "text"})
    responseBody: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}