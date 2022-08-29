import { state } from "./Settings";
import { showGreeting, showDay, } from "../index";
import { WeatherView } from "./Weather";
import { addSettingsName } from "./Settings";
import { QuoteOfDayView } from "./QuoteOfDay";
import { createToDo } from "./ToDoList";

export const switchLanguage = () => {
    state.language === 'en' ? state.language = 'be' : state.language = 'en';  
    showGreeting(state.language);
    showDay(state.language);
    const weatherView = new WeatherView();
    weatherView.getWeather(state.language);
    addSettingsName(state.language);
    showDay(state.language);
    const quoteView = new QuoteOfDayView();
    quoteView.getQuotes(state.language);
    quoteView.addButtonChangeQuoteHandler(state.language);
    createToDo(state.language)
}