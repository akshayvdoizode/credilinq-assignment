import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["companyUEN"])
export class CompanyDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  companyUEN: string;

  @Column()
  contactName: string;

  @Column()
  position: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @CreateDateColumn({ type: "time" })
  createdAt: string;
}
