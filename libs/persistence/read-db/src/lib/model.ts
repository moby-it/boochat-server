import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Room extends Model {
  @Column({ primaryKey: true })
  id!: string;
  @Column
  roomName!: string;
}
