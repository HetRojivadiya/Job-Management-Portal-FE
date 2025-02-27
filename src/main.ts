import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 


ModuleRegistry.registerModules([AllCommunityModule]);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
