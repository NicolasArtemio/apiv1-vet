import { UserRole } from "src/constants/user-roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;
    
    @Column({unique: true})
    nationalId: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: UserRole;
}


