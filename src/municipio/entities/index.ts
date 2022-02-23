import { Departamento } from 'src/departamento/entities';
import { Usuario } from 'src/usuario/entities/usuarios.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('municipios')
export class Municipio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Departamento)
  @JoinColumn({ name: 'departamentoId' })
  departamentoId: Departamento;

  @Column({ type: 'varchar', length: 5 })
  codigo: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  sigla: string;

  @Column({ type: 'boolean', default: true })
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
