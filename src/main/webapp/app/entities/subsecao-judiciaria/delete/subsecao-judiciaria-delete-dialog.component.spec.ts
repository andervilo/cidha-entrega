jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SubsecaoJudiciariaService } from '../service/subsecao-judiciaria.service';

import { SubsecaoJudiciariaDeleteDialogComponent } from './subsecao-judiciaria-delete-dialog.component';

describe('SubsecaoJudiciaria Management Delete Component', () => {
  let comp: SubsecaoJudiciariaDeleteDialogComponent;
  let fixture: ComponentFixture<SubsecaoJudiciariaDeleteDialogComponent>;
  let service: SubsecaoJudiciariaService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubsecaoJudiciariaDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(SubsecaoJudiciariaDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SubsecaoJudiciariaDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SubsecaoJudiciariaService);
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
