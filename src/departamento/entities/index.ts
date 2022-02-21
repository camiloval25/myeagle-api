import { Pais } from 'src/pais/entities/pais.entity';
import { Usuario } from 'src/usuario/entities/usuarios.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('departamentos')
export class Departamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pais, { nullable: false })
  @JoinColumn({ name: 'paisId' })
  paisId: Pais;

  @Column({ type: 'varchar', length: 5 })
  codigo: string;

  @Column({ type: 'varchar' })
  nombre: string;

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
