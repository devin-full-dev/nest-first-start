import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @Column({ unique: true, nullable: true })
  public email: string;

  @Column('date')
  public dateOfBirth: Date;

  @Column({ nullable: true })
  public profileImage: string;

  @Column({ type: 'int', default: 1 })
  public status: number;

  @Column()
  public active: boolean;

  @Column('timestamp')
  public createdAt: Date;

  @Column('timestamp')
  public updatedAt: Date;
}
