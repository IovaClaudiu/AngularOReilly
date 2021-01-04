import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './partner.reducer';
import { PartnerFacade } from './partner.facade';
import { PartnerEffects } from './partner.effects';

@NgModule({
  imports: [StoreModule.forFeature('partner', reducer), EffectsModule.forFeature([PartnerEffects])],
  providers: [PartnerFacade]
})
export class PartnerModule {}
