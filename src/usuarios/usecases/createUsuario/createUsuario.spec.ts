import { CreateUsuarioUseCase } from './createUsuario.usecase';
import { UsuarioEntity } from '../../infra/entities/usuario.entity';
import type { UsuarioRepositoryInterface } from '../../models/interface/usuarioRepositoryInterface';

describe('CreateUsuarioUseCase', () => {
    const repository: jest.Mocked<UsuarioRepositoryInterface> = {
        create: jest.fn(),
        listAll: jest.fn(),
        findOneBy: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    const useCase = new CreateUsuarioUseCase(repository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um usuário e retornar o usuário criado', async () => {
        const usuarioPayload: Partial<UsuarioEntity> = {
            nome: 'Maria Souza',
            email: 'maria@email.com',
            senha: 'senha123',
            cpf: '12345678901',
            role: 'admin',
            ativo: true,
        };

        const usuarioCriado = {
            ...usuarioPayload,
            id: 1,
            criadoEm: new Date(),
            atualizadoEm: new Date(),
        } as UsuarioEntity;

        repository.create.mockResolvedValue(usuarioCriado);

        const result = await useCase.execute(usuarioPayload);

        expect(repository.create).toHaveBeenCalledTimes(1);
        expect(repository.create).toHaveBeenCalledWith(usuarioPayload);
        expect(result).toEqual(usuarioCriado);
    });

    it('deve repassar exatamente os dados recebidos para o repositório', async () => {
        const usuarioPayload: Partial<UsuarioEntity> = {
            nome: 'João Silva',
            email: 'joao@email.com',
            senha: 'senha456',
            cpf: '98765432100',
            role: 'tutor',
            ativo: false,
        };

        repository.create.mockResolvedValue({
            id: 2,
            ...usuarioPayload,
            criadoEm: new Date(),
            atualizadoEm: new Date(),
        } as UsuarioEntity);

        await useCase.execute(usuarioPayload);

        expect(repository.create).toHaveBeenCalledWith({
            nome: 'João Silva',
            email: 'joao@email.com',
            senha: 'senha456',
            cpf: '98765432100',
            role: 'tutor',
            ativo: false,
        });
    });

    it('deve propagar erro quando o repositório falhar ao criar o usuário', async () => {
        const usuarioPayload: Partial<UsuarioEntity> = {
            nome: 'Paulo Costa',
            email: 'paulo@email.com',
            senha: 'senha789',
            cpf: '11122233344',
            role: 'veterinario',
            ativo: true,
        };

        const error = new Error('Erro ao criar usuário');
        repository.create.mockRejectedValue(error);

        await expect(useCase.execute(usuarioPayload)).rejects.toThrow(
            'Erro ao criar usuário',
        );
    });
});
