jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EnvolvidosConflitoLitigioService } from '../service/envolvidos-conflito-litigio.service';

import { EnvolvidosConflitoLitigioDeleteDialogComponent } from './envolvidos-conflito-litigio-delete-dialog.component';

describe('EnvolvidosConflitoLitigio Management Delete Component', () => {
  let comp: EnvolvidosConflitoLitigioDeleteDialogComponent;
  let fixture: ComponentFixture<EnvolvidosConflitoLitigioDeleteDialogComponent>;
  let service: EnvolvidosConflitoLitigioService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EnvolvidosConflitoLitigioDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(EnvolvidosConflitoLitigioDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EnvolvidosConflitoLitigioDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EnvolvidosConflitoLitigioService);
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
