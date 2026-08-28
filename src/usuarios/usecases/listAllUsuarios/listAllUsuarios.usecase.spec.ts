import { ListAllUsuariosUseCase } from './listAllUsuarios.usecase';
import type { UsuarioRepositoryInterface } from '../../models/interface/usuarioRepositoryInterface';

describe('ListAllUsuariosUseCase', () => {
  it('deve listar todos os usuários do repositório', async () => {
    const usuarios = [
      {
        id: 1,
        nome: 'Maria',
        email: 'maria@email.com',
      },
      {
        id: 2,
        nome: 'João',
        email: 'joao@email.com',
      },
    ];

    const repository: jest.Mocked<UsuarioRepositoryInterface> = {
      create: jest.fn(),
      listAll: jest.fn().mockResolvedValue(usuarios),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const useCase = new ListAllUsuariosUseCase(repository);

    await expect(useCase.execute()).resolves.toEqual(usuarios);
    expect(repository.listAll).toHaveBeenCalledTimes(1);
  });
});
