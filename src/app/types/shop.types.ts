export interface ShopItemDTO {
  idItem: number;
  nombre: string;
  precio: number;
  iconoUrl: string; // La URL de la imagen (ej. 'assets/hats/gorra.png')
  adquirido: boolean;
  enUso: boolean;
}

export interface ShopResponse {
  estrellasDisponibles: number;
  itemsPorTipo: { [key: string]: ShopItemDTO[] };
}

export interface AvatarUpdateRequest {
  itemsEquipadosIds: number[];
  imagenBase64: string;
}
