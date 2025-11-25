import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { ToastService } from '../../../services/toast.service';

type GameState = 'READY' | 'PLAYING' | 'GAME_OVER';
type TopicKey =
  | 'FRACCIONES'
  | 'DECIMALES'
  | 'TABLA_9'
  | 'TABLA_7'
  | 'TABLA_4'
  | 'DIVISION';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-hot-potato',
  templateUrl: './hot-potato.component.html',
  styleUrls: ['./hot-potato.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export default class HotPotatoComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameService = inject(GameService);
  private toastService = inject(ToastService);

  // Configuración
  classCode: string = '';
  topicKey: TopicKey = 'TABLA_4';
  topicLabel: string = '';

  // Estado
  state: GameState = 'READY';
  currentQuestion: Question | null = null;

  // Supervivencia
  timeLeft: number = 30; // Tiempo inicial
  private timerInterval: any;

  // Audio
  private musicAudio = new Audio('assets/sounds/game-music.mp3');
  private boomAudio = new Audio('assets/sounds/explosion.mp3');
  private correctAudio = new Audio('assets/sounds/correct.mp3');
  private wrongAudio = new Audio('assets/sounds/wrong.mp3');

  // Etiquetas para mostrar
  private topicLabels: Record<string, string> = {
    FRACCIONES: 'Multiplicación de Fracciones',
    DECIMALES: 'Restas con Punto Decimal',
    TABLA_9: 'Tabla del 9',
    TABLA_7: 'Tabla del 7',
    TABLA_4: 'Tabla del 4',
    DIVISION: 'Divisiones Básicas',
  };

  ngOnInit() {
    this.classCode =
      this.route.parent?.snapshot.paramMap.get('classCode') || '';
    const t = this.route.snapshot.paramMap.get('topic');

    if (t && this.topicLabels[t]) {
      this.topicKey = t as TopicKey;
      this.topicLabel = this.topicLabels[t];
    } else {
      this.topicLabel = 'Modo Supervivencia';
    }

    this.musicAudio.loop = true;
  }

  ngOnDestroy() {
    this.stopGameLoop();
  }

  goBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  // --- CONTROL DEL JUEGO ---

  async startGame() {
    try {
      // 1. Backend: Dar estrellas por participar
      await this.gameService.startHotPotato(this.classCode).toPromise();
      this.toastService.showSuccess(
        '¡Todos ganaron 1 estrella! ¡A sobrevivir!'
      );
      this.startSurvivalMode();
    } catch (error) {
      // Si falla (offline), jugamos igual
      this.startSurvivalMode();
    }
  }

  startSurvivalMode() {
    this.state = 'PLAYING';
    this.timeLeft = 30; // Reset tiempo
    this.playMusic();
    this.generateNewQuestion();

    // Loop del Timer
    this.timerInterval = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        this.gameOver();
      }
    }, 1000);
  }

  checkAnswer(selectedOption: string) {
    if (this.state !== 'PLAYING' || !this.currentQuestion) return;

    if (selectedOption === this.currentQuestion.correctAnswer) {
      // ✅ CORRECTO: +3 Segundos y Nueva Pregunta
      this.timeLeft += 3;
      this.playFx(this.correctAudio);
      this.generateNewQuestion();
    } else {
      // ❌ INCORRECTO: -3 Segundos y Shake
      this.timeLeft = Math.max(0, this.timeLeft - 3);
      this.playFx(this.wrongAudio);

      // Activar animación de shake en el body o contenedor
      const wrapper = document.querySelector('.game-wrapper');
      wrapper?.classList.add('shake-screen');
      setTimeout(() => wrapper?.classList.remove('shake-screen'), 300);

      if (this.timeLeft <= 0) this.gameOver();
    }
  }

  gameOver() {
    this.state = 'GAME_OVER';
    this.stopGameLoop();
    this.boomAudio.play();
  }

  restart() {
    this.state = 'READY';
    this.stopGameLoop();
  }

  stopGameLoop() {
    clearInterval(this.timerInterval);
    this.musicAudio.pause();
    this.musicAudio.currentTime = 0;
  }

  // --- GENERADOR DE PREGUNTAS ---

  generateNewQuestion() {
    this.currentQuestion = this.createMathProblem(this.topicKey);
  }

  createMathProblem(topic: TopicKey): Question {
    const r = (max: number) => Math.floor(Math.random() * max) + 1;
    let text = '',
      answerVal = 0,
      answerStr = '';

    // --- 1. GENERAR PROBLEMA Y RESPUESTA CORRECTA ---
    switch (topic) {
      case 'TABLA_4': {
        const n = r(10);
        text = `4 x ${n}`;
        answerVal = 4 * n;
        answerStr = answerVal.toString();
        break;
      }
      case 'TABLA_7': {
        const n = r(10);
        text = `7 x ${n}`;
        answerVal = 7 * n;
        answerStr = answerVal.toString();
        break;
      }
      case 'TABLA_9': {
        const n = r(10);
        text = `9 x ${n}`;
        answerVal = 9 * n;
        answerStr = answerVal.toString();
        break;
      }
      case 'DIVISION': {
        const div = r(9) + 1; // Divisor entre 2 y 10
        const coc = r(10); // Cociente entre 1 y 10
        text = `${div * coc} ÷ ${div}`;
        answerVal = coc;
        answerStr = coc.toString();
        break;
      }
      case 'DECIMALES': {
        // Generar decimales simples (ej. 5.5 - 2.1)
        const a = parseFloat((Math.random() * 20 + 5).toFixed(1));
        const b = parseFloat((Math.random() * (a - 1)).toFixed(1)); // Asegura a > b
        answerVal = parseFloat((a - b).toFixed(1));
        text = `${a} - ${b}`;
        answerStr = answerVal.toString();
        break;
      }
      case 'FRACCIONES': {
        // Multiplicación de fracciones pequeñas (1 al 6) para que sea legible
        const n1 = r(5),
          d1 = r(5) + 1;
        const n2 = r(5),
          d2 = r(5) + 1;
        text = `${n1}/${d1} × ${n2}/${d2}`;
        answerStr = `${n1 * n2}/${d1 * d2}`; // No simplificamos para facilitar la lógica rápida
        break;
      }
    }

    // --- 2. GENERAR DISTRACTORES (OPCIONES INCORRECTAS) ---
    const options = new Set<string>();
    options.add(answerStr); // Agregamos la correcta primero

    let attempts = 0;
    // Intentamos generar opciones hasta tener 4 o hasta 50 intentos (FRENO DE EMERGENCIA)
    while (options.size < 4 && attempts < 50) {
      attempts++;
      let fake = '';

      if (topic === 'FRACCIONES') {
        const parts = answerStr.split('/');
        const correctNum = parseInt(parts[0]);
        const correctDen = parseInt(parts[1]);

        // Variación: Sumar/Restar 1 o 2 al numerador o denominador
        // (Math.random() > 0.5 ? 1 : -1) genera aleatoriamente 1 o -1
        const offsetNum =
          (Math.floor(Math.random() * 3) + 1) * (Math.random() > 0.5 ? 1 : -1);
        const offsetDen =
          Math.floor(Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1);

        const num = Math.max(1, correctNum + offsetNum); // Evitar negativos
        const den = Math.max(2, correctDen + offsetDen); // Evitar denominador 0 o 1

        fake = `${num}/${den}`;
      } else if (topic === 'DECIMALES') {
        // Variar decimales por 0.1, 0.5 o 1.0
        const offsets = [-1, -0.5, -0.1, 0.1, 0.5, 1];
        const randomOffset =
          offsets[Math.floor(Math.random() * offsets.length)];
        let wrong = answerVal + randomOffset;
        if (wrong < 0) wrong = Math.abs(wrong); // Evitar negativos
        fake = wrong.toFixed(1);
      } else {
        // Enteros (Tablas/División)
        // Variar por un número pequeño (1-5)
        const offset =
          (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
        let wrong = answerVal + offset;
        if (wrong < 0) wrong = 0; // Evitar negativos
        fake = wrong.toString();
      }

      // Solo agregamos si es diferente a la correcta
      if (fake !== answerStr) {
        options.add(fake);
      }
    }

    // --- 3. RELLENO DE EMERGENCIA ---
    // Si después de 50 intentos no logramos 4 opciones únicas (raro, pero posible),
    // rellenamos con números aleatorios genéricos para que la UI no se rompa.
    while (options.size < 4) {
      if (topic === 'FRACCIONES') {
        options.add(`${r(20)}/${r(20) + 1}`);
      } else {
        options.add((Math.floor(Math.random() * 100) + 1).toString());
      }
    }

    // --- 4. RETORNAR MEZCLADO ---
    return {
      text,
      correctAnswer: answerStr,
      options: Array.from(options).sort(() => Math.random() - 0.5),
    };
  }

  // Helpers
  playMusic() {
    this.musicAudio.play().catch(() => {});
  }
  playFx(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
}
