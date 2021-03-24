import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserDevice {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  public deviceName: string;

  @Column()
  public deviceModel: string;

  @Column()
  public deviceVersion: string;

  @Column()
  public browser: string;

  @Column()
  public ipAddress: string;
}
