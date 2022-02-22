import { Usuario } from 'src/usuario/entities/usuarios.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('paises')
export class Pais {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 5 })
  codigo: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  sigla: string;

  @Column({ type: 'boolean', default: false })
  favorito: boolean;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuarioCreacion' })
  usuarioCreacion: Usuario;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuarioModificacion' })
  usuarioModificacion: Usuario;

  @Column({ type: 'varchar' })
  equipoCreacion: string;

  @Column({ type: 'varchar', nullable: true })
  equipoModificacion: string;

  @CreateDateColumn({ type: 'timestamp' })
  fechaCreacion: Date;

  @Column('timestamp', {
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  fechaModificacion: Date;
}
