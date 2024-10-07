import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent implements OnInit {
  chatbotVisible = true; // El chatbot siempre visible
  messages: { text: string, sender: string }[] = [];
  userMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    // Intenta cargar la conversación guardada
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    } else {
      this.addBotMessage('¡Hola! ¿En qué puedo ayudarte?');
    }
  }

  sendMessage() {
    const trimmedMessage = this.userMessage.trim();

    if (trimmedMessage) {
      this.addUserMessage(trimmedMessage);

      setTimeout(() => {
        this.addBotMessage(this.getBotResponse(trimmedMessage));
      }, 1000);

      this.userMessage = '';
    }
  }

  addUserMessage(message: string) {
    this.messages.push({ text: message, sender: 'user' });
    this.saveMessages();
  }

  addBotMessage(message: string) {
    this.messages.push({ text: message, sender: 'bot' });
    this.saveMessages();
  }

  // Método para guardar la conversación en localStorage
  saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
  }

  // Método para obtener la respuesta del bot
  getBotResponse(userMessage: string): string {
    const messageLower = userMessage.toLowerCase().trim().replace(/[^\w\s]/gi, '');

    const responses: { [key: string]: string } = {
      'hola': '¡Hola! ¿Cómo puedo ayudarte hoy?',
      'adios': '¡Hasta luego! No dudes en volver si tienes más preguntas.',
      'ayuda': 'Claro, ¿en qué tema específico necesitas ayuda?',
      'precio': 'El precio del servicio es $50 al mes.',
      'como registro mis gastos': 'Para registrar tus datos tienes que dirigirte al menú de mano izquierda, luego presionar en el botón llamado Gastos, allí podrás configurar tus gastos a tus gustos.',
      'donde registro mis gastos': 'Para registrar tus datos tienes que dirigirte al menú de mano izquierda, luego presionar en el botón llamado Gastos, allí podrás configurar tus gastos a tus gustos.',
      'que incluye el informe general': 'El Informe General te ofrece un resumen completo de tus ingresos, gastos, ahorros y deudas. Es ideal para obtener una vista rápida de tu situación financiera.',
      'cada cuanto se actualiza el informe general': 'El Informe General se actualiza automáticamente cada vez que registras un nuevo ingreso o gasto, por lo que siempre está al día.',
      'puedo personalizar el informe general': 'Actualmente, el Informe General muestra una vista estándar con los datos más importantes. Sin embargo, puedes ajustar las fechas para ver la información de un periodo específico.',
      'que tipo de estadisticas puedo ver': 'Puedes ver estadísticas detalladas sobre tus ingresos, gastos y ahorros a lo largo del tiempo. Además, puedes ver gráficos de barras y tortas que muestran tus finanzas en función de las categorías.',
      'como interpreto los graficos': 'Los gráficos en la sección de Estadísticas te ayudan a visualizar tus patrones de gasto y ahorro. Los gráficos de barras muestran la evolución mensual, mientras que los gráficos de torta muestran la proporción de cada categoría de gasto.',
      'puedo descargar las estadisticas': 'Actualmente, las estadísticas no se pueden descargar directamente desde la plataforma. Sin embargo, puedes tomar capturas de pantalla para tener un registro visual.',
      'como puedo crear un plan de ahorro': 'Para crear un plan de ahorro, ingresa a la sección Plan de Ahorro, establece un objetivo, define el monto que deseas ahorrar.',
      'puedo tener varios planes de ahorro a la vez': 'Sí, puedes crear y gestionar varios planes de ahorro simultáneamente. Cada uno puede tener su propio objetivo y monto a ahorrar.',
      'que sucede si no cumplo con mi meta de ahorro': 'Si no logras cumplir con la meta en el plazo estipulado, el sistema te permitirá ajustar la meta o el plazo para que puedas seguir trabajando en tu plan de ahorro.',
      'puedo modificar mi plan de ahorro': 'Sí, puedes modificar tu plan de ahorro en cualquier momento. Simplemente ingresa al plan que deseas modificar y ajusta el objetivo, monto o plazo según sea necesario.'
    };

    return responses[messageLower] || 'Lo siento, no entiendo tu pregunta. Intenta nuevamente.';
  }

  // Método para alternar la visibilidad del chatbot y reiniciar si se cierra
  toggleChatbot() {
    // Ahora solo borra la conversación pero mantiene el chatbot visible
    this.clearChat(); // Borra la conversación al darle "Cerrar"
  }

  // Método para limpiar los mensajes y el localStorage
  clearChat() {
    this.messages = []; // Borra todos los mensajes
    localStorage.removeItem('chatMessages'); // Elimina el almacenamiento local
    this.addBotMessage('¡Hola! ¿En qué puedo ayudarte?'); // Reinicia con mensaje del bot
  }
}
