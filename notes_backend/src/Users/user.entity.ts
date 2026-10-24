import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import INote from '../Notes/note.interface.js';
import Note from '../Notes/note.entity.js';
import IUser from './user.interface.js';
import { Expose } from 'class-transformer';

@Entity('users')
export class User implements IUser {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Expose()
  @Column({ type: 'varchar', length: 100, nullable: false })
  surname: string;

  @Expose()
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Expose()
  @OneToMany(() => Note, (note: INote) => note.user)
  notes: INote[];

  @Expose()
  @Column({
    name: 'isverified',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isVerified: boolean;

  @Expose()
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Expose()
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
