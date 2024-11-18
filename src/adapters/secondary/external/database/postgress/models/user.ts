import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'users' })
class UserModel {
    @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
    public userId: string

    @Column({ type: 'varchar', length: 255, name: 'name' })
    public name: string
    
    @Column({ type: 'varchar', length: 255, unique: true, name: 'email' })
    public email: string

    @Column({ type: 'varchar', length: 255, name: 'password' })
    public password: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    public createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    public updatedAt: Date

    constructor(
        userId: string,
        name: string,
        email: string,
        password: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.userId = userId
        this.name = name
        this.email = email
        this.password = password
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export { UserModel }
