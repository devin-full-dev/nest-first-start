import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public userName: string;

  @Column()
  public password: string;

  @Column()
  public email: string;
}

export default User;
