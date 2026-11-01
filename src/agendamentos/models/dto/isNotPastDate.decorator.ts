import { registerDecorator, ValidationOptions } from 'class-validator';

const TOLERANCIA_MS = 60 * 1000;

// Aceita "agora" com 1 minuto de tolerância para atrasos de rede/relógio.
export function IsNotPastDate(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isNotPastDate',
      target: object.constructor,
      propertyName,
      options: {
        message: 'A data do agendamento não pode estar no passado',
        ...validationOptions,
      },
      validator: {
        validate(value: unknown) {
          const time = new Date(value as string).getTime();
          return !Number.isNaN(time) && time >= Date.now() - TOLERANCIA_MS;
        },
      },
    });
  };
}
