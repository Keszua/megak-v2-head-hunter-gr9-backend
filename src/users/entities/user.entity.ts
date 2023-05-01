import { Hr } from 'src/hr/entities/hr.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Student } from '../../students/entities';
import { ActivationToken, PasswordResetToken, RefreshToken } from '../../tokens/entities';
import { UserEntity, UserRole } from '../../types';

@Entity('users')
export class User extends BaseEntity implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  hashPwd?: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: false, default: false })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Student, student => student.user)
  student: Student;

  @OneToMany(() => ActivationToken, activationToken => activationToken.user)
  activationTokens: ActivationToken[];

  @OneToMany(() => PasswordResetToken, passwordResetToken => passwordResetToken.user)
  passwordResetTokens: PasswordResetToken[];

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToOne(() => Hr, hr => hr.user)
  hr: Hr;
}
