jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FundamentacaoDoutrinariaService } from '../service/fundamentacao-doutrinaria.service';

import { FundamentacaoDoutrinariaDeleteDialogComponent } from './fundamentacao-doutrinaria-delete-dialog.component';

describe('FundamentacaoDoutrinaria Management Delete Component', () => {
  let comp: FundamentacaoDoutrinariaDeleteDialogComponent;
  let fixture: ComponentFixture<FundamentacaoDoutrinariaDeleteDialogComponent>;
  let service: FundamentacaoDoutrinariaService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FundamentacaoDoutrinariaDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(FundamentacaoDoutrinariaDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FundamentacaoDoutrinariaDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FundamentacaoDoutrinariaService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
