import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherIconDirective } from './directives/feather-icon.directive';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromAppState from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { ErrorEffects } from './store/effects/error.effects';
import { httpInterceptorProviders } from './interceptors/interceptors';
import { ApiService } from './services/api.service';
import { NotificationService } from './services/notification.service';
import { StoreEffects } from './store/effects/store.effects';
import { AuthGuard } from './guards/auth.guard';
import { ChildrenAuthGuard } from './guards/children-auth.guard';
import { ThousandSuffixePipe } from './pipes/thousand-suffix.pipe';



@NgModule({
  declarations: [
    FeatherIconDirective,
    ThousandSuffixePipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAppState.appStateFeatureKey, fromAppState.reducers, { metaReducers: fromAppState.metaReducers }),
    HttpClientModule,
    EffectsModule.forFeature([
      AuthEffects,
      ErrorEffects,
      StoreEffects
    ])
  ],
  providers: [
    HttpClient,
    ApiService,
    NotificationService,
    httpInterceptorProviders,
    AuthGuard,
    ChildrenAuthGuard,
    ThousandSuffixePipe
  ],
  exports: [
    FeatherIconDirective,
    ThousandSuffixePipe
  ]
})
export class CoreModule { }
