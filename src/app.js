import {getInitialLang, changeLanguage} from './i18n/index.js';
import {initRouter} from './router/index.js';

// Layouts
import './layout/app-layout';

// Atoms
import './components/atoms/button';

// Molecules
import './components/molecules/confirmation-popup';
import './components/molecules/search-bar.js';
import './components/molecules/view-switcher.js';
import './components/molecules/employee-table.js';
import './components/molecules/pagination.js';

// organisms
import './components/organisms/header.js';

// Icons
import './icons/logo';
import './icons/plus';
import './icons/tr-flag';
import './icons/uk-flag';
import './icons/employees';
import './icons/table';
import './icons/list';
import './icons/trash';
import './icons/edit';

// Views - Pages
import './views/employee-list.js';
import './views/employee-form.js';

// Set the initial language for the app
changeLanguage(getInitialLang());

// Initialize the router
const app = document.querySelector('#app');

initRouter(app);
