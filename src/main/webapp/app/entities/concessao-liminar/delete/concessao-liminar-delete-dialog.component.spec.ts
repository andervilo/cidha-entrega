jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConcessaoLiminarService } from '../service/concessao-liminar.service';

import { ConcessaoLiminarDeleteDialogComponent } from './concessao-liminar-delete-dialog.component';

describe('ConcessaoLiminar Management Delete Component', () => {
  let comp: ConcessaoLiminarDeleteDialogComponent;
  let fixture: ComponentFixture<ConcessaoLiminarDeleteDialogComponent>;
  let service: ConcessaoLiminarService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConcessaoLiminarDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(ConcessaoLiminarDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConcessaoLiminarDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConcessaoLiminarService);
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
