jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EmbargoRespReService } from '../service/embargo-resp-re.service';

import { EmbargoRespReDeleteDialogComponent } from './embargo-resp-re-delete-dialog.component';

describe('EmbargoRespRe Management Delete Component', () => {
  let comp: EmbargoRespReDeleteDialogComponent;
  let fixture: ComponentFixture<EmbargoRespReDeleteDialogComponent>;
  let service: EmbargoRespReService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EmbargoRespReDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(EmbargoRespReDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EmbargoRespReDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EmbargoRespReService);
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
