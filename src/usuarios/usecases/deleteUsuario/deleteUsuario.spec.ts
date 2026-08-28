import { DeleteUsuarioUseCase } from './deleteUsuario.usecase';
import type { UsuarioRepositoryInterface } from '../../models/interface/usuarioRepositoryInterface';
import { UsuarioEntity } from '../../infra/entities/usuario.entity';
import { FindOneUsuarioByIdUseCase } from '../findOneUsuarioById/findOneUsuarioById.usecase';

describe('DeleteUsuarioUseCase', () => {
  const repository: jest.Mocked<UsuarioRepositoryInterface> = {
    create: jest.fn(),
    listAll: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const findOneUsuarioByIdUseCase: jest.Mocked<Pick<FindOneUsuarioByIdUseCase, 'execute'>> = {
    execute: jest.fn(),
  };

  const useCase = new DeleteUsuarioUseCase(repository, findOneUsuarioByIdUseCase as unknown as FindOneUsuarioByIdUseCase);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve deletar um usuário quando o usuário existir', async () => {
    const usuario: UsuarioEntity = {
      id: 1,
      nome: 'Maria Souza',
      email: 'maria@email.com',
      senha: 'senha123',
      cpf: '12345678901',
      role: 'admin',
      ativo: true,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    findOneUsuarioByIdUseCase.execute.mockResolvedValue(usuario);
    repository.delete.mockResolvedValue(usuario);

    const result = await useCase.execute(1);

    expect(findOneUsuarioByIdUseCase.execute).toHaveBeenCalledTimes(1);
    expect(findOneUsuarioByIdUseCase.execute).toHaveBeenCalledWith(1);
    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual(usuario);
  });

  it('deve propagar erro quando o usuário não for encontrado', async () => {
    const error = new Error('Usuário não encontrado');
    findOneUsuarioByIdUseCase.execute.mockRejectedValue(error);

    await expect(useCase.execute(999)).rejects.toThrow('Usuário não encontrado');
    expect(repository.delete).not.toHaveBeenCalled();
  });
});
