import { TypeUserPermissionEnum } from 'libs/shared/enums/type.user.permission';

export interface PayloadJwtDto {
  email: string;
  sub: number;
  typeUserPermission: TypeUserPermissionEnum;
  cpf: string;
}
