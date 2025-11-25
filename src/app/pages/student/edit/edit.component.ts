import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChipListComponent } from '../../../components/chip-list/chip-list.component';
import { ChipConfig } from '../../../types/chip.types';
import { ShopService } from '../../../services/shop.service';
import { ShopItemDTO, ShopResponse } from '../../../types/shop.types';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ChipListComponent],
})
export default class EditComponent implements OnInit {
  @ViewChild('avatarCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private shopService = inject(ShopService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  // ESTADO
  itemsMap: { [key: string]: ShopItemDTO[] } = {};
  typesChips: ChipConfig[] = [];
  currentCategory: string = '';
  selectedItems: Map<string, ShopItemDTO> = new Map();
  estrellasDisponibles: number = 0;

  // CONFIGURACIÓN DEL AVATAR
  // 1. Ruta de la imagen base (Asegúrate que este archivo exista en src/assets)
  readonly BASE_BODY_URL = 'assets/avatar/base_body.png';

  // 2. Orden de capas para accesorios DINÁMICOS (El cuerpo base va fijo en el HTML/Canvas)
  // El orden es de atrás hacia adelante: Fondo -> (Cuerpo Fijo) -> Ropa -> Cara...
  layerOrder = ['Fondos', 'Ropa', 'Cara', 'Cabello', 'Accesorios', 'Sombreros'];

  ngOnInit() {
    this.loadShopData();
  }

  loadShopData() {
    this.shopService.getShop().subscribe({
      next: (res: ShopResponse) => {
        this.itemsMap = res.itemsPorTipo;
        this.estrellasDisponibles = res.estrellasDisponibles;

        const categories = Object.keys(this.itemsMap);
        if (categories.length > 0) {
          this.currentCategory = categories[0];
          this.typesChips = categories.map((cat, i) => ({
            label: cat,
            selected: i === 0,
          }));
        }

        // Cargar lo que ya trae puesto
        categories.forEach((cat) => {
          const equipped = this.itemsMap[cat].find((i) => i.enUso);
          if (equipped) {
            this.selectedItems.set(cat, equipped);
          }
        });
      },
      error: () => this.toastService.showError('Error al cargar la tienda'),
    });
  }

  changeTab(index: number) {
    if (index >= 0 && index < this.typesChips.length) {
      this.currentCategory = this.typesChips[index].label;
      this.typesChips.forEach((chip, i) => (chip.selected = i === index));
    }
  }

  selectItem(item: ShopItemDTO) {
    // Lógica de Compra
    if (!item.adquirido) {
      this.tryBuyItem(item);
      return;
    }

    // Lógica de Equipar (Toggle)
    const current = this.selectedItems.get(this.currentCategory);

    // Si ya lo tengo puesto, me lo quito
    if (current?.idItem === item.idItem) {
      this.selectedItems.delete(this.currentCategory);
    } else {
      // Si es nuevo, me lo pongo (reemplaza al anterior de esa categoría)
      this.selectedItems.set(this.currentCategory, item);
    }
  }

  tryBuyItem(item: ShopItemDTO) {
    if (this.estrellasDisponibles < item.precio) {
      this.toastService.showError(
        `Te faltan ${item.precio - this.estrellasDisponibles} estrellas.`
      );
      return;
    }

    const confirm = window.confirm(
      `¿Comprar "${item.nombre}" por ${item.precio} estrellas?`
    );
    if (confirm) {
      this.shopService.buyItem(item.idItem).subscribe({
        next: () => {
          this.estrellasDisponibles -= item.precio;
          item.adquirido = true;
          this.toastService.showSuccess(`¡Compraste ${item.nombre}!`);
          this.selectedItems.set(this.currentCategory, item);
        },
        error: () =>
          this.toastService.showError('Error al realizar la compra.'),
      });
    }
  }

  async saveAvatar() {
    try {
      const base64 = await this.generateCompositeImage();
      const ids = Array.from(this.selectedItems.values()).map((i) => i.idItem);

      this.shopService
        .saveAvatar({ itemsEquipadosIds: ids, imagenBase64: base64 })
        .subscribe({
          next: () => {
            this.toastService.showSuccess('¡Avatar actualizado!');
            this.goBack();
          },
          error: () => this.toastService.showError('No se pudo guardar'),
        });
    } catch (e) {
      console.error(e);
      this.toastService.showError('Error al generar la imagen');
    }
  }

  private generateCompositeImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d');

      // Tamaño del canvas (Asegúrate que coincida con tus assets, ej 500x500)
      canvas.width = 500;
      canvas.height = 500;

      if (!ctx) {
        reject('No context');
        return;
      }

      // --- 1. CONSTRUIR LA LISTA DE CAPAS EN ORDEN (DE ATRÁS HACIA ADELANTE) ---
      const urlsToDraw: string[] = [];

      // CAPA 0: FONDO (Si existe)
      // Nota: Asegúrate de usar la clave correcta ("Fondos" o "Fondo")
      const fondo = this.selectedItems.get('Fondos');
      if (fondo?.iconoUrl) {
        urlsToDraw.push(fondo.iconoUrl);
      }

      // CAPA 1: CUERPO BASE (Fijo)
      // 👇👇 ESTA ES LA LÍNEA QUE TE FALTABA 👇👇
      urlsToDraw.push(this.BASE_BODY_URL);
      // 👆👆 SIN ESTO, EL CANVAS NO DIBUJA EL CUERPO 👆👆

      // CAPA 2+: ACCESORIOS (Ropa, Cara, etc.)
      // Iteramos el orden definido, saltándonos 'Fondos' porque ya lo pusimos al inicio
      this.layerOrder.forEach((layer) => {
        if (layer !== 'Fondos') {
          const item = this.selectedItems.get(layer);
          if (item?.iconoUrl) {
            urlsToDraw.push(item.iconoUrl);
          }
        }
      });

      // --- 2. DIBUJAR SECUENCIALMENTE ---
      const drawLayers = async () => {
        for (const url of urlsToDraw) {
          await new Promise<void>((res) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous'; // Vital para evitar errores de seguridad
            img.src = url;

            img.onload = () => {
              // Dibujar imagen estirada al tamaño del canvas
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              res();
            };

            // Si una imagen falla (ej. 404), seguimos con la siguiente para no romper todo
            img.onerror = () => {
              console.error('Error cargando imagen para canvas:', url);
              res();
            };
          });
        }

        // Retornar la imagen final generada
        resolve(canvas.toDataURL('image/png'));
      };

      drawLayers();
    });
  }

  goBack() {
    this.router.navigate(['/student/detail']);
  }
}
