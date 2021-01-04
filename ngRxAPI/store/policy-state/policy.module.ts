import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './policy.reducer';
import { PolicyEffects } from './policy.effects';
import { PolicyFacade } from './policy.facade';

@NgModule({
  imports: [StoreModule.forFeature('policy', reducer), EffectsModule.forFeature([PolicyEffects])],
  providers: [PolicyFacade],
})
export class PolicyModule {}
