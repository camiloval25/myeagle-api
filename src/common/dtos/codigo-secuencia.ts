import { IsString } from "class-validator";

export class CodigoSecuenciaDTO {
    @IsString()
    codigo: string;
}