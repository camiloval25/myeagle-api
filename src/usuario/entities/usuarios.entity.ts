import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoUsuario } from '../enums/tipo-usuario.enum';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  primerNombre: string;

  @Column({ type: 'varchar', nullable: true })
  segundoNombre: string;

  @Column({ type: 'varchar', nullable: false })
  primerApellido: string;

  @Column({ type: 'varchar', nullable: true })
  segundoApellido: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: TipoUsuario,
    default: TipoUsuario.USER,
  })
  tipoUsuario: TipoUsuario;

  @CreateDateColumn({ type: 'timestamp' })
  fechaCreacion: Date;
}
