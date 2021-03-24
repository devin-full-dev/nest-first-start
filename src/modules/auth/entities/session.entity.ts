import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  revoke: number;

  @Column()
  apiInvocationCount: number;

  @Column()
  lastAccessTime: Date;

  @Column()
  expiresAt: Date;

  @Column()
  fcmToken: string;
}
